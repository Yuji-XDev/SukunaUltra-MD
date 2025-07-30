const reinoSombras = '120363420753090795@g.us'

let userName = await conn.getName(userJid).catch(() => 'Desconocido')

const mensajeshadow = `
╭─〔 ✦ 𝐑𝐄𝐈𝐍𝐎 𝐃𝐄 𝐋𝐀𝐒 𝐒𝐎𝐌𝐁𝐑𝐀𝐒 ✦ 〕─╮
│ ☯︎ Se ha conectado un *Nuevo SubBot*...
│
│ 🥀 *Identificador:* +${path.basename(pathshadowJadiBot)}
│ 🕯️ *Nombre del Vínculo:* ${userName}
│
├─❖ Los ecos de un alma se han unido...
│  “Donde las sombras reinan, el pacto está sellado.”
╰──────────────────────────────╯
࿇ ${global.author} ࿇
`

try {
  if (global.conn?.sendMessage && reinoSombras) {
    const ppUser = await conn.profilePictureUrl(userJid, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
    await global.conn.sendMessage(reinoSombras, {
      image: { url: ppUser },
      caption: mensajeshadow
    })
  }

  await joinChannels(conn)

} catch (e) {
  console.error('✦ Error al notificar al Reino de las Sombras:', e)
}

async function joinChannels(conn) {
  for (const channelId of Object.values(global.ch)) {
    await conn.newsletterFollow(channelId).catch(() => {})
  }
}