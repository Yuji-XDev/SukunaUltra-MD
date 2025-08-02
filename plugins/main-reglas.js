let handler = async (m, { conn, usedPrefix, command, text }) => {
  const loading = [
    '《▰▱▱▱▱▱▱▱▱▱》10%',
    '《▰▰▱▱▱▱▱▱▱▱》20%',
    '《▰▰▰▱▱▱▱▱▱▱》30%',
    '《▰▰▰▰▱▱▱▱▱▱》40%',
    '《▰▰▰▰▰▱▱▱▱▱》50%',
    '《▰▰▰▰▰▰▱▱▱▱》60%',
    '《▰▰▰▰▰▰▰▱▱▱》70%',
    '《▰▰▰▰▰▰▰▰▱▱》80%',
    '《▰▰▰▰▰▰▰▰▰▱》90%',
    '《▰▰▰▰▰▰▰▰▰▰》100%',
    '━━━〔 ✅ 𝗖𝗔𝗥𝗚𝗔 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗔 〕━━⬣',
    '📜 Enviando reglas del bot...'
  ];

  const imgCarga = 'https://files.catbox.moe/19azgy.mp4';

  for (let paso of loading) {
    await conn.sendMessage(m.chat, {
      text: paso,
      edit: key
    });
    await new Promise(r => setTimeout(r, 400));
  }

  if (['botreglas', 'reglasdelbot', 'reglasbot', 'reglas'].includes(command)) {
    const texto = `
╭══🎴『 𝙍𝙀𝙂𝙇𝘼𝙈𝙀𝙉 Sukuna 』🎴══╮
┃ ⚠️ *𝐂𝐨𝐝𝐢𝐠𝐨 𝐝𝐞 𝐎𝐧𝐨𝐫 – Black*
┃
┃ ✘ No llamar al bot innecesariamente.
┃ ✘ No hacer spam o comandos repetitivos.
┃ ✘ No añadir a grupos sin autorización.
┃ ✘ No faltar el respeto al sistema ni a los admins.
┃ ✘ Contacta al creador en caso de errores o dudas.
╰═══════════════════════⬣

╭─❖ ⚜️ *𝐀𝐕𝐈𝐒𝐎 𝐄𝐒𝐏𝐄𝐂𝐈𝐀𝐋* ⚜️ ❖─╮
\`\`\`
❗ Si incumples cualquiera de estas reglas, el bot tomará medidas automáticas.
\`\`\`
╰──────────────────────────╯

╭─❖ 💠 *𝐑𝐄𝐂𝐎𝐌𝐄𝐍𝐃𝐀𝐂𝐈𝐎𝐍* 💠 ❖─╮
\`\`\`
⭐ Si te gusta el bot, visita el repositorio y apóyalo con una estrella.
\`\`\`
╰──────────────────────────╯

> ${md || 'https://github.com'}
> ${textbot || '@SukunaBotMD'}`.trim();

    await conn.sendFile(m.chat, imgCarga, 'sukuna.mp4', texto, fkontak);
  }

  else if (['gruporeglas', 'reglasgp'].includes(command)) {
    if (!m.isGroup) return conn.reply(m.chat, '❗ Este comando solo se puede usar en grupos.', m);

    try {
      const groupInfo = await conn.groupMetadata(m.chat);
      const url = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null);
      const fallbackImage = global.logo || imgCarga;

      const texto = `
📜 *Reglas del grupo:*
*"${groupInfo.subject}"*

${groupInfo.desc?.trim() || 'No hay reglas establecidas en la descripción del grupo.'}
      `.trim();

      await conn.sendFile(m.chat, url || fallbackImage, 'group.jpg', texto, m);
    } catch (e) {
      console.error(e);
      await conn.reply(m.chat, '❌ No se pudieron obtener las reglas del grupo. Asegúrate de usar este comando en un grupo válido.', m);
    }
  }
};

handler.help = ['botreglas', 'gruporeglas'];
handler.tags = ['main'];
handler.command = ['botreglas', 'reglasdelbot', 'reglasbot', 'reglas', 'gruporeglas', 'reglasgp'];
handler.register = true;
handler.coin = 4;

export default handler;