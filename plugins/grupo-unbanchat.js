let handler = async (m, { conn, usedPrefix, command, args }) => {
  let chat = global.db.data.chats[m.chat]
  if (!(m.chat in global.db.data.chats)) {
    return conn.reply(m.chat, `✧ *𝐄𝐒𝐓𝐄 𝐓𝐄𝐑𝐑𝐄𝐍𝐎 𝐍𝐎 𝐇𝐀 𝐒𝐈𝐃𝐎 𝐂𝐎𝐍𝐐𝐔𝐈𝐒𝐓𝐀𝐃𝐎 𝐏𝐎𝐑 𝐒𝐔𝐊𝐔𝐍𝐀...*`, m)
  }

  if (command === 'bot') {
    if (args.length === 0) {
      const estado = chat.isBanned ? '✘ 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐀𝐃𝐎' : '✔ 𝐀𝐂𝐓𝐈𝐕𝐎'
      const info = `╭══ ⪻ ⚙️ 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 𝐃𝐄 𝐒𝐔𝐊𝐔𝐍𝐀 ⪼ ══⬤
┃   
┃ 🧩 *𝐎𝐧𝐥𝐲 𝐭𝐡𝐞 𝐛𝐫𝐚𝐯𝐞 𝐚𝐝𝐦𝐢𝐧𝐬 𝐜𝐚𝐧 𝐜𝐨𝐧𝐭𝐫𝐨𝐥 𝐒𝐮𝐤𝐮𝐧𝐚.*
┃
┣━⪻ 𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒 ⪼━⬤
┃ ⚡ ${usedPrefix}bot on ➤ *𝐄𝐧𝐜𝐞𝐧𝐝𝐞𝐫 𝐞𝐥 𝐜𝐚𝐨𝐬*
┃ 🔕 ${usedPrefix}bot off ➤ *𝐂𝐚𝐥𝐥𝐚𝐫 𝐚 𝐥𝐚 𝐛𝐞𝐬𝐭𝐢𝐚*
┃
┣━⪻ 𝐄𝐒𝐓𝐀𝐃𝐎 𝐀𝐂𝐓𝐔𝐀𝐋 ⪼━⬤
┃ 📶 𝐒𝐮𝐤𝐮𝐧𝐚 ➤ ${estado}
┃
╰══ ⪻ 𝐓𝐇𝐄 𝐊𝐈𝐍𝐆 𝐎𝐅 𝐂𝐔𝐑𝐒𝐄𝐒 ⪼ ══⬤`
      return conn.reply(m.chat, info, fkontak, rcanal)
    }

    if (args[0] === 'off') {
      if (chat.isBanned) {
        return conn.reply(m.chat, `🔕 *𝐒𝐔𝐊𝐔𝐍𝐀 𝐘𝐀 𝐒𝐄 𝐄𝐍𝐂𝐔𝐄𝐍𝐓𝐑𝐀 𝐃𝐄𝐓𝐄𝐍𝐈𝐃𝐎 𝐄𝐍 𝐄𝐒𝐓𝐄 𝐓𝐄𝐑𝐑𝐄𝐍𝐎.*`, m, fake)
      }
      chat.isBanned = true
      return conn.reply(m.chat, `🩸 *𝐄𝐋 𝐑𝐄𝐘 𝐃𝐄 𝐋𝐀𝐒 𝐌𝐀𝐋𝐃𝐈𝐂𝐈𝐎𝐍𝐄𝐒 𝐇𝐀 𝐒𝐈𝐋𝐄𝐍𝐂𝐈𝐀𝐃𝐎 𝐄𝐒𝐓𝐄 𝐂𝐇𝐀𝐓...*`, m, fake)
    } else if (args[0] === 'on') {
      if (!chat.isBanned) {
        return conn.reply(m.chat, `✔ *𝐒𝐔𝐊𝐔𝐍𝐀 𝐘𝐀 𝐑𝐄𝐈𝐍𝐀𝐁𝐀 𝐄𝐍 𝐄𝐒𝐓𝐄 𝐋𝐔𝐆𝐀𝐑.*`, m, fake)
      }
      chat.isBanned = false
      return conn.reply(m.chat, `🔱 *𝐒𝐔𝐊𝐔𝐍𝐀 𝐇𝐀 𝐑𝐄𝐓𝐎𝐑𝐍𝐀𝐃𝐎... 𝐒𝐈𝐄𝐌𝐁𝐑𝐄 𝐄𝐋 𝐂𝐀𝐎𝐒.*`, m, fake)
    }
  }
}

handler.help = ['bot']
handler.tags = ['grupo']
handler.command = ['bot']
handler.admin = true

export default handler