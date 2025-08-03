import { tmpdir } from 'os';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { uploadFile } from '../lib/uploadFile.js';

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted || m.quoted.mtype !== 'videoMessage') {
    return m.reply(`🎥 *Responde a un video corto para convertirlo en GIF*\n\n📌 Ejemplo:\n${usedPrefix + command}`);
  }

  m.reply('🎬 *Descargando video...*');

  let videoBuffer;
  try {
    videoBuffer = await m.quoted.download();
  } catch (e) {
    return m.reply('❌ Error al descargar el video.');
  }

  const inputPath = path.join(tmpdir(), `input_${Date.now()}.mp4`);
  const outputPath = path.join(tmpdir(), `output_${Date.now()}.gif`);
  fs.writeFileSync(inputPath, videoBuffer);

  m.reply('⏳ *Convirtiendo video a GIF...*');

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setStartTime(0)
        .duration(6)
        .outputOptions([
          '-vf', 'fps=10,scale=320:-1:flags=lanczos',
          '-loop', '0'
        ])
        .toFormat('gif')
        .on('end', resolve)
        .on('error', reject)
        .save(outputPath);
    });
  } catch (e) {
    fs.unlinkSync(inputPath);
    return m.reply('❌ Error durante la conversión a GIF.');
  }

  let gifBuffer;
  try {
    gifBuffer = fs.readFileSync(outputPath);
  } catch {
    return m.reply('❌ Error al leer el GIF generado.');
  }

  let gifUrl;
  try {
    gifUrl = await uploadFile(outputPath);
  } catch {
    return m.reply('❌ No se pudo subir el GIF a una URL.');
  }

  await conn.sendMessage(m.chat, {
    image: gifBuffer,
    caption: `✅ *GIF generado correctamente*\n\n🌐 URL directa:\n${gifUrl}`
  }, { quoted: m });

  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);
};

handler.help = ['togifurl'];
handler.tags = ['tools'];
handler.command = ['togifurl']; // ESTE nombre debe ser EXACTO como el que escribes en WhatsApp

export default handler;