import fg from 'api-dylux'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, command, usedPrefix}) => {
  if (!args[0]) throw `
╭─❍ *🔱 RETO 4 VS 4 🔱*
│
│⏳ *Horario:*
│🇲🇽 MÉXICO:
│🇨🇴 COLOMBIA:
│
│🎮 *Modalidad:*
│👥 *Jugadores:*
│
│🏆 *Escuadra 1:*
│   👑 •
│   🥷🏻 •
│   🥷🏻 •
│   🥷🏻 •
│
│🧱 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰───────────────❍
`

  const fkontak = {
    key: {
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'AlienMenu'
},
    message: {
      locationMessage: {
        name: '🛸 INVOCACIÓN GRUPAL | Sasuke Bot MD',
        jpegThumbnail: await (await fetch('https://files.catbox.moe/1j784p.jpg')).buffer(),
        vcard:
          'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:;Sasuke;;;\n' +
          'FN:Sasuke Bot\n' +
          'ORG:Kaneki Developers\n' +
          'TITLE:\n' +
          'item1.TEL;waid=19709001746:+1 (970) 900-1746\n' +
          'item1.X-ABLabel:Alien\n' +
          'X-WA-BIZ-DESCRIPTION:Reto organizado vía Sasuke Bot MD 🌀\n' +
          'X-WA-BIZ-NAME:Sasuke\n' +
          'END:VCARD'
}
}
}

  await conn.sendMessage(m.chat, {
    text: '🎯 *Reto grupal activo | Sasuke Bot MD*',
}, { quoted: fkontak})

  // Mensaje visual principal
  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭─❍ *4 VS 4 | RETO SASUKE* 🔥\n│\n│⏳ *Horario:*\n│🇲🇽 MÉXICO: ${args[0]}\n│🇨🇴 COLOMBIA: ${args[0]}\n│\n│🎮 *Modalidad:*\n│👥 *Jugadores:*\n│\n│🏆 *Escuadra 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🧱 *Suplentes:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰───────────────❍`,
    mentions: []
}, { quoted: fkontak})
}

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(vs4|4vs4|masc4)$/i
handler.group = true

export default handler