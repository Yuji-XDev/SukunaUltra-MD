/*import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `🔍 *Uso correcto:* ${usedPrefix}${command} <nombre de app>\n\nEjemplo: ${usedPrefix}${command} WhatsApp`, m);
  }

  const query = args.join(' ');
  const apiUrl = `https://api.vreden.my.id/api/playstore?query=${encodeURIComponent(query)}`;

  try {
    await m.react('🔎');

    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.result || json.result.length === 0) {
      return conn.reply(m.chat, `❌ No se encontraron resultados para: *${query}*`, m);
    }

    const apps = json.result.slice(0, 5);

    for (const app of apps) {
      const caption = `📲 *${app.title}*\n\n` +
                      `👤 *Desarrollador:* ${app.developer || 'Desconocido'}\n` +
                      `⭐ *Puntuación:* ${app.score || 'No disponible'}\n` +
                      `💰 *Precio:* ${app.price || 'Gratis'}\n` +
                      `🔗 *Enlace:* ${app.link || 'No disponible'}`;

      await conn.sendFile(m.chat, app.icon || icono, 'app.jpg', caption, m);
    }

    await m.react('✅');

  } catch (err) {
    console.error(err);
    await m.react('⚠️');
    conn.reply(m.chat, `❌ Error al buscar la app:\n*${err.message}*`, m);
  }
};

handler.command = ['playstore'];
handler.help = ['playstore <nombre>'];
handler.tags = ['buscador'];

export default handler;*/

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `✦ 𝗨𝘀𝗼 𝗰𝗼𝗿𝗿𝗲𝗰𝘁𝗼:\n*${usedPrefix + command} CapCut*\n\nIngresa el nombre de una aplicación para buscarla en la Play Store.`, m);
  }

  try {
    const res = await fetch(`https://api.dhamzxploit.my.id/api/playstore?q=${encodeURIComponent(text)}`);
    const json = await res.json();
    
    if (!json || !json.length) {
      return conn.reply(m.chat, '⚠️ No se encontraron resultados.', m);
    }

    const app = json[0]; // Tomamos el primer resultado
    let info = `╭─〔 *📱 Resultado de Play Store* 〕─⬣
│🔍 *Nombre:* ${app.name}
│👨‍💻 *Desarrollador:* ${app.developer}
│📦 *Tamaño:* ${app.size}
│⭐ *Puntuación:* ${app.scoreText || 'Sin puntuación'}
│💵 *Precio:* ${app.price || 'Gratis'}
│📎 *Link:* ${app.link}
╰────⬣`;

    await conn.sendMessage(m.chat, {
      image: { url: app.icon },
      caption: info,
      contextInfo: {
        externalAdReply: {
          title: app.name,
          body: app.developer,
          thumbnailUrl: app.icon,
          sourceUrl: app.link,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al buscar en Play Store. Intenta nuevamente más tarde.', m);
  }
};

handler.help = ['playstoresearch *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^(playstoresearch|pssearch)$/i;

export default handler;