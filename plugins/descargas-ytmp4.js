import fetch from "node-fetch";
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
}