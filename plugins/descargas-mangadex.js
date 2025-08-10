import fetch from 'node-fetch';
import { createWriteStream, createReadStream } from 'fs';
import { promises as fsPromises } from 'fs';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import path from 'path';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Descarga una imagen a disco (usa pipeline para evitar problemas de streams) */
const downloadImage = async (url, filename) => {
  const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = path.join(__dirname, `temp_image_${Date.now()}_${safeName}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} al descargar imagen: ${url}`);

    // si no hay body (raro), guardamos por buffer
    if (!res.body) {
      const buffer = Buffer.from(await res.arrayBuffer());
      await fsPromises.writeFile(filePath, buffer);
      return filePath;
    }

    await pipeline(res.body, createWriteStream(filePath));
    return filePath;
  } catch (err) {
    console.error('downloadImage error:', err);
    return null; // el llamador filtrará los null
  }
};

/** Crea un PDF con las imágenes (cada imagen en una página) */
const createPDF = async (images, part) => {
  if (!images || images.length === 0) throw new Error('No hay imágenes válidas para generar el PDF.');
  const pdfPath = path.join(__dirname, `manga_part_${part}_${Date.now()}.pdf`);
  const doc = new PDFDocument({ autoFirstPage: false });
  const writeStream = createWriteStream(pdfPath);
  doc.pipe(writeStream);

  for (const img of images) {
    try {
      doc.addPage();
      doc.image(img, { fit: [500, 700], align: 'center', valign: 'center' });
    } catch (err) {
      console.error('createPDF: error añadiendo imagen', img, err);
      // seguimos con la siguiente imagen
    }
  }

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(pdfPath));
    writeStream.on('error', reject);
  });
};

let handler = async (m, { conn, args }) => {
  if (!args || args.length < 2) {
    return conn.reply(m.chat, '🚩 Por favor, ingresa el nombre del manga y el número del capítulo. Ejemplo: .mangad Naruto 1', m);
  }

  const mangaName = args.slice(0, -1).join(' ');
  const chapterRequested = args[args.length - 1];

  try {
    if (m.react) await m.react('🕓');

    // buscar manga en Mangadex
    const searchResponse = await fetch(`https://api.mangadex.org/manga?title=${encodeURIComponent(mangaName)}`);
    if (!searchResponse.ok) throw new Error('No se pudo buscar el manga en Mangadex.');
    const searchJson = await searchResponse.json();
    const mangaList = searchJson.data || [];
    if (mangaList.length === 0) return conn.reply(m.chat, '🚩 Manga no encontrado.', m);

    const mangaId = mangaList[0].id;

    // obtener capítulos (aumenté el límite por si hay muchos)
    const chaptersResponse = await fetch(`https://api.mangadex.org/chapter?manga=${mangaId}&limit=500`);
    if (!chaptersResponse.ok) throw new Error('No se pudieron obtener los capítulos.');
    const chaptersJson = await chaptersResponse.json();
    const chapters = chaptersJson.data || [];

    // buscar capítulo exacto (string comparation)
    let chapterData = chapters.find(ch => {
      const chNum = ch.attributes && ch.attributes.chapter;
      return chNum === chapterRequested || (chNum && chNum.toString() === chapterRequested);
    });

    if (!chapterData) {
      return conn.reply(m.chat, `🚩 Capítulo ${chapterRequested} no encontrado en ${mangaName}.`, m);
    }

    const chapterId = chapterData.id;

    // pedir servidor "at-home" para obtener baseUrl + hash + filenames
    const imageResponse = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
    if (!imageResponse.ok) throw new Error('No se pudo obtener información del capítulo (at-home).');
    const imageData = await imageResponse.json();
    if (!imageData || !imageData.chapter) throw new Error('Respuesta inválida al solicitar imágenes del capítulo.');

    const { baseUrl, chapter: { hash, data } } = imageData;

    // descargar todas las imágenes (con Promise.allSettled para tolerancia a fallos)
    const downloadPromises = data.map(filename => downloadImage(`${baseUrl}/data/${hash}/${filename}`, filename));
    const results = await Promise.allSettled(downloadPromises);
    const downloadedImages = results.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean);

    if (downloadedImages.length === 0) {
      return conn.reply(m.chat, '🚩 No se pudieron descargar las imágenes del capítulo.', m);
    }

    // crear PDF y enviarlo como stream (más fiable)
    const pdfPath = await createPDF(downloadedImages, chapterRequested);

    await conn.sendMessage(m.chat, {
      document: createReadStream(pdfPath),
      mimetype: 'application/pdf',
      fileName: `${mangaName}_Capitulo_${chapterRequested}.pdf`
    }, { quoted: m });

    // limpieza: borrar imágenes temporales y pdf
    await Promise.all(downloadedImages.map(f => fsPromises.unlink(f).catch(() => {})));
    await fsPromises.unlink(pdfPath).catch(() => {});

    if (m.react) await m.react('✅');
  } catch (error) {
    console.error('handler error:', error);
    if (m.react) await m.react('✖️');
    return conn.reply(m.chat, `🚩 Error: ${error.message}`, m);
  }
};

handler.help = ["mangad <nombre del manga> <número del capítulo>"];
handler.tags = ['descargas'];
handler.command = /^(mangad)$/i;
handler.estrellas = 8;

export default handler;