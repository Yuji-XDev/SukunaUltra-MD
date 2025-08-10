import pkg from '@whiskeysockets/baileys'
const { prepareWAMessageMedia } = pkg
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

// Etiquetas
const tags = {
  anime: 'ANIME', juegos: 'JUEGOS', main: 'INFO', ia: 'IA', search: 'SEARCH',
  game: 'GAME', serbot: 'SUB BOTS', rpg: 'RPG', sticker: 'STICKER', group: 'GROUPS',
  nable: 'ON / OFF', premium: 'PREMIUM', downloader: 'DOWNLOAD', tools: 'TOOLS',
  fun: 'FUN', nsfw: 'NSFW', cmd: 'DATABASE', owner: 'OWNER', audio: 'AUDIOS',
  advanced: 'ADVANCED', weather: 'WEATHER', news: 'NEWS', finance: 'FINANCE',
  education: 'EDUCATION', health: 'HEALTH', entertainment: 'ENTERTAINMENT',
  sports: 'SPORTS', travel: 'TRAVEL', food: 'FOOD', shopping: 'SHOPPING',
  productivity: 'PRODUCTIVITY', social: 'SOCIAL', security: 'SECURITY', custom: 'CUSTOM'
}

// Fuentes decoradas
const fonts = {
  bold: txt => txt.replace(/[A-Za-z]/g, c => {
    const map = {
      A:'𝗔',B:'𝗕',C:'𝗖',D:'𝗗',E:'𝗘',F:'𝗙',G:'𝗚',H:'𝗛',I:'𝗜',J:'𝗝',
      K:'𝗞',L:'𝗟',M:'𝗠',N:'𝗡',O:'𝗢',P:'𝗣',Q:'𝗤',R:'𝗥',S:'𝗦',T:'𝗧',
      U:'𝗨',V:'𝗩',W:'𝗪',X:'𝗫',Y:'𝗬',Z:'𝗭',
      a:'𝗮',b:'𝗯',c:'𝗰',d:'𝗱',e:'𝗲',f:'𝗳',g:'𝗴',h:'𝗵',i:'𝗶',j:'𝗷',
      k:'𝗸',l:'𝗹',m:'𝗺',n:'𝗻',o:'𝗼',p:'𝗽',q:'𝗾',r:'𝗿',s:'𝘀',t:'𝘁',
      u:'𝘂',v:'𝘃',w:'𝘄',x:'𝘅',y:'𝘆',z:'𝘇'
    }
    return map[c] || c
  }),
  cursive: txt => txt.replace(/[A-Za-z]/g, c => {
    const map = {
      A:'𝓐',B:'𝓑',C:'𝓒',D:'𝓓',E:'𝓔',F:'𝓕',G:'𝓖',H:'𝓗',I:'𝓘',J:'𝓙',
      K:'𝓚',L:'𝓛',M:'𝓜',N:'𝓝',O:'𝓞',P:'𝓟',Q:'𝓠',R:'𝓡',S:'𝓢',T:'𝓣',
      U:'𝓤',V:'𝓥',W:'𝓦',X:'𝓧',Y:'𝓨',Z:'𝓩',
      a:'𝓪',b:'𝓫',c:'𝓬',d:'𝓭',e:'𝓮',f:'𝓯',g:'𝓰',h:'𝓱',i:'𝓲',j:'𝓳',
      k:'𝓴',l:'𝓵',m:'𝓶',n:'𝓷',o:'𝓸',p:'𝓹',q:'𝓺',r:'𝓻',s:'𝓼',t:'𝓽',
      u:'𝓾',v:'𝓿',w:'𝔀',x:'𝔁',y:'𝔂',z:'𝔃'
    }
    return map[c] || c
  }),
  block: txt => txt.replace(/[A-Za-z]/g, c => {
    const map = {
      A:'🅰',B:'🅱',C:'🅲',D:'🅳',E:'🅴',F:'🅵',G:'🅶',H:'🅷',I:'🅸',J:'🅹',
      K:'🅺',L:'🅻',M:'🅼',N:'🅽',O:'🅾',P:'🅿',Q:'🆀',R:'🆁',S:'🆂',T:'🆃',
      U:'🆄',V:'🆅',W:'🆆',X:'🆇',Y:'🆈',Z:'🆉'
    }
    return map[c] || c
  })
}

let handler = async (m, { conn }) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const user = global.db.data.users[userId] || {}
    const mode = global.opts["self"] ? "Privado" : "Público"
    const totalCommands = Object.keys(global.plugins).length
    const totalreg = Object.keys(global.db.data.users).length
    const uptime = clockString(process.uptime() * 1000)

    const help = Object.values(global.plugins)
      .filter(p => !p.disabled)
      .map(p => ({
        help: Array.isArray(p.help) ? p.help : (p.help ? [p.help] : []),
        tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : []),
        limit: p.limit,
        premium: p.premium
      }))

    // Título en bloque
    let menuText = fonts.block(`
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

    // Categorías y comandos
    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag))
      if (!comandos.length) continue
      menuText += `\n╭─🧃 ${fonts.cursive(tags[tag])} ${getRandomEmoji()}\n`
      menuText += comandos.map(menu =>
        menu.help.map(cmd =>
          `│ ✦ ${fonts.bold(cmd)}${menu.limit ? ' ⭐' : ''}${menu.premium ? ' 🪪' : ''}`
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