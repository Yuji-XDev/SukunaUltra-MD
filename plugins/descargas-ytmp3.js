import fetch from 'node-fetch'
import yts from 'yt-search'

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `ingrese un enlace o nombre de canción 🎶`, m)
    }

    await conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key } })

    let url = text
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      const search = await yts(text)
      if (!search.videos.length) return m.reply('❌ No se encontraron resultados.', m)
      url = search.videos[0].url
    }

    const api = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${url}`
    const res = await fetch(api)
    const json = await res.json()

    if (!json?.status || !json.download) {
      throw new Error('⚠️ No se pudo obtener el audio.')
    }

    await conn.sendMessage(m.chat, {
      audio: { url: json.download },
      mimetype: 'audio/mpeg',
      fileName: `${json.title || 'audio'}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: json.title,
          body: 'YouTube • MP3',
          mediaType: 1,
          thumbnailUrl: json.thumbnail,
          sourceUrl: url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error('❌ Error en ytmp3:', e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    return conn.reply(m.chat, `❌ *Error:* ${e.message}`, m)
  }
}

handler.command = ['ytmp3']
handler.tags = ['descargas']
handler.help = ['ytmp3 *<link o nombre>*']

export default handler