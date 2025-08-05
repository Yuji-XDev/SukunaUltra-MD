import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`☘️ *Ejemplo de uso:*\n\n✎ ✧ \`${usedPrefix + command}\` https://youtube.com/watch?v=KHgllosZ3kA\n✎ ✧ \`${usedPrefix + command}\` DJ malam pagi slowed`);
  }

  await m.react('⏱️');

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
            filename: json.resultado.descarga.filename,
            size: json.resultado.descarga.size,
            url: json.resultado.metadata.url || text
          };
        }
      } catch (e) {
        console.error('Error en ytmp3:', e);
      }
    }

    if (!info) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (json?.result?.download?.url) {
          info = {
            title: json.result.metadata.title,
            author: json.result.metadata.author?.name,
            duration: json.result.metadata.duration?.timestamp,
            thumb: json.result.metadata.thumbnail,
            download: json.result.download.url,
            filename: json.result.download.filename,
            size: json.result.download.size,
            url: json.result.metadata.url || text
          };
        }
      } catch (e) {
        console.error('Error en ytplaymp3:', e);
      }
    }

    if (!info) throw '❌ No se pudo obtener información de ninguna API.';

    await conn.sendMessage(m.chat, {
      image: { url: info.thumb },
      caption: `🎵 𝚃𝚒́𝚝𝚞𝚕𝚘: *${info.title}*
👤 𝙰𝚞𝚝𝚘𝚛: *${info.author || 'Desconocido'}*
⏱️ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘́𝚗: *${info.duration || 'Desconocida'}*
📦 𝚃𝚊𝚖𝚊𝚗̃𝚘: *${info.size || 'Calculando...'}*`
    }, { quoted: m });

    // Preparar nombre y caption
    const fileName = `${info.title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.mp3`;
    const caption = `📼 *${info.title}*\n> 🎧 *Duración:* ${info.duration}\n> 📦 *Tamaño:* ${info.size}\n> 🔗 ${info.url}`;

    // Enviar audio como documento con estilo completo
    await conn.sendMessage(m.chat, {
      document: { url: info.download },
      fileName,
      mimetype: 'audio/mpeg',
      caption,
      contextInfo: {
        externalAdReply: {
          title: info.title,
          body: `💿 YOUTUBE DOC ☘️`,
          mediaUrl: info.url,
          sourceUrl: info.url,
          thumbnailUrl: info.thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.reply('❌ *No se pudo obtener el MP3.* Intenta con otro título o link.');
    await m.react('❌');
  }
};

handler.command = ['yta-v2'];
handler.help = ['yta-v2 <url>'];
handler.tags = ['downloader'];

export default handler;