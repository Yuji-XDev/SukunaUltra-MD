import fetch from "node-fetch";
import axios from 'axios';
import yts from 'yt-search';

const MAX_FILE_SIZE = 280 * 1024 * 1024; // 280 MB
const VIDEO_THRESHOLD = 70 * 1024 * 1024; // 70 MB
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024; // 100 MB

let isProcessingHeavy = false;

const isValidYouTubeUrl = (url) =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  bytes = Number(bytes);
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000 });
    const size = parseInt(response.headers['content-length'], 10);
    if (!size) throw new Error('Tamaño no disponible');
    return size;
  } catch (e) {
    throw new Error('No se pudo obtener el tamaño del archivo');
  }
}

async function ytdl(url) {
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Chromium";v="132", "Not A(Brand";v="8"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
  };

  try {
    const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers });
    if (!initRes.ok) throw new Error('Fallo al inicializar la solicitud');
    const init = await initRes.json();

    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!videoId) throw new Error('ID de video no encontrado');

    const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers });
    if (!convertRes.ok) throw new Error('Fallo al convertir el video');
    const convert = await convertRes.json();

    let info;
    for (let i = 0; i < 3; i++) {
      const progressRes = await fetch(convert.progressURL, { headers });
      if (!progressRes.ok) throw new Error('Fallo al obtener el progreso');
      info = await progressRes.json();
      if (info.progress === 3) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!info || !convert.downloadURL) throw new Error('No se pudo obtener la URL de descarga');
    return { url: convert.downloadURL, title: info.title || 'Video sin título' };
  } catch (e) {
    throw new Error(`Error en la descarga: ${e.message}`);
  }
}


let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🌴 Uso: ${usedPrefix}${command} https://youtube.com/watch?v=iQEVguV71sI`, m, fake);
  }

  if (!isValidYouTubeUrl(text)) {
    await m.react('✖️');
    return m.reply('🚫 Enlace de YouTube inválido');
  }

  await m.react('📀');

  try {
    const search = await yts({ query: text, pages: 1 });
    const video = search.videos[0];
    const { title, timestamp, views, ago, author, thumbnail, url: videoUrl } = video || {};

    const textoInfo = `⬣ *🎲  \`YOUTUBE - MP4\` 🇦🇱* ⬣\n\n`
      + `> 🌾 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${title}\n`
      + `> ⏱️ *𝑫𝒖𝒓𝒂𝒄𝒊𝒐𝒏:* ${timestamp}\n`
      + `> 🍰 *𝑪𝒂𝒏𝒂𝒍:* ${author?.name}\n`
      + `> 🌧️ *𝑽𝒊𝒔𝒕𝒂𝒔:* ${views}\n`
      + `> 🌳 *𝑷𝒖𝒃𝒍𝒊𝒄𝒂𝒅𝒐:* ${ago}\n`
      + `> 🔗 *𝑳𝒊𝒏𝒌:* ${videoUrl}\n\n`
      + ` *➭ 𝑬𝒍 𝒗𝒊𝒅𝒆𝒐 𝒔𝒆 𝒆𝒔𝒕𝒂 𝒆𝒏𝒗𝒊𝒂𝒏𝒅𝒐, 𝑬𝒔𝒑𝒆𝒓𝒆 𝒖𝒏 𝒎𝒐𝒎𝒆𝒏𝒕𝒊𝒕𝒐 𝒐𝒏𝒊𝒄𝒉𝒂𝒏~ 🌸*`;
      
    const thumbnailBuffer = await (await fetch(thumbnail)).buffer();

       await conn.sendMessage(m.chat, {
      text: textoInfo,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401008003732@newsletter',
          serverMessageId: '',
          newsletterName: '☯︎︎⟬𖤐ꪶ 𝑺𝑼𝑲𝑼𝑵𝑨 𝑼𝑳𝑻𝑹𝑨 • 𝑪𝑯𝑨𝑵𝑵𝑬𝑳 ꪶ𖤐⟭☯︎︎ 🔥'
        },
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: null,
        externalAdReply: {
          showAdAttribution: true,
          renderLargerThumbnail: true,
          title: title,
          body: '☁️ ＳＵＫＵＮＡ - ＡＩ ☘️',
          containsAutoReply: true,
          mediaType: 1,
          thumbnailUrl: thumbnailBuffer,
          sourceUrl: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U"
        }
      }
    }, { quoted: m });

    const { url, title: titleVid } = await ytdl(text);
    const size = await getSize(url);

    if (!size) {
      await m.react('🔴');
      throw new Error('No se pudo determinar el tamaño del video');
    }

    if (size > MAX_FILE_SIZE) {
      await m.react('🔴');
      throw new Error('♡ No puedo procesar esta descarga porque traspasa el límite de descarga');
    }

    if (size > HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '🤨 Espera, estoy lidiando con un archivo pesado', m, fake);
    }

    await m.react('✅️');
    const caption = `*💌 ${titleVid}*\n> ⚖️ Peso: ${formatSize(size)}\n> 🌎 URL: ${text}`;
    const isSmallVideo = size < VIDEO_THRESHOLD;

    const buffer = await (await fetch(url)).buffer();
    await conn.sendFile(
      m.chat,
      buffer,
      `${titleVid}.mp4`,
      caption,
      fkontak,
      null,
      {
        mimetype: 'video/mp4',
        asDocument: !isSmallVideo,
        filename: `${titleVid}.mp4`
      }
    );

    await m.react('🟢');
    isProcessingHeavy = false;
  } catch (e) {
    await m.react('🔴');
    await m.reply(`❌ Error: ${e.message || 'No se pudo procesar la solicitud'}`);
    isProcessingHeavy = false;
  }
};

handler.help = ['ytmp4 <URL>'];
handler.command = ['ytmp4'];
handler.tags = ['descargas'];

export default handler;

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

    const { data } = await axios.get(`https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}&apikey=stellar-ReKwdxiR`);
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