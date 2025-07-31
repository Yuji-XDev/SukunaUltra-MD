/*export async function before(m, { conn }) {
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
│ 🎮 Sin el sistema activo, no puedes usar comandos.
│ 🧃 Solo un *administrador* puede volver a activarlo.
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


  await m.react('💔');

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

  const texto = mensajesNoEncontrado[Math.floor(Math.random() * mensajesNoEncontrado.length)];
  const imgurl = 'https://files.catbox.moe/jyz3f8.jpg';

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/js2plu.jpg' },
    caption: texto,
    footer: '\nseleccione una opcion para obtener ayuda',
    buttons: [
      { buttonId: '#menu', buttonText: { displayText: '🌳 Menu Principal' }, type: 1 },
      { buttonId: '#estado', buttonText: { displayText: '🌷 Información del Bot' }, type: 1 },
      { buttonId: '#sistema', buttonText: { displayText: '🌾 Ver sistema del Bot' }, type: 1 },
    ],
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        title: '🌸 Dev.Shadow 🌸',
        body: '🌾◌*̥₊ 𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 𝑀𝐷 ◌❐🎋༉',
        thumbnailUrl: imgurl,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
      }
    }
  }, { quoted: fkontak });
}