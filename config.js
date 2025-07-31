import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.botNumber = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['51969214380', '🎄 Propietario', true],
  ['51994114690'],
  ['51988013368'],
  ['5217721320355', 'alan xD', true],
  ['527721320355', 'no lo conosco', true],
  ['59898719147', 'xD', true],
  ['51919199620', 'shadow•core', true],
  
// <-- Número @lid -->
  ['193196806148194', '🎄 Propietario', true],
  ['54984876003559', 'alan', true],
  ['28240030740606', 'no lo conosco', true],
  ['119069730668723', 'xD', true],
  ['80754461647013', 'shadow', true]
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['51969214380'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '𖤐 𝐒𝐮𝐤𝐮𝐧𝐚 𝐌𝐃 𖤐'
global.namebot = '⸸𝕊𝖚𝖐𝖚𝖓𝖆 𝕭𝖔𝖙⸸🎄'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.shadowJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '🎄  ⸸ 𝕊𝖚𝖐𝖚𝖓𝖆 𝕭𝖔𝖙 𝑴𝑫 ⸸  🎋'
global.botname = '✦⃟⛧ _𝑺𝑼𝑲𝑼𝑵𝑨⛧ 𝑩𝑶𝑻_ 🎄┋⃟✧'
global.wm = '◟𝐒𝐮𝐤𝐮𝐧𝐚 𝐁𝐨𝐭◞'
global.author = '★彡[𝓜𝓪𝓭𝓮 𝓫𝔂 𝓢ʜᴀᴅᴏᴡ𝓬𝓸𝓻𝓮]彡★'
global.dev = '୧ㅤミ★ 》 Tʜᴇ sʜᴀᴅᴏᴡ`ᴄᴏʀᴇ《★彡 🎋'
global.bot = '𝑺𝒖𝒌𝒖𝒏𝒂 𝑩𝒐𝒕'
global.club = '͞⋆⬪࣪ꥈ🥮★ 𝖯𑄜𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝖲𝗁⍺𝖽ᦅ𝗐′core 𝖢𝗅𝗎𝖻𓆪'
global.textbot = '𝚂𝚄𝙺𝚄𝙽𝙰 𝙱𝙾𝚃 𝕏 𝕊ℍ𝔸𝔻𝕆𝕎•ℂ𝕆ℝ𝔼'
global.etiqueta = '@sʜᴀᴅᴏᴡ°ᴄᴏʀᴇ'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'llamas'
//global.welcom1 = '💥 𝐄ძі𝗍ᥲ ᥱᥣ ᥕᥱᥣᥴ᥆mᥱ ᥴ᥆ᥒ #sᥱ𝗍ᥕᥱᥣᥴ᥆mᥱ'
//global.welcom2 = '💥 𝐄ძі𝗍ᥲ ᥱᥣ ᥕᥱᥣᥴ᥆mᥱ ᥴ᥆ᥒ #sᥱ𝗍ᑲᥡᥱ'
global.banner = 'https://files.catbox.moe/r3jdyl.jpg'
global.avatar = 'https://files.catbox.moe/kjh6ga.jpg'
global.logo = 'https://files.catbox.moe/ha863t.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.comunidad1 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.channel = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.channel2 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.md = 'https://github.com/Yuji-XDev/SukunaUltra-MD'
global.correo = 'blackoficial2025@gmail.com'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363401008003732@newsletter',
}
global.multiplier = 60

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
