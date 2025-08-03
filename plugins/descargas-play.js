import fetch from "node-fetch"
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
          title: title,
          body: wm,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: false
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, external)

    if (['play', 'playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)
        const json = await res.json()
        if (!json.result?.download?.url) throw '⚠ No se obtuvo un enlace válido.'

        /*await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url },
          fileName: `${json.result.title}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })*/
        
    await conn.sendMessage(m.chat, {
      audio: { url: json.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${json.result.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: json.result.title,
          body: 'YOUTUBE • PLAY',
          mediaType: 1,
          thumbnail: thumb,
          mediaUrl: url,
          sourceUrl: url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. El archivo podría ser demasiado pesado o hubo un error en la generación del enlace.', m)
      }
    }

    else if (['play2', 'playvideo'].includes(command)) {
      try {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${url}`)
        const json = await res.json()

        if (!json.download) throw '⚠ No se obtuvo enlace de video.'

        await conn.sendFile(m.chat, json.download, `${json.title || 'video'}.mp4`, `🎬 *Título:* ${json.title}\n📽️ *Calidad:* ${json.quality}p\n📥 *Video descargado con éxito.*`, m)
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
}

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