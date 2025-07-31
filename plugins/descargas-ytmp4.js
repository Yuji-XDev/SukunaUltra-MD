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

    const { data } = await axios.get(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
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


import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";
import { fetchYouTubeDownload } from '../lib/ytdll.js'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];

  if (user.chocolates < 2) {
    return conn.reply(m.chat, `ꕥ No tienes suficientes *Chocolates 🍫* Necesitas 2 más para usar este comando.`, m);
  }

  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `✧ Ingresa el nombre del video a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    if (!videoInfo) {
      return m.reply('No se pudo obtener información del video.');
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;

    if (!title || !thumbnail || !timestamp || !views || !ago || !url || !author) {
      return m.reply('Información incompleta del video.');
    }

    const vistas = formatViews(views);
    const canal = author.name ? author.name : 'Desconocido';
    const infoMessage = `
*𖹭.╭╭ִ╼࣪━ִﮩ٨ـﮩ♡̫𝗆𝖾𝗀֟፝𝗎꯭𝗆𝗂꯭𝗇𖦹ׅ♡ִ̫ﮩ٨ـﮩ━ִ╾࣪╮╮.𖹭*
> ♡ *Título:* ${title || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ *Duración:* ${timestamp || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ *Vistas:* ${vistas || 'Desconocido'}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ *Canal:* ${canal}
*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*
> ♡ *Publicado:* ${ago || 'Desconocido'}
*⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︣︢ۛ۫۫۫۫۫۫ۜ⏝ּׅ︢︣ۛ۫۫۫۫۫۫ۜ*`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === 'play2' || command === 'mp4' || command === 'playvideo') {
      try {
        const apiVideoUrl = `https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=diamond`;
        const response = await fetch(apiVideoUrl);
        const json = await response.json();
        const { title, dl } = json.data;

        if (!dl) throw new Error('El enlace de video no se generó correctamente.');

        await conn.sendMessage(m.chat, { video: { url: dl }, fileName: `${title}.mp4`, mimetype: 'video/mp4' }, { quoted: m });
      } catch {
        try {
          const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`);
          const json = await response.json();
          const resultad = json.result;
          const resultado = resultad.download.url;

          if (!resultad || !resultado) throw new Error('El enlace de video no se generó correctamente.');

          await conn.sendMessage(m.chat, { video: { url: resultado }, fileName: resultad.title, mimetype: 'video/mp4', caption: dev }, { quoted: m });
        } catch (e) {
          console.error('Error al enviar el video:', e.message);
          try {
            const { title, downloads } = await fetchYouTubeDownload(url);
            const video = downloads.find(d => d.contentType?.startsWith('video'));

            if (!video?.url) throw new Error('No se encontró video.');

            await conn.sendMessage(m.chat, {
              video: { url: video.url },
              fileName: `${title}.mp4`,
              mimetype: 'video/mp4',
              caption: dev
            }, { quoted: m });
          } catch (e) {
            console.error('Falló:', e.message);
            return conn.reply(m.chat, '⚠︎ No se pudo enviar el video. Esto puede deberse a que el archivo es demasiado pesado o a un error en la generación de la URL. Por favor, intenta nuevamente más tarde.', m);
          }
        }
      }
    } else {
      return conn.reply(m.chat, '⚠︎ Comando no reconocido.', m);
    }

    user.chocolates -= 2;
    conn.reply(m.chat, `ꕥ Has utilizado 2 *Chocolates 🍫*`, m);

  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error}`);
  }
};

handler.command = handler.help = ['play2', 'mp4', 'playvideo'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views === undefined) {
    return "No disponible";
  }

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`;
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`;
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`;
  }
  return views.toString();
}