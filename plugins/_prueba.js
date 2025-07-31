/*import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text || !text.includes('youtu')) {
    return m.reply('🎥 *Por favor, proporciona un enlace válido de YouTube.*');
  }

  await m.react('⏳');

  try {
    if (command === 'ytmp33') {
      const res = await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (!json.status) throw '❌ No se pudo obtener el audio.';

      await conn.sendFile(m.chat, json.download, 'audio.mp3', `🎧 *Título:* ${json.title}\n📥 *Audio descargado con éxito.*`, m);

    } else if (command === 'ytmp44') {
      const res = await fetch(`https://dark-core-api.vercel.app/api/download/ytmp4/v2?key=api&url=${encodeURIComponent(text)}`);
      const json = await res.json();

      if (!json.download) throw '❌ No se pudo obtener el video.';

      await conn.sendFile(m.chat, json.download, 'video.mp4', `🎬 *Título:* ${json.title}\n📽️ *Calidad:* ${json.quality}p\n📥 *Video descargado con éxito.*`, m);
    }
  } catch (e) {
    console.error(e);
    m.reply('⚠️ Error al procesar la descarga. Intenta más tarde.');
  }
};

handler.help = ['ytmp33 <url>', 'ytmp44 <url>'];
handler.tags = ['downloader'];
handler.command = /^ytmp33|ytmp44$/i;

export default handler;*/


let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
  // Validación: Solo dueños principales o subbots pueden usar
  if (!isOwner && !m.user && !global.opts['jadibot']) {
    return conn.reply(m.chat, '❌ Este comando solo funciona para el dueño del bot o subbots.\n\n💡 Si quieres usarlo, conéctate como subbot.', m);
  }

  // Verifica si el mensaje contiene una imagen
  let media = m.quoted ? m.quoted : m;
  let mime = (media.msg || media).mimetype || '';
  if (!/image\/(jpe?g|png)/.test(mime)) {
    return conn.reply(m.chat, `📸 Envía o responde una imagen con el comando:\n\n*${usedPrefix + command}*`, m);
  }

  // Descarga imagen y actualiza foto de perfil
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
handler.tags = ['setppbot'];;
handler.command = [];

handler.owner = true;
handler.rowner = true;
handler.private = true;

export default handler;