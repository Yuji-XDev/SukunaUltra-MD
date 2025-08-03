import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

const MAX_FILE_SIZE = 280 * 1024 * 1024;
const VIDEO_THRESHOLD = 70 * 1024 * 1024;

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000 });
    return parseInt(response.headers['content-length'], 10) || null;
  } catch {
    return null;
  }
}

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K`
  return views.toString()
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, ` Por favor, ingresa el nombre o enlace del video.`, m)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = await yts(videoIdMatch ? 'https://youtu.be/' + videoIdMatch[1] : text)
    let video = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
      : search.videos?.[0]

    if (!video) return conn.reply(m.chat, '✧ No se encontraron resultados.', m)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'

    const infoMessage = `     *<${title}>*\n\n` +
      `> ✧ Canal » *${canal}*\n` +
      `> ✰ Vistas » *${vistas}*\n` +
      `> ⴵ Duración » *${timestamp}*\n` +
      `> ✐ Publicado » *${ago}*\n` +
      `> 🜸 Link » ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const external = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: canal,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, external)

    if (['play', 'playaudio'].includes(command)) {
      const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)
      const json = await res.json()
      if (!json.result?.download?.url) throw '⚠ Enlace inválido.'

      await conn.sendMessage(m.chat, {
        audio: { url: json.result.download.url },
        fileName: `${json.result.title}.mp3`,
        mimetype: 'audio/mpeg'
      }, { quoted: m })

    } else if (['play2', 'playvideo'].includes(command)) {
      let api1 = `https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`
      let finalUrl = null, fileTitle = null

      try {
        const res1 = await fetch(api1)
        const json1 = await res1.json()
        if (json1?.result?.url) {
          finalUrl = json1.result.url
          fileTitle = json1.result.title
        }
      } catch { }

      if (!finalUrl) {
        try {
          const headers = {
            'accept': '*/*',
            'accept-language': 'es-ES',
            'referer': 'https://id.ytmp3.mobi/',
          }
          const id = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)?.[1]
          const init = await (await fetch(api1, { headers })).json()
          const convertRes = await fetch(`${init.convertURL}&v=${id}&f=mp4`, { headers })
          const convert = await convertRes.json()
          const progress = await (await fetch(convert.progressURL, { headers })).json()

          if (progress?.progress === 3 && convert?.downloadURL) {
            finalUrl = convert.downloadURL
            fileTitle = progress.title || 'video'
          }
        } catch { }
      }

      if (!finalUrl) return conn.reply(m.chat, '🚫 No se pudo obtener el video.', m)

      const fileSize = await getSize(finalUrl)

      if (!fileSize || fileSize > MAX_FILE_SIZE) {
        return conn.reply(m.chat, '⚠️ El archivo es demasiado grande para enviarlo.', m)
      }

      const caption = `*🎥 ${fileTitle}*\n⚖️ *Peso:* ${formatSize(fileSize)}\n🔗 *Enlace:* ${url}`
      const isSmall = fileSize < VIDEO_THRESHOLD

      await conn.sendFile(
        m.chat,
        finalUrl,
        `${fileTitle}.mp4`,
        caption,
        m,
        null,
        {
          mimetype: 'video/mp4',
          asDocument: !isSmall,
          filename: `${fileTitle}.mp4`
        }
      )
    } else {
      return conn.reply(m.chat, '🧩 Comando desconocido.', m)
    }

  } catch (err) {
    return conn.reply(m.chat, `❌ Error:\n${err}`, m)
  }
}

handler.command = handler.help = ['play', 'play2', 'playaudio', 'playvideo']
handler.tags = ['descargas']

export default handler

/*import fetch from "node-fetch"
import yts from "yt-search"
const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, `💿 Por favor, ingresa el nombre o enlace del video.`, m, fake)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = await yts(videoIdMatch ? 'https://youtu.be/' + videoIdMatch[1] : text)
    let video = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
      : search.videos?.[0]

    if (!video) return conn.reply(m.chat, '✧ No se encontraron resultados para tu búsqueda.', m)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'

    const infoMessage = `     *<${title}>*\n\n` +
      `> ✧ Canal » *${canal}*\n` +
      `> ✰ Vistas » *${vistas}*\n` +
      `> ⴵ Duración » *${timestamp}*\n` +
      `> ✐ Publicado » *${ago}*\n` +
      `> 🜸 Link » ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const external = {
      contextInfo: {
        externalAdReply: {
          title: botname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, external)

    if (['play', 'playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)
        const json = await res.json()
        if (!json.result?.download?.url) throw '⚠ No se obtuvo un enlace válido.'

        await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url },
          fileName: `${json.result.title}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. El archivo podría ser demasiado pesado o hubo un error en la generación del enlace.', m)
      }
    }

    else if (['play2', 'playvideo'].includes(command)) {
      try {
        const res = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=stellar-ReKwdxiR`)
        const json = await res.json()

        if (!json?.result?.url) throw '⚠ No se obtuvo enlace de video.'

        await conn.sendFile(m.chat, json.result.url, `${json.result.title}.mp4`, title, m)
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el video. El archivo podría ser muy pesado o hubo un error en el enlace.', m)
      }
    }

    else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m)
    }

  } catch (err) {
    return m.reply(`⚠︎ Ocurrió un error:\n${err}`)
  }
}

handler.command = handler.help = ['play', 'play2', 'playaudio', 'playvideo']
handler.tags = ['descargas']

export default handler

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`
  return views.toString()
}*/