import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];

const ddownr = {
  download: async (url, format) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return downloadUrl;
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      throw error;
    }
  }
};

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `👻 Ingresa el nombre del video a descargar.`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '🎶', key: m.key }});

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('❌ No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, url, image } = videoInfo;
    const format = 'mp3';
    const downloadUrl = await ddownr.download(url, format);
    const size = await getSize(downloadUrl);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';

    if (downloadUrl) {
      const fileName = `${title.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/ +/g, '_')}.${format}`;
      const caption = `😁 *${title}*\n*📦 Tamaño:* ${sizeStr}\n> ${dev}`;

      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName,
        mimetype: 'audio/mpeg',
        caption,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: `🏞️⋋̳͡⊱𝗬𝗢𝗨𝗧𝗨𝗕𝗘𐚁๋࣭⭑ֶָ֢𝗠𝗣3 𝗗𝗢𝗖⊰͡⋌̳🎄`,
            mediaUrl: url,
            sourceUrl: url,
            thumbnailUrl: image,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
    } else {
      return m.reply(`⚠️ No se pudo descargar el audio.`);
    }
  } catch (error) {
    console.error(error);
    return m.reply(`❌ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['ytmp3doc', 'ytadoc'];
handler.tags = ['descargas'];

export default handler;


async function getSize(url) {
  try {
    const response = await axios.head(url);
    const length = response.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
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