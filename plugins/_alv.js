import pkg from '@whiskeysockets/baileys'
const { prepareWAMessageMedia } = pkg
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

// Etiquetas del menú
const tags = {
  anime: 'ANIME',
  juegos: 'JUEGOS',
  main: 'INFO',
  ia: 'IA',
  search: 'SEARCH',
  game: 'GAME',
  serbot: 'SUB BOTS',
  rpg: 'RPG',
  sticker: 'STICKER',
  group: 'GROUPS',
  nable: 'ON / OFF',
  premium: 'PREMIUM',
  downloader: 'DOWNLOAD',
  tools: 'TOOLS',
  fun: 'FUN',
  nsfw: 'NSFW',
  cmd: 'DATABASE',
  owner: 'OWNER',
  audio: 'AUDIOS',
  advanced: 'ADVANCED',
  weather: 'WEATHER',
  news: 'NEWS',
  finance: 'FINANCE',
  education: 'EDUCATION',
  health: 'HEALTH',
  entertainment: 'ENTERTAINMENT',
  sports: 'SPORTS',
  travel: 'TRAVEL',
  food: 'FOOD',
  shopping: 'SHOPPING',
  productivity: 'PRODUCTIVITY',
  social: 'SOCIAL',
  security: 'SECURITY',
  custom: 'CUSTOM'
}

// Fuentes decoradas
const fonts = [
  txt => txt.replace(/[A-Za-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D00)), // pequeña
  txt => txt.replace(/[A-Za-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D400)), // negrita
  txt => txt.replace(/[A-Za-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D4D0)), // cursiva
  txt => txt.replace(/[A-Za-z]/g, c => String.fromCodePoint(c.charCodeAt(0) + 0x1D5A0))  // redonda
]

let handler = async (m, { conn }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const user = global.db.data.users[userId] || {}
    const name = await conn.getName(userId)
    const mode = global.opts["self"] ? "Privado" : "Público"
    const totalCommands = Object.keys(global.plugins).length
    const totalreg = Object.keys(global.db.data.users).length
    const uptime = clockString(process.uptime() * 1000)
    const { exp = 0, level = 0 } = user
    const { min, xp, max } = xpRange(level, global.multiplier || 1)

    const help = Object.values(global.plugins)
      .filter(p => !p.disabled)
      .map(p => ({
        help: Array.isArray(p.help) ? p.help : (p.help ? [p.help] : []),
        tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : []),
        limit: p.limit,
        premium: p.premium
      }))

    // Título decorado con fuente 2 (negrita)
    let menuText = fonts[1](`
╭════〔 ⚡ SUKUNA - BOT ⚡ 〕════╮
│ 🧃 Usuario: @${userId.split('@')[0]}
│ ⚡ Tipo: ${(conn.user.jid === global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
│ 🌐 Modo actual: ${mode}
│ 👥 Usuarios registrados: ${totalreg}
│ ⏱️ Tiempo activo: ${uptime}
│ 💾 Comandos: ${totalCommands}
╰════════════════════════════╯
📋 COMANDOS DISPONIBLES ⚡
${readMore}`)

    // Comandos por categoría
    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag))
      if (!comandos.length) continue
      menuText += `\n╭─🧃 ${tags[tag]} ${getRandomEmoji()}\n`
      menuText += comandos.map(menu =>
        menu.help.map(cmd =>
          `│ ✦ ${cmd}${menu.limit ? ' ⭐' : ''}${menu.premium ? ' 🪪' : ''}`
        ).join('\n')
      ).join('\n')
      menuText += `\n╰────────────────────────────╯`
    }

    menuText += `\n\n👑 © Powered by Shadow'Core - Sukuna`

    const imageUrl = 'https://kirito-bot-md.vercel.app/IMG-20250606-WA0167.jpg'
    const imageBuffer = await (await fetch(imageUrl)).buffer()
    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: menuText,
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
  }
}

handler.help = ['menu1']
handler.tags = ['main']
handler.command = ['menu1']
handler.register = true
export default handler

// Extras
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getRandomEmoji() {
  const emojis = ['👑', '🔥', '🌟', '⚡']
  return emojis[Math.floor(Math.random() * emojis.length)]
}