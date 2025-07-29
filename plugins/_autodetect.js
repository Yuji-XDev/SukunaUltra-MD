import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'
let nombre, foto, edit, newlink, status, admingp, noadmingp
nombre = `╭─⃟⃝💠 𝑴𝑶𝑫𝑰𝑭𝑰𝑪𝑨𝑪𝑰𝑶́𝑵 𝑫𝑬 𝑵𝑶𝑴𝑩𝑹𝑬 ─╮
┃ 👤 Usuario: *${usuario}*
┃ ✨ Ha cambiado el nombre del grupo.
┃ 🆕 Nuevo nombre:
┃ ❝ *${m.messageStubParameters[0]}* ❞
╰───⃟⃝🌟━━━━━━━━━━━━━╯`

foto = `╭─⃟📸 𝑰𝑴𝑨𝑮𝑬𝑵 𝑨𝑪𝑻𝑼𝑨𝑳𝑰𝒁𝑨𝑫𝑨 ─╮
┃ 🧑 Usuario: *${usuario}*
┃ 🔄 Ha cambiado la imagen del grupo.
╰───⃟🎨━━━━━━━━━━━━━━╯`

edit = `╭─⃟⚙️ 𝑪𝑶𝑵𝑭𝑰𝑮𝑼𝑹𝑨𝑪𝑰𝑶́𝑵 𝑮𝑹𝑼𝑷𝑨𝑳 ─╮
┃ 👤 Usuario: *${usuario}*
┃ 🔁 Modificó las opciones del grupo.
${m.messageStubParameters[0] == 'on' ?
'┃ 🔒 Modo actual: *Solo administradores* pueden configurar.'
:
'┃ 🔓 Modo actual: *Todos los miembros* pueden configurar.'}
╰────⚙️━━━━━━━━━━━━━━╯`

newlink = `╭─⃟🔗 𝑬𝑵𝑳𝑨𝑪𝑬 𝑹𝑬𝑵𝑶𝑽𝑨𝑫𝑶 ─╮
┃ 👤 Generado por: *${usuario}*
┃ 🌍 Se creó un nuevo enlace de invitación.
╰────🔗━━━━━━━━━━━━━━╯`

status = `
╭─⃟🛡️ 𝑪𝑨𝑴𝑩𝑰𝑶 𝑫𝑬 𝑴𝑶𝑫𝑶 ─╮
┃ 👤 Acción de: *${usuario}*
${m.messageStubParameters[0] == 'on' ?
'┃ 🔒 El grupo está *cerrado* — Solo los administradores pueden escribir.'
:
'┃ 🔓 El grupo está *abierto* — Todos los miembros pueden escribir.'}
╰────🛡️━━━━━━━━━━━━━━╯`

admingp = `╭─⃟👑 𝑨𝑫𝑴𝑰𝑵 𝑨𝑺𝑰𝑮𝑵𝑨𝑫𝑶 ─╮
┃ 🔰 *@${m.messageStubParameters[0].split`@`[0]}*
┃ Ahora tiene permisos de administrador.
┃ 📌 Nombrado por: *${usuario}*
╰──────👑━━━━━━━━━━━━╯`

noadmingp = `╭─⃟⚠️ 𝑷𝑬𝑹𝑫𝑰𝑫𝑨 𝑫𝑬 𝑨𝑼𝑻𝑶𝑹𝑰𝑫𝑨𝑫 ─╮
┃ 🔻 *@${m.messageStubParameters[0].split`@`[0]}*
┃ Ha sido removido como administrador.
┃ 🗑️ Ejecutado por: *${usuario}*
╰──────⚠️━━━━━━━━━━━━╯`

if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender)
const sessionPath = './Sessions/'
for (const file of await fs.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('[ Archivo Eliminado ]')} ${chalk.greenBright(`'${file}'`)}\n` +
`${chalk.blue('(Session PreKey)')} ${chalk.redBright('que provoca el "undefined" en el chat')}`
)}}

} else if (chat.detect && m.messageStubType == 21) {
await this.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 22) {
await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 23) {
await this.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 25) {
await this.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 26) {
await this.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 29) {
await this.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 30) {
await this.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else {
if (m.messageStubType == 2) return
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})
}}
export default handler
