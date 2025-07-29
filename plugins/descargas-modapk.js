import { search, download } from 'aptoide-scraper';

var handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `❗ Por favor, ingrese el nombre de la apk para descargarla.`, m, rcanal);

  try {
    await m.react(rwait);
    conn.reply(m.chat, `\`🍰 Descargando su aplicación...\``, m, rcanal);

    let searchA = await search(text);
    let data5 = await download(searchA[0].id);

    let txt = `╔═━「 *🌟 APTOIDE INFO* 」━═╗\n`;
    txt += `║\n`;
    txt += `║ 📌 *Nombre:* ${data5.name}\n`;
    txt += `║ 🧩 *Paquete:* ${data5.package}\n`;
    txt += `║ 🕒 *Actualización:* ${data5.lastup}\n`;
    txt += `║ 📁 *Peso:* ${data5.size}\n`;
    txt += `║\n`;
    txt += `╚═━「 🧿 𝘽𝙔 𝙎𝙐𝙆𝙐𝙉𝘼 𝘽𝙊𝙏 」━═╝`;

    await conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, m);
    await m.react(done);

    let pesoMB = parseFloat(data5.size.replace(' MB', '').replace(',', '.'));
    if (data5.size.includes('GB') || pesoMB > 999) {
      return await conn.reply(m.chat, `⚠️ El archivo es demasiado pesado.`, m);
    }

    await conn.sendMessage(m.chat, {
      document: { url: data5.dllink },
      fileName: `${data5.name}.apk`,
      mimetype: 'application/vnd.android.package-archive',
      caption: club,
      thumbnail: data5.icon,
      contextInfo: {
        externalAdReply: {
          title: data5.name,
          body: `Powered by Dev.Shadow 👻`,
          mediaUrl: null,
          sourceUrl: null,
          thumbnailUrl: data5.icon,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${msm} Ocurrió un fallo`, m);
  }
};

handler.tags = ['descargas'];
handler.help = ['apkmod'];
handler.command = ['apk', 'modapk', 'aptoide'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;