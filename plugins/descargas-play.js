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
    
    const res2 = await fetch('https://files.catbox.moe/qzp733.jpg');
    const thumb2 = await res2.buffer();
    const Shadow = {
      key: {
        participants: "0@s.whatsapp.net",
        remoteJid: "status@broadcast",
        fromMe: false,
        id: "Halo"
      },
      message: {
        locationMessage: {
          name: `DESCARGA COMPLETA\n[▓▓▓▓▓▓▓▓░░░░] 100%`,
          jpegThumbnail: thumb2
        }
      },
      participant: "0@s.whatsapp.net"
    };

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'
    await m.react('⏱️');
    const infoMessage = `     *<${title || 'Desconocido'}>*\n\n` +
      `> 📺 Canal » *${canal}*\n` +
      `> 👁️ Vistas » *${vistas || 'Desconocido'}*\n` +
      `> ⏱ Duración » *${timestamp || 'Desconocido'}*\n` +
      `> 📆 Publicado » *${ago || 'Desconocido'}*\n` +
      `> 🔗 Link » ${url}`
 
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
          renderLargerThumbnail: true
        }
      }
    }

    await conn.reply(m.chat, infoMessage, m, external)

    if (['playaudio'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)
        const json = await res.json()
        if (!json.result?.download?.url) throw '⚠ No se obtuvo un enlace válido.'

        /*await conn.sendMessage(m.chat, {
          audio: { url: json.result.download.url },
          fileName: `${json.result.title}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })*/
    await m.react('✅');
    await conn.sendMessage(m.chat, {
        text: textoInfo,
      contextInfo: {
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363402079893698@newsletter',
          serverMessageId: '',
          newsletterName: '˗ˏˋ🎤 𝐒𝐚𝐧𝐭𝐚𝐟𝐥𝐨𝐰_ʙᴏᴛ⋆.ᴍᴅ ᯓ✧💌 ˎˊ˗'
        },
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: null,
        externalAdReply: {
          showAdAttribution: true,
          renderLargerThumbnail: true,
          title: title,
          body: '┈ ⋞ 〈 🎤 𝑺𝑨𝑵𝑻𝑨𝑭𝑳𝑶𝑾 - 𝑷𝑬𝑪𝑨𝑫𝑶𝑺 𝑪𝑨𝑷𝑰𝑻𝑨𝑳𝑬𝑺 ⛅ 〉 ⋟ ┈',
          containsAutoReply: true,
          mediaType: 1,
          thumbnailUrl: thumbnail,
          sourceUrl: "https://whatsapp.com/channel/0029Vb6iXGDISTkKY8fxUa39"
      audio: { url: json.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${json.result.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: '🎃 𝖲ANTAFLOW 𝖴𝖫𝖳𝖱𝖠 𝖬𝖣 💨',
          mediaType: 1,
          thumbnail: thumb,
          mediaUrl: url,
          sourceUrl: url,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: Shadow })
      } catch (e) {
        return conn.reply(m.chat, '⚠︎ No se pudo enviar el audio. El archivo podría ser demasiado pesado o hubo un error en la generación del enlace.', m)
      }
    }

    else if (['playvideo'].includes(command)) {
      try {
        const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${url}`)
        const json = await res.json()

        if (!json.download) throw '⚠ No se obtuvo enlace de video.'
        
        await m.react('✅');
        await conn.sendFile(m.chat, json.download, `${json.title || 'video'}.mp4`, `📥 *Video descargado con éxito.*\n\n> 🎬 *Título:* ${json.title}\n> ⏱️ *Duracion:* ${timestamp}\n> 📽️ *Calidad:* ${json.quality}\n> 🔗 *link:* ${url}`, Shadow)
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

handler.command = handler.help = ['playaudio', 'playvideo']
handler.tags = ['descargas']

export default handler

function formatViews(views) {
  if (views === undefined) return "No disponible"
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`
  return views.toString()
}
