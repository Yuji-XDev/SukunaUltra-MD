let media = './src/catalogo.jpg'
let handler = async (m, { conn, command }) => {
let user = db.data.users[m.sender]
let str = `𝐻𝑂𝐿𝐴 𝐵𝐼𝐸𝑁𝑉𝐸𝑁𝐼𝐷𝑂 𝐸𝑆𝑇𝐸 𝐸𝑆 𝐸𝑁 𝑀𝐸𝑁𝑈 𝐷𝐸 𝐿𝐴 𝐴𝐿𝑉 𝑋𝐷`
await conn.sendButton(m.chat, str, `𝐃𝐄𝐕.𝐒𝐇𝐀𝐃𝐎𝐖\n${wm}\n\n` + wm, media, [
['𝗚𝗥𝗨𝗣𝗢𝗦 ~', '.grupos'],
['𝗖𝗥𝗘𝗔𝗗𝗢𝗥 • 𝗢𝗙𝗖', '#owner'],
['☘️ 𝗠𝗘𝗡𝗨 • 𝗔𝗟𝗟', '/menu']], null, [
['𝗚𝗜𝗧𝗛𝗨𝗕', `https://github.com/Yuji-XDev/SukunaUltra-MD`]], fkontak)}

handler.command = ['alv']
handler.exp = 80
export default handler
