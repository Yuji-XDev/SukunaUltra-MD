/*import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text || !text.includes('youtu')) {
    return m.reply('🎥 *Por favor, proporciona un enlace válido de YouTube.*');
  }

  await m.react('⏳');

  try {
    if (command === 'ytmp33') {
      const res = await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (!json.status) throw '❌ No se pudo obtener el audio.';

      await conn.sendFile(m.chat, json.download, 'audio.mp3', `🎧 *Título:* ${json.title}\n📥 *Audio descargado con éxito.*`, m);

    } else if (command === 'ytmp44') {
      const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (!json.download) throw '❌ No se pudo obtener el video.';

      await conn.sendFile(m.chat, json.download, 'video.mp4', `🎬 *Título:* ${json.title}\n📽️ *Calidad:* ${json.quality}p\n📥 *Video descargado con éxito.*`, m);
    }
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al procesar la descarga. Intenta más tarde.');
  }
};

handler.help = ['ytmp33 <url>', 'ytmp44 <url>'];
handler.tags = ['downloader'];
handler.command = /^ytmp33|ytmp44$/i;

export default handler;*/ 