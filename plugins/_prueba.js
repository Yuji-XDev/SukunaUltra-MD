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


import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !text.includes('spotify.com/track')) {
    return conn.reply(m.chat, `🌿 *Ingresa una URL válida de Spotify*\n\n📌 Ejemplo:\n${usedPrefix + command} https://open.spotify.com/track/37ZtpRBkHcaq6hHy0X98zn`, m);
  }

  try {
    m.react('🎧');
    
    let api = `https://delirius-apiofc.vercel.app/download/spotifydl?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json.status || !json.data?.url) {
      return conn.reply(m.chat, `❌ No se pudo obtener el audio.\n📌 Verifica que la URL sea correcta.`, m);
    }

    const { title, author, duration, image, url } = json.data;

    let textoInfo = `
╭━━━〔 *SPOTIFY - MP3* 〕━━⬣
┃🎧 *Título:* ${title}
┃🎤 *Autor:* ${author}
┃⏱️ *Duración:* ${(duration / 1000).toFixed(0)} segundos
┃🌐 *Fuente:* Spotify
╰━━━━━━━━━━━━⬣`;

    await conn.sendMessage(m.chat, { image: { url: image }, caption: textoInfo.trim() }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg' }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al procesar la descarga. Intenta más tarde.', m);
  }
};

handler.help = ['spotifydl <url>'];
handler.tags = ['downloader'];
handler.command = /^spotify(dl)?$/i;

export default handler;

