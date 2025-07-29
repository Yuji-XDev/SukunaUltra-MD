import fetch from 'node-fetch';

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🌑';
  await m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn);
    throw false;
  }

  const mensaje = args.length ? args.join(' ') : '⚠️ *No se proporcionó mensaje.*';
  const grupo = await conn.getName(m.chat);

  const encabezado = `
╭━━━〔 ⚠️ 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙋𝘼𝙍𝘼 𝙏𝙊𝘿𝙊𝙎 ⚠️ 〕━━⬣
┃ 💬 *𝙈𝙀𝙉𝙎𝘼𝙅𝙀:* ${mensaje}
┃ 🧿 *𝙂𝙍𝙐𝙋𝙊:* ${grupo}
┃ 👥 *𝙈𝙄𝙀𝙈𝘽𝙍𝙊𝙎:* ${participants.length}
╰━━━━━━━━━━━━━━━━━━⬣`.trim();

  let textoFinal = [
    `╭─〔 ⚡ 𝙎𝙐𝙆𝙐𝙉𝘼 𝘽𝙊𝙏 𝙄𝙉𝙑𝙊𝘾𝘼𝙏𝙄𝙊𝙉 🌳 〕─╮`,
    `┃ 🔱 𝐋𝐥𝐚𝐦𝐚𝐝𝐨 𝐝𝐞 𝐥𝐚𝐬 𝐬𝐨𝐦𝐛𝐫𝐚𝐬…`,
    `┃`,
    `┃ 📣 *MENSAJE:*`,
    `┃ ⤷ ${mensaje}`,
    `┃`,
    `┃ 🕷️ *Grupo:* ${grupo}`,
    `┃ 👥 *Miembros:* ${participants.length}`,
    `┃━━━━━━━━━━━━━━━━━━⬣`
  ];

  for (const user of participants) {
    textoFinal.push(`┃ ✦ @${user.id.split('@')[0]}`);
  }

  textoFinal.push(`╰⊰━━━━━━⊱⬣\n> ${wm}`);

  await conn.sendMessage(m.chat, {
    text: textoFinal.join('\n'),
    mentions: participants.map(p => p.id),
    contextInfo: {
      mentionedJid: participants.map(p => p.id),
      externalAdReply: {
        title: '✧ 𝙄𝙉𝙑𝙊𝘾𝘼𝙉𝘿𝙊 𝙀𝙎𝙋𝙄𝙍𝙄𝙏𝙐𝙎 ꦿ✧',
        body: club,
        thumbnailUrl: logo,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
      }
    }
  }, { quoted: fkontak });
};

handler.help = ['todos *<mensaje>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar'];
handler.admin = true;
handler.group = true;

export default handler;