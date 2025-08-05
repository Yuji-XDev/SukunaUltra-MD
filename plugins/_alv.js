import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🌐 *Ejemplo:* ${usedPrefix + command} DJ malam pagi slowed`);

  try {
    const res = await fetch(`https://api.vreden.my.id/api/ytplaymp4?query=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.result?.download?.url) {
      return m.reply('❌ No se encontró ningún resultado o no hay enlace de descarga.');
    }

    const {
      metadata,
      download
    } = json.result;

    const caption = `
╭━━〔 *📼 VIDEO ENCONTRADO* 〕━━⬣
┃🎧 *Título:* ${metadata.title}
┃👤 *Autor:* ${metadata.author.name}
┃⏱️ *Duración:* ${metadata.duration.timestamp}
┃👀 *Vistas:* ${metadata.views.toLocaleString()}
┃🔗 *Enlace:* ${metadata.url}
╰━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(m.chat, {
      image: { url: metadata.thumbnail },
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      document: { url: download.url },
      fileName: download.filename,
      mimetype: 'video/mp4'
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    m.reply('🚫 Ocurrió un error al procesar tu solicitud.');
  }
};

handler.command = ['playvideo1', 'ytmp'];
handler.help = ['playvideo1 <texto>'];
handler.tags = ['downloader'];

export default handler;