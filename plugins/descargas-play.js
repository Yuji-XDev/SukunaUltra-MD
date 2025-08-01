import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"
const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🎲 Por favor, ingresa el nombre de la música a descargar.`, m, fake)
    }

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]  
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    } 

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2  
    if (!ytplay2 || ytplay2.length == 0) {
      return m.reply('✧ No se encontraron resultados para tu búsqueda.')
    }

    let { title, thumbnail, timestamp, views, ago, url, author } = ytplay2
    title = title || 'no encontrado'
    thumbnail = thumbnail || 'no encontrado'
    timestamp = timestamp || 'no encontrado'
    views = views || 'no encontrado'
    ago = ago || 'no encontrado'
    url = url || 'no encontrado'
    author = author || 'no encontrado'
    
    const tipoMensaje = (videoUrl) => {
  const extensionesVideo = ['mp4', 'playvideo'];
  const extensionesAudio = ['mp3', 'playaudio'];

  if (!videoUrl) return '📦 Contenido desconocido';

  const url = videoUrl.toLowerCase();

  if (extensionesVideo.some(ext => url.includes(ext))) {
    return '🎞️ *Tipo:* Video';
  } else if (extensionesAudio.some(ext => url.includes(ext))) {
    return '🎧 *Tipo:* Audio';
  } else {
    return '📁 *Tipo:* Desconocido';
  }
};

    const tamaño = size ? await formatSize(size) : 'Desconocido';
    const vistas = formatViews(views)
    const canal = author.name ? author.name : 'Desconocido'
    const infoMessage = `
╔═══『 ✨ 𝚄𝚃𝙸𝙻 𝙸𝙽𝙵𝙾 ✨ 』═══╗
╟─ 🍬 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${title || 'Desconocido'}
╟─ 🌵 *𝑫𝒖𝒓𝒂𝒄𝒊ó𝒏:* ${timestamp || 'Desconocido'}
╟─ 🍃 *𝑪𝒂𝒏𝒂𝒍:* ${canal}
╟─ 🍁 *𝑽𝒊𝒔𝒕𝒂𝒔:* ${vistas || 'Desconocido'}
╟─ 🌳 *𝑭𝒆𝒄𝒉𝒂:* ${ago || 'Desconocido'}
╟─ 🍯 *𝑻𝒂𝒎𝒂𝒏̃𝒐:* ${tamaño}
╟─ 📡 *𝑪𝒂𝒍𝒊𝒅𝒂𝒅:* ${tipoMensaje}
╟─ 🔗 *𝑬𝒏𝒍𝒂𝒄𝒆:* ${url}
╚═════════════════════╝`

    const thumb = (await conn.getFile(thumbnail))?.data
    const JT = {
      contextInfo: {
        externalAdReply: {
          title: wm,
          body: club,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    await conn.reply(m.chat, infoMessage, m, JT)    

    if (command === 'mp3' || command === 'playaudio') {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const resulta = api.result
        const result = resulta.download.url    
        if (!result) throw new Error('⚠ El enlace de audio no se generó correctamente.')

        await conn.sendMessage(m.chat, {
          audio: { url: result },
          fileName: `${api.result.title}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: fkontak })
        
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. Esto puede deberse a que el archivo es demasiado pesado o a un error en la generación de la URL. Por favor, intenta nuevamente más tarde.', m)
      }

    } else if (command === 'mp4' || command === 'playvideo') {
      try {
        const response = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=stellar-ReKwdxiR`)
        const json = await response.json()

        if (!json.status || !json.data?.dl) throw new Error('⚠ Enlace no válido o no se pudo generar el video.')

        await conn.sendFile(m.chat, json.data.dl, `${json.data.title}.mp4`, title, fkontak)

      } catch (e) {
        return conn.reply(m.chat, '*⚠︎ No se pudo enviar el video. Esto puede deberse a que el archivo es demasiado pesado o a un error en la generación de la URL. Por favor, intenta nuevamente más tarde.*', m)
      }

    } else {
      return conn.reply(m.chat, '✧︎ Comando no reconocido.', m)
    }

  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error}`)
  }
}

handler.command = handler.help = ['mp3', 'mp4', 'playaudio', 'playvideo']
handler.tags = ['descargas']
//handler.group = true

export default handler

function formatViews(views) {
  if (views === undefined) return "No disponible"

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
  }

  return views.toString()
}