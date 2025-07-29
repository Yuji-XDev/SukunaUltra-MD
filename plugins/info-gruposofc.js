import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
  let userId = m.sender
  let name = await conn.getName(userId)

  let grupos = `╔═════『 🏮 𝐈𝐍𝐕𝐈𝐓𝐀𝐂𝐈𝐎𝐍 』═════╗
┃  こんにちは, ${name}! 👋
┃  Te invito a unirte a los grupos
┃  oficiales del *Sukuna Bot* para 
┃  convivir con la comunidad 🌸✨
╚════════════════════════════╝

🏯 *Grupo Oficial:* ${namegrupo}  
> *❀* ${gp1}

🎎 *Comunidad:* ${namecomu}  
> *❀* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ ¿Enlace anulado? ¡Únete por aquí!  
📢 *Canal Oficial:* ${namechannel}  
> *❀* ${channel}

🧞‍♂️ *Atentamente:* ${dev}`

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', grupos, m)
  await m.react('🌾')
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler