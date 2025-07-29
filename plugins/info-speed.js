import { totalmem, freemem } from 'os'
import os from 'os'
import util from 'util'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'
const format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })

var handler = async (m, { conn }) => {

let timestamp = speed()
let latensi = speed() - timestamp

let _muptime = process.uptime() * 1000
let muptime = clockString(_muptime)

let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])


let texto = `*${emoji}「 ${packname} 」*

╔═════🌟 𝙀𝙎𝙏𝘼𝘿𝙊 🌟════╗
┃🚀 *⧼ 𝖁𝖊𝖑𝖔𝖈𝖎𝖉𝖆𝖉 ⧽* 
┃⤷ ⚡ ${latensi.toFixed(4)} ms
╚════════════════════╝

╔═════⏳ 𝘼𝘾𝙏𝙄𝙑𝙄𝘿𝘼𝘿 ⏳═════╗
┃🕒 *𝑇𝑖𝑒𝑚𝑝𝑜 𝑒𝑛 𝑙𝑖́𝑛𝑒𝑎:* 
┃⤷ 🔄 ${muptime}
╚═══════════════════════╝

╔══════📬 𝘾𝙃𝘼𝙏𝙎 📬══════╗
┃💬 *𝘾𝙝𝙖𝙩𝙨 𝘿𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚𝙨:*
┃⤷ 💌 ${chats.length} 𝘾𝙝𝙖𝙩𝙨 𝙋𝙧𝙞𝙫𝙖𝙙𝙤𝙨  
┃⤷ 👥 ${groups.length} 𝙂𝙧𝙪𝙥𝙤𝙨
╚══════════════════════╝

╔═════🖥️ 𝙎𝙀𝙍𝙑𝙄𝘿𝙊𝙍 🖥️══════╗
┃📊 *ℝ𝔸𝕄 𝕌𝕤𝕒𝕕𝕒 / 𝕋𝕠𝕥𝕒𝕝:*
┃⤷ 💽 ${format(totalmem() - freemem())} / ${format(totalmem())}
╚═══════════════════════╝`.trim()

m.react('✈️')

conn.reply(m.chat, texto, m, rcanal, )

}
handler.help = ['speed']
handler.tags = ['info']
handler.command = ['speed']
handler.register = true

export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
