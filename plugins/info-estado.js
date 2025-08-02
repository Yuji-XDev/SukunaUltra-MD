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
let info = `
╭═══════🎯⃟⃟⃢⃟⃢⟡⃝⃟⃢⃟⃢⃟⃟🎯════════⬣
┃     🌐 *『 SUKUNA - STATUS 』* ⚙️
┃────────────────────────
┃ ✦🧠 *Creador:* ${etiqueta}
┃ ✦💬 *Prefijo:* [ ${usedPrefix} ]
┃ ✦🔖 *Versión:* ${vs}
┃ ✦💌 *Chats Privados:* ${chats.length - groupsIn.length}
┃ ✦🌐 *Total de Chats:* ${chats.length}
┃ ✦👥 *Usuarios:* ${totalreg}
┃ ✦👑 *Grupos:* ${groupsIn.length}
┃ ✦🕰️ *Actividad:* ${uptime}
┃ ✦⚡ *Velocidad:* ${(speed * 1000).toFixed(0) / 1000} ms
┃ ✦🤖 *Subbots Activos:* ${totalUsers || '0'}
╰═════⊷ 🧧 *SUKUNA.MD* 🧧`;
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
