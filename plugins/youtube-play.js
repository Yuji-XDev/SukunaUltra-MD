import yts from 'yt-search';

const traducirAgo = (texto) => {
  return texto
    .replace(/second[s]? ago/i, 'hace unos segundos')
    .replace(/minute[s]? ago/i, 'hace minutos')
    .replace(/hour[s]? ago/i, 'hace horas')
    .replace(/day[s]? ago/i, 'hace días')
    .replace(/week[s]? ago/i, 'hace semanas')
    .replace(/month[s]? ago/i, 'hace meses')
    .replace(/year[s]? ago/i, 'hace años')
    .replace(/\b1 (segundo|minuto|hora|día|semana|mes|año)s?\b/g, 'hace 1 $1')
    .replace(/\b(\d+)\b/, 'hace $1');
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*༄❖ Invoca un título para buscar en el reino de YouTube...*`, m, fake);
  }

  try {
    const search = await yts(text);
    const videoInfo = search.all?.[0];

    if (!videoInfo) {
      return conn.reply(m.chat, '⚠️ No se encontró ningún video. Intenta con otro título.', m);
    }

    const title = videoInfo.title || 'Título desconocido';
    const duration = videoInfo.timestamp || 'Duración desconocida';
    const views = typeof videoInfo.views === 'number' ? videoInfo.views.toLocaleString() : 'No disponible';
    const canal = videoInfo.author?.name || 'Autor desconocido';
    const agoEn = videoInfo.ago || 'Desconocido';
    const ago = traducirAgo(agoEn);
    const url = videoInfo.url || '';
    const thumbnail = videoInfo.thumbnail || null;

    const body = ` *"${title}"*
    
> ⏱️ *Duración:* ${duration}
> 📊 *Vistas:* ${views}
> 🎤 *Canal:* ${canal}
> 📅 *Publicado:* ${ago}
> 🔗 *Enlace:* ${url}
> 💽 *Formato:* MP3 / MP4 disponible`;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: thumbnail },
        caption: body,
        footer: `📥 *¿Quieres descargarlo?* Solo elige una opción abajo`,
        buttons: [
          { buttonId: `${usedPrefix}ytmp3 ${url}`, buttonText: { displayText: '🎧 ᴅᴇsᴄᴀʀɢᴀʀ ᴀᴜᴅɪᴏ' }, type: 1 },
          { buttonId: `${usedPrefix}ytmp4 ${url}`, buttonText: { displayText: '📽️ ᴅᴇsᴄᴀʀɢᴀʀ ᴠɪᴅᴇᴏ' }, type: 1 },
          { buttonId: `${usedPrefix}menu`, buttonText: { displayText: 'ᴠᴏʟᴠᴇʀ ᴍᴇɴᴜ ᴅʟ' }, type: 1 },
        ],
        viewOnce: true,
        headerType: 4,
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `❗ Ocurrió un error: ${error.message}`, m);
  }
};

handler.command = ['play'];
handler.tags = ['descargas'];
handler.limit = 6;

export default handler;