import fs from 'fs'
import path from 'path'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
import FormData from 'form-data'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'
import yts from 'yt-search'

const streamPipeline = promisify(pipeline)

let handler = async (m, { conn }) => {
  const rawID = conn.user?.id || ''
  const subbotID = rawID.split(':')[0] + '@s.whatsapp.net'

  const prefixPath = path.resolve('prefixes.json')
  let prefixes = {}
  if (fs.existsSync(prefixPath)) {
    prefixes = JSON.parse(fs.readFileSync(prefixPath, 'utf-8'))
  }
  const usedPrefix = prefixes[subbotID] || '.'

  const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage
  if (!quotedMsg || (!quotedMsg.audioMessage && !quotedMsg.videoMessage)) {
    return await conn.sendMessage(m.chat, {
      text: `🎵 *Responde a una nota de voz, audio o video para identificar la canción.*`
    }, { quoted: m })
  }

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })

  try {
    const tmpDir = path.join('./tmp')
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)

    const fileExt = quotedMsg.audioMessage ? 'mp3' : 'mp4'
    const inputPath = path.join(tmpDir, `${Date.now()}.${fileExt}`)

    const stream = await downloadContentFromMessage(
      quotedMsg.audioMessage || quotedMsg.videoMessage,
      quotedMsg.audioMessage ? 'audio' : 'video'
    )
    const writer = fs.createWriteStream(inputPath)
    for await (const chunk of stream) writer.write(chunk)
    writer.end()

    const form = new FormData()
    form.append('file', fs.createReadStream(inputPath))
    form.append('expiry', '3600')

    const upload = await axios.post('https://cdn.russellxz.click/upload.php', form, {
      headers: form.getHeaders()
    })
    if (!upload.data?.url) throw '❌ No se pudo subir el archivo.'

    const fileUrl = upload.data.url
    const apiURL = `https://api.neoxr.eu/api/whatmusic?url=${encodeURIComponent(fileUrl)}&apikey=russellxz`
    const res = await axios.get(apiURL)
    if (!res.data.status || !res.data.data) throw '❌ No se pudo identificar la canción.'

    const { title, artist, album, release } = res.data.data
    const ytSearch = await yts(`${title} ${artist}`)
    const video = ytSearch.videos[0]
    if (!video) throw '❌ No se encontró la canción en YouTube.'

    const banner = `
╭━━━〔 🎶 𝙈𝙐𝙎𝙄𝘾 𝘿𝙀𝙏𝙀𝘾𝙏𝙀𝘿 〕━━⬣
┃📌 *Título:* ${title}
┃👤 *Artista:* ${artist}
┃💽 *Álbum:* ${album}
┃📅 *Lanzamiento:* ${release}
┃🎧 *Resultado:* ${video.title}
┃⏱️ *Duración:* ${video.timestamp}
┃👁️ *Vistas:* ${video.views.toLocaleString()}
┃📺 *Canal:* ${video.author.name}
┃🔗 *Link:* ${video.url}
╰━━━〔 𝙒𝙖𝙞𝙩 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜... 〕━━⬣`

    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: banner
    }, { quoted: m })

    const ytRes = await axios.get(`https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(video.url)}&type=audio&quality=128kbps&apikey=russellxz`)
    const audioURL = ytRes.data.data.url

    const rawPath = path.join(tmpDir, `${Date.now()}_raw.m4a`)
    const finalPath = path.join(tmpDir, `${Date.now()}_final.mp3`)

    const audioRes = await axios.get(audioURL, { responseType: 'stream' })
    await streamPipeline(audioRes.data, fs.createWriteStream(rawPath))

    await new Promise((resolve, reject) => {
      ffmpeg(rawPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .save(finalPath)
        .on('end', resolve)
        .on('error', reject)
    })

    await conn.sendMessage(m.chat, {
      audio: fs.readFileSync(finalPath),
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: m })

    fs.unlinkSync(inputPath)
    fs.unlinkSync(rawPath)
    fs.unlinkSync(finalPath)

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `❌ *Error:* ${e.message || e}`
    }, { quoted: m })
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    })
  }
}

handler.help = ['whatmusic3']
handler.tags = ['tools']
handler.command = /^whatmusic3$/i
export default handler