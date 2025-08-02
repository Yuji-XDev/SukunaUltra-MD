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
  const wm = '◟𝐒𝐮𝐤𝐮𝐧𝐚 𝐁𝐨𝐭◞';
  const mencionados = participants.map(p => p.id);

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
    mentions: mencionados,
    contextInfo: {
      mentionedJid: mencionados,
      externalAdReply: {
        //title: '✧ 𝙄𝙉𝙑𝙊𝘾𝘼𝙉𝘿𝙊 𝙀𝙎𝙋𝙄𝙍𝙄𝙏𝙐𝙎 ꦿ✧',
        body: grupo,
        thumbnailUrl: logo,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
      }
    }
  }, { quoted: m });
};

handler.help = ['todos *<mensaje>*'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall', 'marcar'];
handler.admin = true;
handler.group = true;

export default handler;