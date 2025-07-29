let handler = async (m, { conn, text, command }) => {
  const user = global.db.data.users[m.sender]
  command = command || 'unreg'

  if (!text) {
    const caption = `╭━━〔 *🗑️ Confirmación de Eliminación* 〕━━⬣
┃  
┃ ⚠️ ¿Estás segur@ de eliminar tu registro?
┃    
┃ 🔸 𝘌𝘴𝘵𝘰 𝘣𝘰𝘳𝘳𝘢𝘳𝘢́ 𝘵𝘶 𝘥𝘢𝘵𝘰 𝘥𝘦 𝘭𝘢 𝘣𝘢𝘴𝘦, 𝘺 𝘵𝘶 𝘱𝘳𝘰𝘨𝘳𝘦𝘴𝘰...
┃  
╰━━━━━━━━━━━━━━━━━━━━⬣`;

    const buttons = [
      { buttonId: `#${command} sí`, buttonText: { displayText: '✅ Sí, borrar' }, type: 1 },
      { buttonId: `#${command} no`, buttonText: { displayText: '❌ No, cancelar' }, type: 1 }
    ];

    return await conn.sendMessage(m.chat, {
      text: caption.trim(),
      buttons,
      headerType: 1
    }, { quoted: m });
  }

  const decision = text.toLowerCase().split(' ').pop();
  if (decision === 'sí' || decision === 'si') {
    user.registered = false;
    return conn.sendMessage(m.chat, {
      text: `╭━━━〔 𝘋𝘢𝘵𝘰𝘴 𝘌𝘭𝘪𝘮𝘪𝘯𝘢𝘥𝘰𝘴 🧨 〕━━⬣

📛 *Registro eliminado exitosamente*

🪦 𝘛𝘶 𝘩𝘶𝘦𝘭𝘭𝘢 𝘧𝘶𝘦 𝘣𝘰𝘳𝘳𝘢𝘥𝘢 𝘥𝘦𝘭 𝘮𝘶𝘯𝘥𝘰 𝘋𝘦 𝘚𝘶𝘬𝘶𝘯𝘢...
🕯️ 𝘌𝘯 𝘦𝘭 𝘳𝘦𝘴𝘵𝘰, 𝘴𝘰𝘭𝘰 𝘲𝘶𝘦𝘥𝘢 𝘦𝘭 𝘴𝘪𝘭𝘦𝘯𝘤𝘪𝘰...

╰━━━━━━━━━━━━━━━━━━━━⬣`.trim(),
      quoted: m
    });
  } else if (decision === 'no') {
    return conn.reply(m.chat, `❎ *Cancelado.* Tu registro sigue intacto.`, m);
  } else {
    return conn.reply(m.chat, `⛔ *Opción no válida.* Escribe: *${command} sí* o *${command} no*`, m);
  }
};

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler