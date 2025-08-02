let handler = async (m, { conn, args, usedPrefix, command }) => {
  const botNumber = conn.user?.id?.split(':')[0];

  if (!m.sender.includes(botNumber)) {
    return m.reply('🚫 *Este comando solo puede usarse en el bot oficial.*');
  }

  if (!args[0]) {
    return m.reply(`📌 *Debes escribir el prefijo de país para vaciar los chats.*\n\n✏️ *Ejemplo:* ${usedPrefix + command} +212`);
  }

  const prefijo = args[0].replace(/\D/g, '');

  if (!/^\d{1,4}$/.test(prefijo)) {
    return m.reply(`⚠️ *Prefijo inválido.* Solo se permiten números con máximo 4 dígitos.\n\n🧾 *Ejemplo válido:* ${usedPrefix + command} +51`);
  }

  const chats = Object.entries(conn.chats)
    .filter(([jid]) => jid.endsWith('@s.whatsapp.net') && jid.split('@')[0].startsWith(prefijo))
    .map(([jid]) => jid);

  if (!chats.length) {
    return m.reply(`📭 *No se encontraron chats privados que comiencen con +${prefijo}.*`);
  }

  m.reply(`🧹 *Vaciando ${chats.length} chats privados que comienzan con +${prefijo}...*`);

  for (let jid of chats) {
    try {
      await conn.chatModify(
        { clear: { messages: [{ id: '', fromMe: true, timestamp: Date.now() }] } },
        jid
      );
    } catch (e) {
      console.error(`❌ Error al limpiar el chat ${jid}:`, e);
    }
  }

  m.reply(`✅ *Se han vaciado correctamente ${chats.length} chats privados que empiezan con +${prefijo}.*`);
};

handler.command = ['vaciar', 'baciar'];
handler.owner = true;

export default handler;