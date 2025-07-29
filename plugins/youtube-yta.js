// Código creado por Dev.Shadow xD
// https://github.com/Yuji-XDev

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`🌾 *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtube.com/watch?v=KHgllosZ3kA\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`);
  }

  await m.react('🔍');

  const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(text);
  let info = null;

  try {

    if (isYoutubeUrl) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (json?.resultado?.descarga?.url) {
          info = {
            title: json.resultado.metadata.title,
            author: json.resultado.metadata.author?.nombre,
            duration: json.resultado.metadata.duración?.marca_de_tiempo,
            thumb: json.resultado.metadata.image,
            download: json.resultado.descarga.url,
            filename: json.resultado.descarga.filename
          };
        }
      } catch {

      }
    }

    if (!info) {
      const res = await fetch(`https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (json?.result?.download?.url) {
        info = {
          title: json.result.metadata.title,
          author: json.result.metadata.author?.name,
          duration: json.result.metadata.duration?.timestamp,
          thumb: json.result.metadata.thumbnail,
          download: json.result.download.url,
          filename: json.result.download.filename
        };
      }
    }

    if (!info) throw '❌ No se pudo obtener información de ninguna API.';


    await conn.sendMessage(m.chat, {
      image: { url: info.thumb },
      caption: `╭━━⬣「 🧃 𝙈𝙋𝟯 𝘿𝙚𝙩𝙖𝙡𝙡𝙚𝙨 」\n┃\n┃📀 *Título:* ${info.title}\n┃👤 *Autor:* ${info.author}\n┃⏱ *Duración:* ${info.duration}\n┃\n╰━━⬣ *🎧 Enviando audio...*`,
    }, { quoted: m });


    await conn.sendMessage(m.chat, {
      audio: { url: info.download },
      fileName: info.filename,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.reply('❌ *No se pudo obtener el MP3.* Intenta con otro título o link.');
    await m.react('❌');
  }
};

handler.command = ['yta'];
handler.help = ['yta <url o texto>'];
handler.tags = ['downloader'];

export default handler;