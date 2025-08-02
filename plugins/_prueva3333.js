let gruposRegistrados = new Set()

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!global.owner.some(([num]) => m.sender.includes(num)))
    return m.reply('❌ Solo los *dueños* pueden usar este comando.')

  const opcion = (args[0] || '').toLowerCase()
  if (opcion === 'on') {
    global.antiAddGroup = true
    m.reply('✅ *Protección activada.*\nEl bot se saldrá de grupos nuevos si no fue agregado por un dueño.')
  } else if (opcion === 'off') {
    global.antiAddGroup = false
    m.reply('🛑 *Protección desactivada.*')
  } else {
    m.reply(`✳️ Uso correcto:\n*${usedPrefix + command} on* – Activar\n*${usedPrefix + command} off* – Desactivar`)
  }
}

handler.participantsUpdate = async function ({ id, participants, action }, conn) {
  if (!global.antiAddGroup) return
  if (action !== 'add') return

  const botNumber = conn.user.id.split(':')[0]
  const isBotAdded = participants.includes(botNumber)
  if (!isBotAdded) return

  try {
    if (gruposRegistrados.has(id)) return

    const metadata = await conn.groupMetadata(id)
    const admins = metadata.participants.filter(p => p.admin).map(p => p.id)

    const isAddedByOwner = global.owner.some(([number]) =>
      admins.includes(number + '@s.whatsapp.net')
    )

    if (!isAddedByOwner) {
      await conn.sendMessage(id, {
        text: `⚠️ *Modo Protección Activado* 💚\n\nEste bot fue agregado sin autorización de un dueño.\nPor seguridad, salgo del grupo.\n\n> si quiere el bot en su grupo puede solicitarlo con el creador use #owner para contactarlo`,
      })
      await conn.groupLeave(id)
    } else {
      gruposRegistrados.add(id)
    }
  } catch (e) {
    console.error(e)
  }
}

handler.all = async function (m, { conn }) {
  if (!conn.chats) return
  Object.entries(conn.chats).forEach(([id, data]) => {
    if (id.endsWith('@g.us')) gruposRegistrados.add(id)
  })
}

handler.help = ['antiadd on', 'antiadd off']
handler.tags = ['owner']
handler.command = /^antiadd$/i
handler.owner = true

export default handler