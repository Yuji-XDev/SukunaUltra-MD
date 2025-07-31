/*import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text || !text.includes('youtu')) {
    return m.reply('🎥 *Por favor, proporciona un enlace válido de YouTube.*');
  }

  await m.react('⏳');

  try {
    if (command === 'ytmp33') {
      const res = await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (!json.status) throw '❌ No se pudo obtener el audio.';

      await conn.sendFile(m.chat, json.download, 'audio.mp3', `🎧 *Título:* ${json.title}\n📥 *Audio descargado con éxito.*`, m);

    } else if (command === 'ytmp44') {
      const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (!json.download) throw '❌ No se pudo obtener el video.';

      await conn.sendFile(m.chat, json.download, 'video.mp4', `🎬 *Título:* ${json.title}\n📽️ *Calidad:* ${json.quality}p\n📥 *Video descargado con éxito.*`, m);
    }
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al procesar la descarga. Intenta más tarde.');
  }
};

handler.help = ['ytmp33 <url>', 'ytmp44 <url>'];
handler.tags = ['downloader'];
handler.command = /^ytmp33|ytmp44$/i;

export default handler;*/


import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('✨️')

    let { exp, bank, registered } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'

    let perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://files.catbox.moe/9i5o9z.jpg')

    // Preparar el tag del usuario
    const userId = m.sender.split('@')[0]
    let taguser = `@${userId}`
    let phone = PhoneNumber('+' + userId)
    let pais = phone.getRegionCode() || 'Desconocido 🌐'

    const vids = [
      'https://files.cloudkuimages.guru/videos/RhnYWAae.mp4',
      'https://files.cloudkuimages.guru/videos/RhnYWAae.mp4',
      'https://files.cloudkuimages.guru/videos/RhnYWAae.mp4'
    ]
    let videoUrl = vids[Math.floor(Math.random() * vids.length)]

    const header = [
      `╔═━★•°*"'*°•★━═╗`,
      `    ✦ ꧁𝐖𝐞𝐥𝐜𝐨𝐦𝐞꧂ ✦`,
      `╚═━★•°*"'*°•★━═╝`
    ].join('\n')

    const user = global.db.data.users[m.sender] || {};
    const country = user.country || '';
    const isPremium = user.premium || false;


    const channelRD = { 
      id: '120363312092804854@newsletter', 
      name: 'Oficial channel Roxy-MD'
    }


    const metaMsg = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '🌸 𝗥𝗢𝗫𝗬 𝗠𝗗 𝗕𝗢𝗧 🌸',
          body: '© 𝑃𝑜𝑤𝑒𝑟𝑒𝑑 𝐵𝑦 𝐷𝑒𝑣𝐵𝑟𝑎𝑦𝑎𝑛',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://files.catbox.moe/9i5o9z.jpg',
          sourceUrl: 'https://github.com/El-brayan502/Roxy-MD--Multi-Device/',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    const body = `hola

`.trim()

    // Unir header + body
    const menu = `${header}\n${body}`

    // Configurar datos para el mensaje
    const botname = '🌸◌*̥₊ Rᴏxʏ-Mᴅ ◌❐🎋༉'
    const textbot = '💖 𝙍𝙊𝙓𝙔 𝘽𝙔 𝘿𝙀𝙑 𝘽𝙍𝘼𝙔𝘼𝙉 ✨️'
    const banner = perfil
    const redes = 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W'
    
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: body,
      gifPlayback: true,
      mentions: [m.sender],  // Agregamos el array de menciones
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]  // También incluimos menciones en el mensaje de error
    }, { 
      quoted: metaMsg 
    })
  }
}

handler.help = ['menu1']
handler.tags = ['main']
handler.command = ['menu1']
handler.register = true
export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
