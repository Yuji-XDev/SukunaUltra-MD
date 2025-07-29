import fetch from 'node-fetch'
import db from '../lib/database.js'

const img = 'https://files.catbox.moe/sectzh.jpg'

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid[0] 
           ? m.mentionedJid[0] 
           : m.quoted 
           ? m.quoted.sender 
           : m.sender

  if (who === conn.user.jid) return m.react('✖️')

  if (!(who in global.db.data.users)) {
    return m.reply(`🚫 El usuario no se encuentra en mi base de datos.`)
  }

  let user = global.db.data.users[who]
  let name = await conn.getName(who)

  let txt = `╭─⃝ ⟡ 𓆩 🏦 𝐁𝐀𝐍𝐂𝐎 𝐃𝐄 𝐀𝐕𝐄𝐍𝐓𝐔𝐑𝐀 𓆪 ⟡ ─⃝╮
┃👤 Usuario: *${name}*
┃💰 Dinero: *${user.coin} ${moneda}*
┃🏦 Banco: *${user.bank} ${moneda}*
┃
┃🌟 Experiencia: *${user.exp}* ▓░
┃📈 Nivel: *${user.level}*
┃⚜️ Rango: *${user.role}*
┃
┃📅 Fecha: *${new Date().toLocaleString('id-ID')}*
╰────────────────────────╯

📌 *Consejo:*  
Deposita tu dinero para protegerlo.  
🔐 Usa: *${usedPrefix}deposit*`

  await conn.sendFile(m.chat, img, 'bank.jpg', txt, fkontak, null, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank']
handler.register = true
handler.group = true

export default handler