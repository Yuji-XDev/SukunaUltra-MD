import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
  let userId = m.sender
  let name = await conn.getName(userId)

  /*// Define las variables necesarias
  let namegrupo = 'Grupo Oficial'
  let gp1 = 'https://chat.whatsapp.com/xxxxxxxxxxxxxxxxxx'

  let namecomu = 'Comunidad Anime'
  let comunidad1 = 'https://chat.whatsapp.com/yyyyyyyyyyyyyyyyyy'

  let namechannel = 'Canal de Noticias'
  let channel = 'https://whatsapp.com/channel/zzzzzzzzzzzzzzzzzzz'

  let dev = 'Sukuna Creator ✨'

  // Imagen a mostrar (puedes reemplazar esta URL o usar una local)
  let catalogo = 'https://i.imgur.com/VXW1P8a.jpg' // Ejemplo de imagen

  // Emoji de reacción
  let emojis = '🌐'
*/
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
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler