let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  const isSubBot = global.conn && conn.user?.jid !== global.conn.user?.jid;

  if (!isOwner && !isSubBot) {
    return conn.reply(m.chat, '❌ Este comando solo funciona para el dueño del bot o subbots.\n\n💡 Si quieres usarlo, conéctate como subbot.', m, fake);
  }

  let media = m.quoted ? m.quoted : m;
  let mime = (media.msg || media).mimetype || '';
  if (!/image\/(jpe?g|png)/i.test(mime)) {
    return conn.reply(m.chat, `📸 Envía o responde una imagen con el comando:\n\n*${usedPrefix + command}*`, m, fake);
  }

  try {
    let img = await media.download();
    await conn.updateProfilePicture(conn.user.jid, img);
    await conn.reply(m.chat, '✅ Foto de perfil actualizada con éxito.', m);
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Ocurrió un error al actualizar la foto de perfil.', m);
  }
};

handler.help = ['setppbot'];
handler.tags = ['owner'];
handler.command = ['setppbot'];

handler.owner = true;
handler.rowner = true;
handler.private = true;

export default handler;