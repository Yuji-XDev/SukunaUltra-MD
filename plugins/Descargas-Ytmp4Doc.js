import fetch from "node-fetch";
import axios from 'axios';

let handler = async (m, { conn, text, args }) => {
  try {
    if (!text) return conn.reply(m.chat, `💔 *Por favor, ingresa la URL del vídeo de YouTube.*`, m, rcanal);

    if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
      return m.reply(`*⚠️ Enlace inválido, por favor coloca un enlace válido de YouTube.*`);
    }

    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    let json = await ytdl(args[0]);
    let size = await getSize(json.url);
    let sizeStr = size ? await formatSize(size) : 'Desconocido';

    const title = json.title;
    const caption = `🌴 *${title}*\n*📦 Tamaño:* ${sizeStr}\n> ${dev}`;
    const url = args[0];
    const thumb = await getThumbnail(url);


    await conn.sendMessage(m.chat, {
      document: { url: json.url },
      fileName: `${title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '_')}.mp4`,
      mimetype: 'video/mp4',
      caption: caption,
      thumbnail: thumb,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: '🏞️⋋̳͡⊱𝗬𝗢𝗨𝗧𝗨𝗕𝗘𐚁๋࣭⭑ֶָ֢𝗠𝗣4 𝗗𝗢𝗖⊰͡⋌̳🎄',
          mediaUrl: url,
          sourceUrl: url,
          thumbnailUrl: url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    m.reply(`❌ Ocurrió un error:\n${e.message}`);
  }
};

handler.command = ['ytmp4doc'];
handler.tags = ['descargas'];
handler.command = ['ytmp4doc', 'ytvdoc', 'ytdoc'];

export default handler;


async function ytdl(url) {
  const headers = {
    "accept": "*/*",
    "accept-language": "es-PE,es;q=0.9",
    "sec-fetch-mode": "cors",
    "Referer": "https://id.ytmp3.mobi/"
  };

  const initReq = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
  const init = await initReq.json();
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
  const convertURL = init.convertURL + `&v=${id}&f=mp4&_=${Math.random()}`;

  const convertRes = await fetch(convertURL, { headers });
  const convert = await convertRes.json();

  let info = {};
  for (let i = 0; i < 3; i++) {
    const progress = await fetch(convert.progressURL, { headers });
    info = await progress.json();
    if (info.progress === 3) break;
  }

  return {
    url: convert.downloadURL,
    title: info.title || 'video'
  };
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
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
    const res = await axios.head(url);
    const length = res.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (err) {
    console.error('⚠️ Error al obtener tamaño del archivo:', err.message);
    return null;
  }
}

async function getThumbnail(ytUrl) {
  try {
    const videoId = ytUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!videoId) return null;
    const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const res = await fetch(thumbUrl);
    return await res.buffer();
  } catch {
    return null;
  }
}