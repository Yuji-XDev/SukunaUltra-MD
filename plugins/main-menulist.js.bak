import sharp from 'sharp';
import fs from 'fs';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('📦');

  try {
    // Datos base
    const nombreBot = 'SUKUNA BOT MD';
    const fecha = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const versionBot = 'v9.3.0';
    const totalComandos = 840;

    // Imagen original JPG
    const imageBuffer = fs.readFileSync('./media/menufull.jpg');

    // Convertir a .webp con sharp
    const webpBuffer = await sharp(imageBuffer)
      .webp({ quality: 80 })
      .toBuffer();

    // Guardar temporalmente como .webp para adjuntar
    const path = './src/catalogo.jpg';
    fs.writeFileSync(path, webpBuffer);

    // Enviar mensaje como documento con botones
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(path),
      fileName: `📦 MENÚ ${nombreBot} - ${totalComandos} comandos`,
      mimetype: 'application/pdf', // puedes poner image/webp si prefieres enviarlo como imagen
      caption: `╭━━〔 ${nombreBot} 🌸 〕━━⬣
┃ 🌟 *Fecha:* ${fecha}
┃ 🕓 *Hora:* ${hora}
┃ 🧠 *Versión:* ${versionBot}
┃ 🧰 *Comandos:* ${totalComandos}
╰━━━━━━━━━━━━━━━━⬣`,
      footer: '✨ Usa los botones para explorar el menú completo',
      buttons: [
        { buttonId: `${usedPrefix}infobot`, buttonText: { displayText: '🔍 INFO BOT' }, type: 1 },
        { buttonId: `${usedPrefix}donar`, buttonText: { displayText: '💖 DONAR' }, type: 1 },
        {
          buttonText: { displayText: '📚 CATEGORÍAS' },
          type: 4,
          sections: [
            {
              title: "🧩 Menús disponibles",
              rows: [
                { title: "🎮 Juegos", rowId: `${usedPrefix}juegos` },
                { title: "🎵 Música", rowId: `${usedPrefix}musica` },
                { title: "🛠️ Herramientas", rowId: `${usedPrefix}herramientas` },
                { title: "📂 Todo el Menú", rowId: `${usedPrefix}menucompleto` }
              ]
            }
          ]
        }
      ],
      contextInfo: {
        externalAdReply: {
          title: '👑 Sukuna Bot MD',
          body: `✨ ${totalComandos} comandos disponibles`,
          thumbnail: webpBuffer,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: 'https://github.com'
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al generar el menú', m);
  }
};

handler.command = ['menu', 'menú', 'help'];
export default handler;

/*import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('📦');

  try {
    const uptime = clockString(process.uptime() * 1000);
    const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fechaObj = new Date();
    const fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    const totalCommands = Object.values(global.plugins).filter(p => p.help && p.tags).length;
    const user = global.db.data.users[m.sender];

    const texto = `❀•° ʜᴏʟᴀ ʙɪᴇɴᴠᴇɴɪᴅ/ᴀ ᴀʟ ᴍᴇɴᴜ ʟɪsᴛ, sᴏʏ ${global.namebot} °•❀
    ˚̩̩̥͙°̩̥〔 ${global.etiqueta} 〕°̩̥˚̩̩̥͙°̩̥ ·͙*̩̩͙
┏━━━━━━⬣
┃ ⌬ 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗕𝗢𝗧 📟
┃ 🧠 \`ᴄʀᴇᴀᴅᴏʀ:\` *[ Dev.Shadow ]*
┃ 🔗 \`ᴄᴏɴᴛᴀᴄᴛᴏ:\` *[ wa.link/z1w9sq ]*
┃ 📁 \`ᴠᴇʀsɪᴏɴ:\` *[ 2.2.5 ]*
┃ 👥 \`ᴜsᴜᴀʀɪᴏs:\` *[ ${totalUsers} ]*
┃ 📦 \`ᴄᴏᴍᴀɴᴅᴏs:\` *[ ${totalCommands} ]*
┃ ⚙️ \`ᴍᴏᴅᴏ:\` *[ Privado ]*
┃ 📚 \`ʟɪʙʀᴇʀɪᴀ:\` *[ Baileys-MD ]*
┃ 🕰️ \`ᴀᴄᴛɪᴠᴏ:\` *[ ${uptime} ]*
┗━━━━━━⬣

┏━━━━━━⬣
┃ ⌬ 𝗧𝗨 𝗣𝗘𝗥𝗙𝗜𝗟 👤
┃ 🧬 \`ɪᴅ:\` *[ ${conn.getName(m.sender)} ]*
┃ 💰 \`ᴍᴏɴᴇᴅᴀs:\` *[ ${user.coin || 0} ]*
┃ 📊 \`ɴɪᴠᴇʟ:\` *[ ${user.level || 0} ]*
┃ ⚡ \`ᴇxᴘ:\` *[ ${user.exp || 0} ]*
┃ 👑 \`ʀᴀɴɢᴏ:\` [ ${user.role || 'Sin Rango'} ]
┗━━━━━━⬣

┏━━━━━━⬣
┃ ⌬ 𝗙𝗘𝗖𝗛𝗔 & 𝗛𝗢𝗥𝗔 🕒
┃ 🗓️ \`ғᴇᴄʜᴀ:\` *[ ${fecha} ]*
┃ 📅 \`ᴅɪᴀ:\` *[ ${dia} ]*
┃ ⏰ \`ʜᴏʀᴀ:\` *[ ${hora} ]*
┗━━━━━━⬣

⌬━━━━━━━━━━━━━━━━━━━━⌬‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
．                                         ∩_∩●
 ‧                                      ○(‟×  ᪶×‟)
╭━━┈ ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🌾⃪⃘۪۫۫۫۫۬֯፝֟◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ๋︪︩━∪̶∪̶━╮
🍥⧫̇❀̶࣭۪ٜ݊݊⃛᛫👻︎ 𝙈𝙚𝙣𝙪𝙨-𝘿𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚𝙨 🌀👾᛫̶ִ۪۪ٜ⃛݊❀̇⧫ 
╰ׅ̩̥̩̥̩̥̩̥̩━ׅ┄─━┈ ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🌾⃪⃘۪۫۫۫۫۬֯፝֟◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ━๋︪︩━╯̩̥̩̥̩̥̩̥̩
╭̷ׄ┄̵̷ׅ۪۪۪ٜ─̶̸ׄ─̵̷ׅ─̵̷ׄ┈̶̸ׅ۪۪۪۪۪۪ٜ┈̵̷ׄ┈̵̸ׅ┈̶̸ׄ┈̵̷ׅ۪۪۪۪ٜ┈̵̷ׄ┈̶̸ׅ┈̵̷ׄ┈̵̷ׅ۪۪۪۪۪ٜ┈̶̸ׄ┈̵̷ׅ─̵̷ׄ─̶̸ׅ۪۪ٜ─̵̷ׄ┈̵̷ׅ╮
│•ꪶᳱꫂ \`#ᴍᴇɴᴜɢᴘ\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜʟᴏɢᴏs\`
│•ꪶᳱꫂ \`#ᴅᴇᴠ\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜ18\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜ2\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜsᴇᴀʀᴄʜ\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜᴅʟ\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜʀᴘɢ\`
│•ꪶᳱꫂ \`#ᴍᴇɴᴜsᴛɪᴄᴋᴇʀ\`
╰╌┈─━╌─━╌⃨╼⃛⬥⬥⃛╾⃨╌━─╌━─┈╌╯
`.trim();

    const image = 'https://files.catbox.moe/jyz3f8.jpg';
    const buffer = await (await fetch(image)).buffer();

    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '✐ ꒷📞ദ ᴄʀᴇᴀᴅᴏʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg ..18`, buttonText: { displayText: '✐ ꒷👤ദ ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 },
      { buttonId: `${usedPrefix}sistema`, buttonText: { displayText: '✐ ꒷🌾ദ ᴠᴇʀ sɪsᴛᴇᴍᴀ' }, type: 1 }
    ];

    const sections = [
      {
        title: "🥮 MENÚS DISPONIBLES 🐛",
        rows: [
          { title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]", description: "🎧 ᴠᴇʀ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀs", id: `${usedPrefix}menudl` },
          { title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", description: "🎮 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ʀᴘɢ", id: `${usedPrefix}menurpg` },
          { title: "🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ]", description: "🌾 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ sᴇᴀʀᴄʜ", id: `${usedPrefix}menuse` },
          { title: "🖍️ Mᴇɴᴜ [ 𝗢𝗪𝗡𝗘𝗥 ]", description: "🧙‍♂️ ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ᴏᴡɴᴇʀ", id: `${usedPrefix}dev` },
          { title: "🌈 Mᴇɴᴜ [ 𝗔𝗨𝗗𝗜𝗢𝗦 ]", description: "🎃 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ᴀᴜᴅɪᴏs", id: `${usedPrefix}menu2` },
          { title: "⛩️ Mᴇɴᴜ [ 𝗣𝗘𝗥𝗙𝗜𝗟 ]", description: "☂️ ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴘᴀʀᴀ ᴇᴅɪᴛᴀʀ ᴛᴜ ᴘᴇʀғɪʟ", id: `${usedPrefix}perfildates` },
          { title: "🌞 Mᴇɴᴜ [ 𝗚𝗥𝗨𝗣𝗢 ]", description: "💫 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴘᴀʀᴀ ᴀᴅᴍɪɴɪsᴛʀᴀʀ ᴛᴜ ɢʀᴜᴘᴏ", id: `${usedPrefix}menugp` },
          { title: "🔞 Mᴇɴᴜ [ 𝗡𝗦𝗙𝗪 ]", description: "💨 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ɴsғᴡ", id: `${usedPrefix}menu18` },
          { title: "💖 Mᴇɴᴜ [ 𝗟𝗢𝗚𝗢𝗧𝗜𝗣𝗢𝗦 ]", description: "🐥 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ʟᴏɢᴏᴛɪᴘᴏs", id: `${usedPrefix}menulogos` },
          { title: "🐛 Mᴇɴᴜ [ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 ]", description: "🐾 ᴠᴇʀ ᴍᴇɴᴜ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ sᴛɪᴄᴋᴇʀs", id: `${usedPrefix}menusticker` },
        ]
      }
    ];

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: texto,
      footer: '⌬ Sistema Operativo: *SUᴋᴜɴᴀ.ᴇxᴇ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '✐ ꒷ꕤ🎄ദ ʟɪsᴛ - ᴍᴇɴᴜ',
              sections
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, `❌ *Error al mostrar el menú.*\n${e.message}`, m);
  }
};

handler.help = ['menulist'];
handler.tags = ['menus'];
handler.command = ['menulist'];

export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}*/