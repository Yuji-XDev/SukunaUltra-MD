import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🖍️ Por favor, ingrese un término de búsqueda.\n\nEjemplo:\n> *${usedPrefix + command}* Minecraft`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://api.rynn-archive.biz.id/search/android1?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.result || json.result.length === 0) {
      await m.react('✖️');
      return await conn.reply(m.chat, '❌ No se encontraron resultados para esta búsqueda.', m);
    }

    const firstApp = json.result[0];
    let txt = `*乂  S E A R C H  -  A N D R O I D 1*\n\n`;
    
    json.result.forEach((app, index) => {
      txt += `🍬 *${index + 1}.* ${app.name}\n`;
      txt += `👨‍💻 *Desarrollador:* ${app.developer}\n`;
      txt += `⭐ *Calificación:* ${app.rating}\n`;
      txt += `🔗 *Enlace:* ${app.link}\n\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: firstApp.imageUrl }, caption: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, '⚠️ Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['android1search <término>'];
handler.tags = ['search'];
handler.command = ['android1search'];
handler.register = true;

export default handler;
