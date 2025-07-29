import ws from 'ws'
let handler = async (m, { conn, usedPrefix, isRowner}) => {
let _uptime = process.uptime() * 1000;
let totalreg = Object.keys(global.db.data.users).length
let totalchats = Object.keys(global.db.data.chats).length

let uptime = clockString(_uptime);
let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) 
const totalUsers = users.length;
let old = performance.now()
let neww = performance.now()
let speed = neww - old
const used = process.memoryUsage()
let info = `╭╼✧ 📊 𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄 SUKUNA ⚙️ ✧\n`
info += `┃\n`
info += `├❍ 🌟 *𝐂𝐑𝐄𝐀𝐃𝐎𝐑:* ${etiqueta}\n`
info += `├❍ 🥥 *𝐏𝐑𝐄𝐅𝐈𝐉𝐎:* [ ${usedPrefix} ]\n`
info += `├❍ 🌱 *𝐕𝐄𝐑𝐒𝐈𝐎́𝐍:* ${vs}\n`
info += `├❍ 🔒 *𝐂𝐇𝐀𝐓𝐒 𝐏𝐑𝐈𝐕𝐀𝐃𝐎𝐒:* ${chats.length - groupsIn.length}\n`
info += `├❍ ⚙️ *𝐂𝐇𝐀𝐓𝐒 𝐓𝐎𝐓𝐀𝐋𝐄𝐒:* ${chats.length}\n`
info += `├❍ 👻 *𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒:* ${totalreg}\n`
info += `├❍ 🦠 *𝐆𝐑𝐔𝐏𝐎𝐒:* ${groupsIn.length}\n`
info += `├❍ ⏱️ *𝐀𝐂𝐓𝐈𝐕𝐈𝐃𝐀𝐃:* ${uptime}\n`
info += `├❍ 🚀 *𝐕𝐄𝐋𝐎𝐂𝐈𝐃𝐀𝐃:* ${(speed * 1000).toFixed(0) / 1000} s\n`
info += `├❍ 🤖 *𝐒𝐔𝐁𝐁𝐎𝐓𝐒 𝐀𝐂𝐓𝐈𝐕𝐎𝐒:*\n`
info += `├➤ 💥 ${totalUsers || '0'}\n`
info += `╰╼♡✦ 𓆩 SUKUNA.MD 𓆪 ✦♡`
await conn.sendFile(m.chat, banner, 'estado.jpg', info, fkontak)
}
handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
