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


import gplay from "google-play-scraper";
let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${xsearch} Ingresa el nombre de la APP que deseas buscar en la PlayStore*`, m);
  }
  let res = await gplay.search({ term: text });
  if (!res.length) {
    return conn.reply(m.chat, "```⚠️ No se encontraron resultados, intente con otra busqueda```", m); 
  }
  let opt = {
    contextInfo: {
      externalAdReply: {
        title: res[0].title,
        body: res[0].summary,
        thumbnail: (await conn.getFile(res[0].icon)).data,
        sourceUrl: res[0].url,
      },
    },
  };
  res = res.map(
    (v) =>
      `*🤍 \`Resultado:\`* ${v.title}
       *☕ \`Desarrollador:\`* ${v.developer}
       *💸 \`Precio:\`* ${v.priceText || "Gratis"}
       *📈 \`Puntuación:\`* ${v.scoreText || "Sin Puntuación"}
       *⛓️ \`Link:\`* ${v.url}`
  ).join("\n\n");
  conn.reply(m.chat, res, m, opt); 
};
handler.help = ['playstoresearch *<texto>*']; 
handler.tags = ['buscador'];
handler.command = /^(playstoresearch|pssearch)$/i; 
export default handler;
