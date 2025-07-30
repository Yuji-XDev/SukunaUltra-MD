global.jadi = 'JadiBots'
if (!global[global.jadi]) global[global.jadi] = {} // Si no existe la lista, la crea

let handler = async (m, { conn, text, command }) => {
  let user = m.sender
  let number = user.split('@')[0]
  let name = await conn.getName(user)
  let fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })

  if (!text) throw `✳️ Ingresa el nombre del nuevo subbot.\nEj: *.newsubbot SukunaBotMD*`

  // Registrar subbot en la lista global
  if (!global[global.jadi][user]) {
    global[global.jadi][user] = {
      nombre: name,
      subbots: []
    }
  }

  global[global.jadi][user].subbots.push({
    nombre: text,
    fecha
  })

  const total = global[global.jadi][user].subbots.length
  const canalNotificaciones = '120363420753090795@g.us' // Cambiar por tu grupo/canal

  // Enviar notificación
  const mensaje = `
╭━━〔 *📣 NUEVO SUBBOT CONECTADO* 〕━━⬣
┃👤 Usuario: @${number}
┃📦 Subbot: *${text}*
┃🕒 Fecha: ${fecha}
┃📈 Total de Subbots: *${total}*
╰━━━━━━━━━━━━━━━━━━⬣`

  await conn.sendMessage(canalNotificaciones, {
    text: mensaje,
    mentions: [user]
  }, { quoted: m })

  await m.reply(`✅ Subbot *${text}* registrado.`)
}

handler.command = /^newsubbot$/i
handler.owner = true // Solo dueños pueden registrar subbots

export default handler


=