import fetch from 'node-fetch'
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

const auddApiKey = '18a49217b6dea2e9ce6a143ad7a1d530' // Consigue una gratis en https://audd.io/

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!(m.quoted && (m.quoted.mimetype?.includes('audio') || m.quoted.mimetype?.includes('video')))) {
    return m.reply(`🎧 *Responde a un audio o video para detectar la canción.*`)
  }

  try {
    let media = await m.quoted.download()
    let type = await fileTypeFromBuffer(media)
    if (!type) return m.reply('❌ No se pudo determinar el tipo de archivo.')

    // Guardar temporalmente
    let filename = `./tmp/detect_audio.${type.ext}`
    fs.writeFileSync(filename, media)

    // Preparar para enviar a Audd.io
    let form = new FormData()
    form.append('file', fs.createReadStream(filename))
    form.append('return', 'apple_music,spotify') // info adicional
    form.append('api_token', auddApiKey)

    const response = await axios.post('https://api.audd.io/', form, {
      headers: form.getHeaders()
    })

    let json = response.data
    if (!json || !json.result) {
      fs.unlinkSync(filename)
      return m.reply('❌ No se pudo detectar ninguna canción.')
    }

    let res = json.result
    let msg = `
╭━━〔 *🎶 Canción Detectada* 〕━━⬣
┃💿 *Título:* ${res.title}
┃🎤 *Artista:* ${res.artist}
┃💽 *Álbum:* ${res.album || 'Desconocido'}
┃🌐 *Género:* ${res.genre || 'Desconocido'}
┃🕒 *Duración:* ${res.duration || 'No disponible'}
┃🔗 *Spotify:* ${res.spotify?.external_urls?.spotify || 'No disponible'}
┃🍎 *Apple:* ${res.apple_music?.url || 'No disponible'}
╰━━━━━━━━━━━━━━━━━━⬣`.trim()

    await conn.reply(m.chat, msg, m)
    fs.unlinkSync(filename)

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al detectar la canción. Intenta nuevamente.')
  }
}

handler.help = ['adivinaaudio']
handler.tags = ['audio']
handler.command = /^(adivinaaudio|shazam|whatsong)$/i
export default handler