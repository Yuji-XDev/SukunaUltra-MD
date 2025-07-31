/*import fetch from "node-fetch";
import axios from 'axios';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `🌾 *Ingresa un link de YouTub'e*`, m, rcanal);
    }

    m.react('⏱️');

    let videoInfo, urlYt;

    const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(text);

    if (isYoutubeUrl) {
      const id = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^\s&]+)/)?.[1];
      if (!id) return m.reply(`⚠️ No se pudo extraer el ID del video.`);

      const result = await yts({ videoId: id });
      videoInfo = result;
      urlYt = text;
    } else {
      const search = await yts(text);
      if (!search?.videos?.length) {
        return conn.reply(m.chat, `⚠️ No se encontraron resultados para: *${text}*`, m);
      }
      videoInfo = search.videos[0];
      urlYt = videoInfo.url;
    }

    const {
      title = 'Sin título',
      timestamp = 'Desconocido',
      author = {},
      views = 0,
      ago = 'Desconocido',
      url = urlYt,
      thumbnail
    } = videoInfo;

    const canal = author.name || 'Desconocido';
    const vistas = views.toLocaleString('es-PE');

    const { data } = await axios.get(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
    if (!data?.status || !data?.data?.dl) {
      throw new Error("No se pudo obtener el enlace de descarga.");
    }

    const videoUrl = data.data.dl;
    const size = await getSize(videoUrl);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';

    const textoInfo =
      ` ⬣ *🎲  \`YOUTUBE - MP4\` 🇦🇱* ⬣\n\n` +
      `> 📌 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${title}\n` +
      `> ⏱️ *𝑫𝒖𝒓𝒂𝒄𝒊𝒐𝒏:* ${timestamp}\n` +
      `> 🧑‍🏫 *𝑪𝒂𝒏𝒂𝒍:* ${canal}\n` +
      `> 👁️ *𝑽𝒊𝒔𝒕𝒂𝒔:* ${vistas}\n` +
      `> 🗓️ *𝑷𝒖𝒃𝒍𝒊𝒄𝒂𝒅𝒐:* ${ago}\n` +
      `> 💾 *𝑻𝒂𝒎𝒂𝒏̃𝒐:* ${sizeStr}\n` +
      `> 🔗 *𝑳𝒊𝒏𝒌:* ${url}\n\n` +
      ` *➭ 𝑬𝒍 𝒗𝒊𝒅𝒆𝒐 𝒔𝒆 𝒆𝒔𝒕𝒂 𝒆𝒏𝒗𝒊𝒂𝒏𝒅𝒐, 𝑬𝒔𝒑𝒆𝒓𝒆 𝒖𝒏 𝒎𝒐𝒎𝒆𝒏𝒕𝒊𝒕𝒐 𝒐𝒏𝒊𝒄𝒉𝒂𝒏~ 🌸*`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: textoInfo,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401008003732@newsletter',
          newsletterName: '=͟͟͞𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 • 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⌺',
          serverMessageId: -1
        }
      }
    }, { quoted: m });

    const videoBuffer = await fetch(videoUrl).then(res => res.buffer());
    await conn.sendFile(m.chat, videoBuffer, `${title}.mp4`, '\n🖍️ 𝑨𝒒𝒖𝒊 𝒕𝒊𝒆𝒏𝒆𝒔 𝒕𝒖 𝒗𝒊𝒅𝒆𝒐, 𝒐𝒏𝒊𝒄𝒉𝒂𝒏~ 🌸', fkontak);

    m.react('✅');

  } catch (e) {
    console.error(e);
    m.reply(`❌ Error inesperado:\n${e.message}`);
  }
};

handler.help = ['ytmp4 <link o nombre>'];
handler.command = ['ytmp4'];
handler.tags = ['descargas'];

export default handler;

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const response = await axios.head(url);
    return response.headers['content-length']
      ? parseInt(response.headers['content-length'], 10)
      : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}*/

import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";
import { fetchYouTubeDownload } from '../lib/ytdll.js';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, `✧ Ingresa el nombre del video a descargar.`, m);

    const search = await yts(text);
    if (!search.all || search.all.length === 0) return m.reply('No se encontraron resultados para tu búsqueda.');

    const videoInfo = search.all[0];
    if (!videoInfo) return m.reply('No se pudo obtener información del video.');

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
    const vistas = formatViews(views);
    const canal = author?.name || 'Desconocido';

    const infoMessage = `
> ♡ *Título:* ${title}
> ♡ *Duración:* ${timestamp}
> ♡ *Vistas:* ${vistas}
> ♡ *Canal:* ${canal}
> ♡ *Publicado:* ${ago}
`;

    const thumb = (await conn.getFile(thumbnail))?.data;
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: global.botname,
          body: global.dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (!['ytmp4'].includes(command)) {
      return conn.reply(m.chat, '⚠︎ Comando no reconocido.', m);
    }

    // Intento 1: API Stellar
    try {
      const api1 = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=diamond`);
      const json1 = await api1.json();
      console.log('Stellar API:', json1);

      const link1 = json1?.data?.dl;
      const titulo1 = json1?.data?.title;

      if (!link1) throw new Error('Stellar no generó link');

      return await conn.sendMessage(m.chat, {
        video: { url: link1 },
        fileName: `${titulo1 || title}.mp4`,
        mimetype: 'video/mp4'
      }, { quoted: m });

    } catch (e1) {
      console.error('Error Stellar:', e1.message);

      // Intento 2: API Vreden
      try {
        const api2 = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
        const json2 = await api2.json();
        console.log('Vreden API:', json2);

        const link2 = json2?.result?.download?.url;
        const titulo2 = json2?.result?.title;

        if (!link2) throw new Error('Vreden no generó link');

        return await conn.sendMessage(m.chat, {
          video: { url: link2 },
          fileName: `${titulo2 || title}.mp4`,
          mimetype: 'video/mp4',
          caption: global.dev
        }, { quoted: m });

      } catch (e2) {
        console.error('Error Vreden:', e2.message);

        try {
          const { title: ytTitle, downloads } = await fetchYouTubeDownload(url);
          const video = downloads.find(d => d.contentType?.startsWith('video') && d.url);

          if (!video?.url) throw new Error('No se encontró video válido');

          return await conn.sendMessage(m.chat, {
            video: { url: video.url },
            fileName: `${ytTitle || title}.mp4`,
            mimetype: 'video/mp4',
            caption: global.dev
          }, { quoted: m });

        } catch (e3) {
          console.error('Error ytdll:', e3.message);
          return conn.reply(m.chat, '❌ No se pudo enviar el video. Puede que el archivo sea muy pesado o la URL falló.', m);
        }
      }
    }

  } catch (error) {
    console.error('Error general:', error);
    return m.reply(`⚠︎ Ocurrió un error: ${error.message}`, m);
  }
};

handler.command = handler.help = ['ytmp4'];
handler.tags = ['downloader'];
export default handler;

function formatViews(views) {
  if (views == null) return "No disponible";
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k`;
  return views.toString();
}
