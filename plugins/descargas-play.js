import fetch from "node-fetch"
import yts from 'yt-search'
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) return conn.reply(m.chat, `*🎲 Por favor, ingresa el nombre o URL del video.*`, m)

    let videoIdMatch = text.match(youtubeRegexID)
    let search = videoIdMatch ? await yts({ videoId: videoIdMatch[1] }) : await yts(text)
    let video = videoIdMatch
      ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
      : search.videos[0]

    if (!video) return m.reply(`❌ No se encontraron resultados.`)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const tipo = /mp4|playvideo/.test(command) ? "📽️ ᴠɪᴅᴇᴏ" : "🎧 ᴀᴜᴅɪᴏ"
    const canal = author?.name || "Desconocido"
    const vistas = formatViews(views)

    const infoMessage = `
╭━━━〔 🔎 𝙸𝙽𝙵𝙾 𝙳𝙴 𝚅𝙸𝙳𝙴𝙾/𝙰𝚄𝙳𝙸𝙾 〕━━⬣
┃📌 *Título:* ${title}
┃⏱️ *Duración:* ${timestamp || "No disponible"}
┃🧑‍💻 *Canal:* ${canal}
┃👁️ *Vistas:* ${vistas}
┃📆 *Publicado:* ${ago}
┃🎞️ *Tipo:* ${tipo}
┃🔗 *Enlace:* ${url}
╰━━━━━━━━━━━━━━━━━━⬣`

    const thumb = (await conn.getFile(thumbnail)).data

    await conn.sendMessage(m.chat, {
      text: infoMessage,
      contextInfo: {
        externalAdReply: {
          title: "📻 YouTube Downloader",
          body: "Descargas multimedia al instante",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        }
      }
    }, { quoted: m })

    await m.react(tipo.includes('ᴀᴜᴅɪᴏ') ? "🎧" : "📹")

    if (/mp3|playaudio/.test(command)) {
      const api = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)
      const json = await api.json()
      const result = json.result?.download?.url
      if (!result) throw new Error("❌ No se pudo generar el enlace del audio.")

      await conn.sendMessage(m.chat, {
        audio: { url: result },
        fileName: `${json.result.title}.mp3`,
        mimetype: 'audio/mpeg'
      }, { quoted: m })

    } else if (/mp4|playvideo/.test(command)) {
      const res = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=stellar-ReKwdxiR`)
      const json = await res.json()
      if (!json.status || !json.data?.dl) throw new Error("❌ No se pudo generar el enlace del video.")

      await conn.sendMessage(m.chat, {
        video: { url: json.data.dl },
        fileName: `${json.data.title}.mp4`,
        caption: `🎬 ${json.data.title}`
      }, { quoted: m })
    }

  } catch (error) {
    console.error(error)
    return m.reply(`⚠️ Error: ${error.message}`)
  }
}

handler.command = ['mp3', 'mp4', 'playaudio', 'playvideo']
handler.tags = ['descargas']
export default handler

function formatViews(views) {
  if (!views) return "No disponible"
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}k (${views.toLocaleString()})`
  return views.toString()
}