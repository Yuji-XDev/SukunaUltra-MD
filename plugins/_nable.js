import { createHash } from 'crypto' 
import fetch from 'node-fetch'

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()
  let isAll = false, isUser = false
  let isEnable = chat[type] || false

  if (args[0] === 'on' || args[0] === 'enable') {
    isEnable = true;
} else if (args[0] === 'off' || args[0] === 'disable') {
    isEnable = false
} else {
    const estado = isEnable ? '✓ Activado' : '✗ Desactivado'
    return conn.reply(m.chat, `╭━〔 ⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 〕━╮
┃ 📜 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨: *${command}*
┃ 🛡️ 𝐬𝐨𝐥𝐨 𝐩𝐮𝐞𝐝𝐞 𝐬𝐞𝐫 𝐠𝐞𝐬𝐭𝐢𝐨𝐧𝐚𝐝𝐨 𝐩𝐨𝐫 𝐚𝐝𝐦𝐢𝐧𝐬.
┃
┃ 🔧 𝐏𝐚𝐫𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫:
┃ ┗ ❯ *${usedPrefix}${command} on*
┃ 📴 𝐏𝐚𝐫𝐚 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐫:
┃ ┗ ❯ *${usedPrefix}${command} off*
┃
┃ 👾 𝐄𝐬𝐭𝐚𝐝𝐨 𝐚𝐜𝐭𝐮𝐚𝐥: *${estado}*
╰━━━━━━━━━━━━━━━━━━━━━━╯`, m, rcanal);
  }

  switch (type) {
    case 'welcome':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break  
      
    case 'antiprivado':
    case 'antiprivate':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.antiPrivate = isEnable
      break

    case 'antiarabe':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.antiarabe = isEnable
      break

    case 'restrict':
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break

    case 'antibot':
    case 'antibots':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
      break

    case 'autoaceptar':
    case 'aceptarauto':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autoAceptar = isEnable
      break

    case 'autorechazar':
    case 'rechazarauto':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.autoRechazar = isEnable
      break

    case 'autoresponder':
    case 'autorespond':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autoresponder = isEnable
      break

    case 'antisubbots':
    case 'antibot2':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot2 = isEnable
      break

    case 'modoadmin':
    case 'soloadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;

    case 'reaction':
    case 'reaccion':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.reaction = isEnable
      break
      
    case 'nsfw':
    case 'modohorny':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break
      
    case 'antilink2':
     if (!m.isGroup) {
       if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
       }
     } else if (!isAdmin) {
       global.dfail('admin', m, conn)
       throw false
     }
     chat.antiLink2 = isEnable
     break
      
    case 'jadibotmd':
    case 'modejadibot':
      isAll = true
      if (!isOwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      bot.jadibotmd = isEnable
      break

    case 'detect':
    case 'avisos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break
      
    case 'antiver':
    case 'antiocultar':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiver = isEnable
      break
      
    case 'audios':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.audios = isEnable
      break   

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break

      case 'antifake':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antifake = isEnable
      break
  }
  
  chat[type] = isEnable;
  
  conn.reply(m.chat, `╭━〔 ✦ 𝐅𝐔𝐍𝐂𝐈𝐎𝐍 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ✦ 〕━╮
┃ 🧩 𝐅𝐮𝐧𝐜𝐢𝐨𝐧: *${type}*
┃ ⚙️ 𝐄𝐬𝐭𝐚𝐝𝐨: *${isEnable ? '✅ 𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎' : '❌ 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎'}*
┃ 🌍 𝐀𝐩𝐥𝐢𝐜𝐚: ${isAll ? '🌐 *𝐏𝐀𝐑𝐀 𝐓𝐎𝐃𝐎 𝐄𝐋 𝐁𝐎𝐓*' : isUser ? '👤 *𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐄𝐒𝐏𝐄𝐂𝐈𝐅𝐈𝐂𝐎*' : '💬 *𝐏𝐀𝐑𝐀 𝐄𝐒𝐓𝐄 𝐂𝐇𝐀𝐓*'}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`, m, rcanal);
};

handler.help = ['welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink', 'audios', 'antiver', 'antiocultar', 'antilink2', 'antiarabe']
handler.tags = ['nable'];
handler.command = ['welcome', 'bienvenida', 'antiprivado', 'antiprivate', 'restrict', 'restringir', 'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar', 'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antibot2', 'modoadmin', 'soloadmin', 'reaction', 'reaccion', 'nsfw', 'modohorny', 'antispam', 'jadibotmd', 'modejadibot', 'subbots', 'detect', 'avisos', 'antilink', 'audios', 'antiver', 'antiocultar', 'antilink2', 'antiarabe']

export default handler
