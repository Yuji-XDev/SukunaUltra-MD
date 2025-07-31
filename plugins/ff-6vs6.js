import axios from 'axios'

let handler = async (m, { conn, args}) => {
  if (!args[0]) throw `
╭─❍ *💥 RETO 6 VS 6 💥*
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
│   🥷🏻 •
│   🥷🏻 •
│
│🔄 *Suplentes:*
│   🥷🏻 •
│   🥷🏻 •
╰─────────────────❍
`

  const mensajes = [
    "🔥 𝘊𝘖𝘔𝘉𝘈𝘛𝘌 𝘗𝘙𝘌𝘗𝘈𝘙𝘈𝘋𝘖 | 𝘌𝘲𝘶𝘪𝘱𝘰 6𝘟6",
    "⚡ 𝘙𝘌𝘛𝘖 𝘈𝘊𝘛𝘐𝘝𝘖 | 𝘚𝘦𝘭𝘦𝘤𝘤𝘪ó𝘯 𝘥𝘦 𝘓𝘪𝘥𝘦𝘳𝘦𝘴",
    "💣 𝘓𝘭𝘢𝘮𝘢𝘥𝘰 𝘎𝘳𝘶𝘱𝘢𝘭 | 𝘌𝘴𝘤𝘶𝘢𝘥𝘳𝘢 𝘎𝘦𝘯𝘦𝘴𝘪𝘴"
  ]
  const imagenes = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg",
    "https://iili.io/HZOHhlx.jpg"
  ]

  const textoRandom = mensajes[Math.floor(Math.random() * mensajes.length)]
  const imagenRandom = imagenes[Math.floor(Math.random() * imagenes.length)]

  let thumbBuffer
  try {
    const res = await axios.get(imagenRandom, { responseType: 'arraybuffer'})
    thumbBuffer = Buffer.from(res.data)
} catch (err) {
    console.error("Error al cargar imagen de miniatura:", err)
    thumbBuffer = Buffer.from('')
}

  const izumi = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
},
    message: {
      orderMessage: {
        itemCount: 6,
        message: textoRandom,
        footerText: "Sasuke Bot MD",
        thumbnail: thumbBuffer,
        surface: 2,
        sellerJid: "0@s.whatsapp.net"
}
}
}

  await conn.sendMessage(m.chat, {
    image: { url: 'https://cdn.russellxz.click/16b3faeb.jpeg'},
    caption: `╭─❍ *💥 6 VS 6 | RETO SASUKE 💥*\n│\n│⏳ *Horario:*\n│🇲🇽 MÉXICO: ${args[0]}\n│🇨🇴 COLOMBIA: ${args[0]}\n│\n│🎮 *Modalidad:*\n│👥 *Jugadores:*\n│\n│🏆 *Escuadra 1:*\n│   👑 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│   🥷🏻 • \n│\n│🔄 *Suplentes:*\n│   🥷🏻 • \n│   🥷🏻 • \n╰─────────────────❍`,
    mentions: []
}, { quoted: izumi})
}

handler.help = ['6vs6']
handler.tags = ['freefire']
handler.command = /^(vs6|6vs6|masc6)$/i
handler.group = true
handler.admin = true

export default handler