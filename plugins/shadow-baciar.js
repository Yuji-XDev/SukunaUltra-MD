let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`🚫 *Debes escribir el prefijo de país para vaciar los chats.*\n\n📌 *Ejemplo:* ${usedPrefix + command} +212`);
  }

  const prefijo = args[0].replace(/\D/g, '');

  if (!/^\d{1,4}$/.test(prefijo)) {
    return m.reply(`⚠️ *Prefijo inválido.* Solo se permiten números con máximo 4 dígitos.\n\n📌 *Ejemplo:* ${usedPrefix + command} +51`);
  }

  const chats = Object.entries(conn.chats)
    .filter(([jid, chat]) => jid.endsWith('@s.whatsapp.net') && jid.startsWith(prefijo))
    .map(([jid]) => jid);

  if (!chats.length) {
    return m.reply(`📭 *No se encontraron chats que comiencen con +${prefijo}.*`);
  }

  m.reply(`🧹 *Vaciando ${chats.length} chats que comienzan con +${prefijo}...*`);

  for (let jid of chats) {
    await conn.chatModify({ clear: { messages: [{ id: '', fromMe: true, timestamp: Date.now() }] } }, jid);
  }

  m.reply(`✅ *Chats vaciados correctamente.*`);
};

handler.command = ['vaciar'];
handler.owner = true;
export default handler;