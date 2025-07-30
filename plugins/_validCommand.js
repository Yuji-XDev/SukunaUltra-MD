/*
export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmdList = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmdList.includes(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat?.isBanned) {
      const avisoDesactivado = `╭─⭑❨ 🔒 𝐁𝐎𝐓 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎 ❩⭑─╮
│ 🚫 *${bot}* está *desactivado* en este grupo.
│ 
│ 🎮 Sin el sistema activo, no puedes usar comandos.
│ 🧃 Solo un *administrador* puede volver a activarlo.
│ 
│ ✅ Usa: *${usedPrefix}bot on*
╰────────────────────────╯`;

      await conn.sendMessage(m.chat, {
        text: avisoDesactivado,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: 'Dev.Shadow 🇦🇱',
            body: '🌾◌*̥₊ Sukuna MD ◌❐🎋༉',
            thumbnailUrl: 'https://files.catbox.moe/mez710.jpg',
            sourceUrl: 'https://github.com/Yuji-XDev',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak });
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;
    return;
  }

  await m.react('🍰');
  const mensajesNoEncontrado = [
    `╭─⭑❨ ⚠️ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐈𝐧𝐯𝐚́𝐥𝐢𝐝𝐨 👾 ❩⭑─╮
│ 🖍️ El comando *"${command}"* no existe.
│ 🍰 Usa *${usedPrefix}menu* para ver todos los comandos.
╰────────────────────────╯`,

    `⭑❨ 💫 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐍𝐨 𝐄𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐝𝐨 ❩⭑
 🪷 *"${command}"* no está disponible en el sistema.
 🫧 Revisa el menú con *${usedPrefix}menu*.`,

    `⭑❨ 🐰 𝐄𝐫𝐫𝐨𝐫 𝐝𝐞 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 🌴 ❩⭑
> 🌾 El comando *"${command}"* no forma parte del bot.
> 🍰 Usa *${usedPrefix}menu* para orientarte mejor.`,

    `⭑❨ 🌳 𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐃𝐞𝐬𝐜𝐨𝐧𝐨𝐜𝐢𝐝𝐨 🌳 ❩⭑
> 🧸 No se encontró *"${command}"* en la lista de comandos.
> 🌳 Consulta el menú con *${usedPrefix}menu*.`,

    `『⛔』 El comando *${usedPrefix + command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`
  ];

  const mensaje = mensajesNoEncontrado[Math.floor(Math.random() * mensajesNoEncontrado.length)];

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: 'Dev.Shadow 🇦🇱',
        body: '🌾◌*̥₊ 𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 𝑀𝐷 ◌❐🎋༉',
        thumbnailUrl: 'https://files.catbox.moe/mez710.jpg',
        sourceUrl: 'https://github.com/Yuji-XDev',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: fkontak });
}*/


export async function before(m, { conn }) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  const isValidCommand = (command, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmdList = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
      if (cmdList.includes(command)) return true;
    }
    return false;
  };

  if (isValidCommand(command, global.plugins)) {
    let chat = global.db.data.chats[m.chat];
    let user = global.db.data.users[m.sender];

    if (chat?.isBanned) {
      const avisoDesactivado = `╭─⭑❨ 🔒 𝐁𝐎𝐓 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎 ❩⭑─╮
│ 🚫 *${bot}* está *desactivado* en este grupo.
│ 
│ 🎮 Sin el sistema activo, no puedes usar comandos.
│ 🧃 Solo un *administrador* puede volver a activarlo.
│ 
│ ✅ Usa: *${usedPrefix}bot on*
╰────────────────────────╯`;

      await conn.sendMessage(m.chat, {
        text: avisoDesactivado,
        mentions: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: 'Dev.Shadow 🇦🇱',
            body: '🌾◌*̥₊ 𝐒𝐔𝐊𝐔𝐍𝐀 𝐔𝐋𝐓𝐑𝐀 𝐌𝐃 ◌❐🎋༉',
            thumbnailUrl: 'https://files.catbox.moe/5spi6g.jpg',
            sourceUrl: 'https://github.com/Yuji-XDev',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak });
      return;
    }

    if (!user.commands) user.commands = 0;
    user.commands += 1;
    return;
  }

  await m.react('🍰');
  const mensajesNoEncontrado = [
`╭─❍〔 ⚠️ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐈𝐍𝐕Á𝐋𝐈𝐃𝐎 〕❍─╮
│ 🚫 El comando *"${command}"* no está registrado.
│ 🧭 Usa *${usedPrefix}menu* para ver las funciones.
╰───────────────────────╯`,

`╭─❍〔 🧩 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐃𝐄𝐒𝐂𝐎𝐍𝐎𝐂𝐈𝐃𝐎 〕❍─╮
│ 💡 *"${command}"* no se encuentra en la base del bot.
│ 📌 Revisa el menú con *${usedPrefix}menu*.
╰────────────────────────────╯`,

`╭─❍〔 🌐 𝐄𝐑𝐑𝐎𝐑 𝐃𝐄 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 〕❍─╮
│ 🪐 El comando *"${command}"* no es válido.
│ 🎯 Consulta *${usedPrefix}menu* para más info.
╰────────────────────────────╯`,

`╭─❍〔 💥 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐍𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 〕❍─╮
│ 🧸 *"${command}"* no fue reconocido por el sistema.
│ 📚 Usa *${usedPrefix}menu* para navegar.
╰────────────────────────────╯`,

`╭─❍〔 🛑 𝐂𝐎𝐌𝐀𝐍𝐃𝐎 𝐈𝐍𝐄𝐗𝐈𝐒𝐓𝐄𝐍𝐓𝐄 〕❍─╮
│ ⛔ *${usedPrefix + command}* no existe.
│ 📖 Consulta la lista con *${usedPrefix}help*.
╰────────────────────────────╯`
];

  const mensaje = mensajesNoEncontrado[Math.floor(Math.random() * mensajesNoEncontrado.length)];

  await conn.sendMessage(m.chat, {
  text: mensaje,
  footer: '🌾◌*̥₊ 𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 𝑀𝐷 ◌❐🎋༉',
  templateButtons: [
    { index: 1, urlButton: { displayText: '🌐 GitHub', url: 'https://github.com/Yuji-XDev' } },
    { index: 2, callButton: { displayText: '📞 Llamar al Dev', phoneNumber: '+51987654321' } },
    { index: 3, quickReplyButton: { displayText: '📜 Menú', id: '#menu' } },
    { index: 4, quickReplyButton: { displayText: '💖 Donar', id: '#donar' } },
    { index: 5, quickReplyButton: { displayText: '📎 InfoBot', id: '#infobot' } }
  ],
  contextInfo: {
    externalAdReply: {
      title: 'Dev.Shadow 🇦🇱',
      body: '🌾◌*̥₊ 𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 𝑀𝐷 ◌❐🎋༉',
      thumbnailUrl: 'https://files.catbox.moe/5spi6g.jpg',
      sourceUrl: 'https://github.com/Yuji-XDev',
      mediaType: 1,
      renderLargerThumbnail: true,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363401008003732@newsletter',
        newsletterName: '=͟͟͞𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 • 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⌺',
        serverMessageId: -1
      }
    }
  }
}, { quoted: m });
}