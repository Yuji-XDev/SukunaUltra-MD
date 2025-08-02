import sharp from 'sharp';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix }) => {
  await m.react('🌳');
  try {
    const uptime = clockString(process.uptime() * 1000);
    const now = new Date();
    const hora = now.toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    const fecha = now.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
    const dia = now.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

    const totalUsers = Object.keys(global.db.data.users).length;
    const totalCommands = Object.values(global.plugins).filter(p => p.help && p.tags).length;
    const user = global.db.data.users[m.sender] || {};

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
┃ 📚 \`ʟɪʙʀᴇʀɪᴀ:\` *[ Baileys‑MD ]*
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
┗━━━━━━⬣`;

   /* const imgUrl = 'https://files.catbox.moe/97lre0.jpg';
    const imagenBuffer = await (await fetch(imgUrl)).buffer();
    const thumb2 = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    const docBuffer = await sharp(imagenBuffer).webp({ quality: 90 }).toBuffer();*/
    
    
    

     const imgUrlDoc = 'https://files.catbox.moe/97lre0.jpg';
     const bufferDoc = await (await fetch(imgUrlDoc)).buffer();
     const docBuffer = await sharp(bufferDoc).webp({ quality: 90 }).toBuffer();


    const imgUrlThumb = 'https://files.catbox.moe/jyz3f8.jpg';
    const bufferThumb = await (await fetch(imgUrlThumb)).buffer();
    const thumb = await sharp(bufferThumb).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    
    

    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '✐ ꒷📞ദ ᴄʀᴇᴀᴅᴏʀ' }, type: 1 },
      { buttonId: `${usedPrefix}reg ..18`, buttonText: { displayText: '✐ ꒷👤ദ ᴀᴜᴛᴏ ᴠᴇʀɪғɪᴄᴀʀ' }, type: 1 },
      { buttonId: `${usedPrefix}sistema`, buttonText: { displayText: '✐ ꒷🌾ദ ᴠᴇʀ sɪsᴛᴇᴍᴀ' }, type: 1 }
    ];

    const sections = [{
      title: "🥮 MENÚS DISPONIBLES 🐛",
      rows: [
        { title: "📥 Mᴇɴᴜ [ 𝗗𝗟 ]", description: "🎧 ᴠᴇʀ ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ᴅᴇsᴄᴀʀɢᴀs", id: `${usedPrefix}menudl` },
        { title: "⛏️ Mᴇɴᴜ [ 𝗥𝗣𝗚 ]", description: "🎮 ᴠᴇʀ ᴍᴇɴᴜ ʀᴘɢ", id: `${usedPrefix}menurpg` },
        { title: "🔍 Mᴇɴᴜ [ 𝗦𝗘𝗔𝗥𝗖𝗛 ]", description: "🌾 ʙᴜsᴄᴀʀ ᴄᴏɴᴛᴇɴɪᴅᴏ", id: `${usedPrefix}menuse` },
        { title: "🖍️ Mᴇɴᴜ [ 𝗢𝗪𝗡𝗘𝗥 ]", description: "🧙‍♂️ ᴘᴀʀᴀ ᴏᴡɴᴇʀ", id: `${usedPrefix}dev` },
        { title: "🌈 Mᴇɴᴜ [ 𝗔𝗨𝗗𝗜𝗢𝗦 ]", description: "🎃 sᴏɴɪᴅᴏs ᴅɪᴠᴇʀᴛɪᴅᴏs", id: `${usedPrefix}menu2` },
        { title: "⛩️ Mᴇɴᴜ [ 𝗣𝗘𝗥𝗙𝗜𝗟 ]", description: "☂️ ᴄᴜᴇɴᴛᴀs ʏ ᴇsᴛᴀᴅᴏs", id: `${usedPrefix}perfildates` },
        { title: "🌞 Mᴇɴᴜ [ 𝗚𝗥𝗨𝗣𝗢 ]", description: "💫 ᴀᴅᴍɪɴ ʏ ᴄᴏɴᴛʀᴏʟ", id: `${usedPrefix}menugp` },
        { title: "🔞 Mᴇɴᴜ [ 𝗡𝗦𝗙𝗪 ]", description: "💨 ᴄᴏɴᴛᴇɴɪᴅᴏ ᴘʀɪᴠᴀᴅᴏ", id: `${usedPrefix}menu18` },
        { title: "💖 Mᴇɴᴜ [ 𝗟𝗢𝗚𝗢𝗧𝗜𝗣𝗢𝗦 ]", description: "🐥 ᴄʀᴇᴀ ᴛᴜ ʟᴏɢᴏ", id: `${usedPrefix}menulogos` },
        { title: "🐛 Mᴇɴᴜ [ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 ]", description: "🐾 ᴘᴇɢᴀᴛɪɴᴀs ᴅɪᴠᴇʀᴛɪᴅᴀs", id: `${usedPrefix}menusticker` }
      ]
    }];

    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `📦 MENÚ - SukunaBot.png`,
      mimetype: 'image/webp',
      caption: texto,
      jpegThumbnail: thumb,
      footer: '⌬ Sistema Operativo: *SUᴋᴜɴᴀ.ᴇxᴇ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '✐ ꒷ꕤ🎄ದ ʟɪsᴛ ‑ ᴍᴇɴᴜ',
              sections
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: '',
          body: `あ ${global.namebot}`,
          thumbnail: thumb,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.reply(m.chat, `❌ *Error al mostrar el menú.*\n${e.message}`, m);
  }
};

handler.command = ['menulist'];
handler.help = ['menulist'];
handler.tags = ['menus'];
export default handler;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}




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