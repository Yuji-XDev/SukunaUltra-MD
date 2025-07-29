var handler = async (m, { conn, participants, usedPrefix, command }) => {
    if (!m.mentionedJid[0] && !m.quoted) {
        return conn.reply(m.chat, `${emoji} Debes mencionar a un usuario para poder expulsarlo del grupo.`, m);
    }

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net';
    //const nn = conn.getName(m.sender);

    if (user === conn.user.jid) {
        return conn.reply(m.chat, `⚡ *No puedo eliminar el bot del grupo.*`, m, rcanal);
    }

    if (user === ownerGroup) {
        return conn.reply(m.chat, `⚡ *No puedo eliminar al propietario del grupo.*`, m, rcanal);
    }

    if (user === ownerBot) {
        return conn.reply(m.chat, `⚡ *No puedo eliminar al propietario del bot.*`, m, rcanal);
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

/*conn.reply(`${suitag}@s.whatsapp.net`, `╭━〔 🛡️ 𝗔𝗰𝗰𝗶𝗼́𝗻 𝗔𝗱𝗺𝗶𝗻 〕━⬣
┃
┃ 🐛 Un usuario fue eliminado por un administrador.
┃ 🌳 Grupo: *${groupMetadata.subject}*
┃
╰━━━━━━━━━━━━━━━━━━━━⬣`, m, rcanal, );*/
};

handler.help = ['kick'];
handler.tags = ['grupo'];
handler.command = ['kick','echar','hechar','sacar','ban'];
handler.admin = true;
handler.group = true;
handler.register = true
handler.botAdmin = true;

export default handler;