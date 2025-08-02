let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`🚫 *Debes escribir el prefijo de país para vaciar los chats.*\n\n📌 *Ejemplo:* ${usedPrefix + command} +212`);
  }

  const prefijo = args[0].replace(/\D/g, '');

  if (!/^\d{1,4}$/.test(prefijo)) {
    return m.reply(`⚠️ *Prefijo inválido.* Solo se permiten números con máximo 4 dígitos.\n\n📌 *Ejemplo:* ${usedPrefix + command} +51`);
  }

  const chats = Object.entries(conn.chats)
    .filter(([jid]) => {
      if (!jid.endsWith('@s.whatsapp.net')) return false;
      const number = jid.split('@')[0];
      return number.startsWith(prefijo);
    })
    .map(([jid]) => jid);

  if (!chats.length) {
    return m.reply(`📭 *No se encontraron chats que comiencen con +${prefijo}.*`);
  }

  m.reply(`🧹 *Vaciando ${chats.length} chats que comienzan con +${prefijo}...*`);

  for (let jid of chats) {
    try {
      await conn.chatModify({ clear: { messages: [{ id: '', fromMe: true, timestamp: Date.now() }] } }, jid);
    } catch (e) {
      console.error(`Error limpiando el chat ${jid}:`, e);
    }
  }

  m.reply(`✅ *Se han vaciado ${chats.length} chats correctamente.*`);
};

handler.command = ['vaciar'];
handler.owner = true;

export default handler;