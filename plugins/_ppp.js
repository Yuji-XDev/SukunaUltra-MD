import { toBuffer } from 'node:buffer'
import { uploadFile } from '../lib/uploadFile.js'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'
import path from 'path'
import { tmpdir } from 'os'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!m.quoted || !m.quoted.video) {
    return m.reply(`🎬 *Responde a un video corto para convertirlo en GIF*\n\n📌 Ejemplo:\n${usedPrefix + command}`);
  }

  const qVideo = await m.quoted.download();
  const tempInput = path.join(tmpdir(), `input_${Date.now()}.mp4`);
  const tempOutput = path.join(tmpdir(), `output_${Date.now()}.gif`);

  fs.writeFileSync(tempInput, qVideo);
  m.reply('⏳ *Convirtiendo video a GIF...*');

  await new Promise((resolve, reject) => {
    ffmpeg(tempInput)
      .setStartTime('0')
      .setDuration(6)
      .outputOptions([
        '-vf', 'fps=10,scale=320:-1:flags=lanczos',
        '-loop', '0'
      ])
      .toFormat('gif')
      .save(tempOutput)
      .on('end', resolve)
      .on('error', reject);
  });

  const gifBuffer = fs.readFileSync(tempOutput);
  const gifUrl = await uploadFile(tempOutput);

  await conn.sendMessage(m.chat, {
    image: gifBuffer,
    caption: `✅ *GIF generado exitosamente*\n\n🌐 URL directa: ${gifUrl}`,
    footer: '💠 Convertidor Video → GIF',
    buttons: [
      { buttonId: gifUrl, buttonText: { displayText: '🌐 VER GIF ONLINE' }, type: 1 }
    ]
  }, { quoted: m });

  fs.unlinkSync(tempInput);
  fs.unlinkSync(tempOutput);
};

handler.help = ['togifurl'];
handler.tags = ['tools'];
handler.command = /^togifurl$/i;

export default handler;