import ws from 'ws'

let handler = async (m, { conn, command }) => {
  if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) {
    return conn.reply(m.chat, `🌳 El comando *${command}* está desactivado temporalmente.`, m)
  }


  const connsActivas = global.conns.filter(c => 
    c?.user && c?.ws?.socket && c.ws.socket.readyState === ws.OPEN
  )


  const _muptime = process.uptime() * 1000
  const uptime = clockString(_muptime)


  const vistos = new Set()
  const subbotsUnicos = connsActivas.filter(c => {
    const jid = c.user?.jid
    if (vistos.has(jid)) return false
    vistos.add(jid)
    return true
  })

  const totalSubs = subbotsUnicos.length
  const maxSubbots = 50
  const disponibles = maxSubbots - totalSubs


  const lista = subbotsUnicos.map((bot, i) => {
    const tiempoActivo = bot.uptime 
      ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime) 
      : 'Desconocido'

    return `╭➤ Sσƈƙꫀƚ #${i + 1} 𓆩🌳𓆪
│⤿ 🧪 \`Usuario:\` ${bot.user?.name || 'Sub Bot'}
│⤿ 🏮 \`Link:\` wa.me/${(bot.user?.jid || '').replace(/[^0-9]/g, '')}
│⤿ 🍯 \`En línea:\` ${tiempoActivo}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈꒱`
  }).join('\n\n')

  const textoSubbots = totalSubs === 0
    ? '🌙 No hay *Sub-Bots activos* por ahora.'
    : `*✦ Sockets Activos de Sukuna Ultra-MD ✦*

> ⟢ ⌛ *Tiempo Activo:* _[ ${uptime} ]_
> ⟢ 🌳 *Sessions Libres:* _[ ${disponibles} ]_
> ⟢ 🎄 *Subs conectados:* _[ ${totalSubs} ]_

   - *Lista de Subs Conectados* -

${lista}

> ${club}`

  await conn.sendMessage(m.chat, {
    text: textoSubbots,
    contextInfo: {
      externalAdReply: {
        title: `🍁 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐂𝐎𝐍𝐄𝐂𝐓𝐀𝐃𝐎𝐒 🏮`,
        body: `🧪 Conectados: ${totalSubs}/${maxSubbots}`,
        thumbnailUrl: 'https://files.catbox.moe/zgvj8c.jpg',
        sourceUrl: 'https://github.com/Yuji-XDev/SukunaUltra-MD',
        mediaType: 1,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: fkontak })
}

handler.command = ['sockets', 'bots', 'socket']
handler.tags = ['jadibot']
handler.help = ['sockets']

export default handler


function convertirMsADiasHorasMinutosSegundos(ms) {
  let segundos = Math.floor(ms / 1000)
  let minutos = Math.floor(segundos / 60)
  let horas = Math.floor(minutos / 60)
  let dias = Math.floor(horas / 24)
  segundos %= 60
  minutos %= 60
  horas %= 24
  let res = []
  if (dias) res.push(`${dias} días`)
  if (horas) res.push(`${horas} horas`)
  if (minutos) res.push(`${minutos} minutos`)
  if (segundos) res.push(`${segundos} segundos`)
  return res.join(', ')
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}