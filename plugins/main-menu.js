import axios from 'axios';

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let userData = global.db.data.users[userId] || {};
  let exp = userData.exp || 0;
  let coin = userData.coin || 0;
  let level = userData.level || 0;
  let role = userData.role || 'Sin Rango';
  let name = await conn.getName(userId);

  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);
  let totalreg = Object.keys(global.db.data.users).length;
  let totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length;
  
  const imgRandom = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg"
  ].getRandom();

  const text = [
    "*✦ 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀 𝐁𝐘 𝐒𝐡𝐚𝐝𝐨𝐰'𝐂𝐨𝐫𝐞 ✦*",
    "⚜️ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐜𝐨𝐥𝐞𝐜𝐭𝐢𝐯𝐨 𝐞𝐧 𝐜𝐮𝐫𝐬𝐨...",
    "🔮 𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚𝐧𝐝𝐨 𝐚 𝐥𝐚𝐬 𝐚𝐥𝐦𝐚𝐬 𝐩𝐞𝐫𝐝𝐢𝐝𝐚𝐬"
  ].getRandom();

  const thumbnailBuffer = Buffer.from((await axios.get(imgRandom, { responseType: 'arraybuffer' })).data);

  const shadow = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: text,
        jpegThumbnail: thumbnailBuffer
      }
    },
    participant: "0@s.whatsapp.net"
  };
  
  await conn.sendMessage(m.chat, {
    text: '╭─〔 ⚙️ 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎... 〕─⬣\n┃ 🛰️ *Conectando a la base de datos...*\n┃ 📡 *Sincronizando menú principal...*\n╰───────────────⬣',
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: '               ☘️ Dev.Shadow 🇦🇱',
        body: '   🌀꙰⃟ 𖤐 𝙎𝙐𝙆𝙐𝙉𝘼 𝘽𝙊𝙏 ∞ 𝐌𝐃 𖤐🎨⃟',
        thumbnailUrl: 'https://files.catbox.moe/q8b2br',
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }, { quoted: m });

  await new Promise(resolve => setTimeout(resolve, 2000));
      
   let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
   let fechaObj = new Date();
   let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
   let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });
   
   
  let menuText = `
☁️ ${ucapan()} @${userId.split('@')[0]}

╔════ ❖ •❁• ✦ •❁• ❖ ════╗
║      🌸 𝐒𝐔𝐊𝐔𝐍𝐀 - 𝐁𝐎𝐓 🌸
╚════ ❖ •❁• ✦ •❁• ❖ ════╝
┃ ✦ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${name}
┃ ✦ 𝗡𝗶𝘃𝗲𝗹: ${level}
┃ ✦ 𝗘𝑿𝑷:  ${exp}
┃ ✦ 𝗥𝗮𝗻𝗴𝗼: ${role}
┃ ✦ 𝗣𝗿𝗼𝗴𝗿𝗲𝘀𝗼: [██████████]
┃
┃ 🌾 *Hora Peru:* ${hora}
┃ 🍭 *Fecha:* ${fecha}
┃ 🎲 *Dia:* ${dia}
╰━━━━━━━━━━⬣


╭══🧪༄ 𝘌𝘚𝘛𝘈𝘋𝘐𝘚𝘛𝘐𝘊𝘈𝘚 ༄📊══╮
┃ 
┃ ⚙️ 𝗠𝗼𝗱𝗼: 🔒 Privado
┃ 👑 𝗖𝗿𝗲𝗮𝗱𝗼𝗿: +${suittag}
┃ 🤖 𝗕𝗼𝘁: ${(conn.user.jid == global.conn.user.jid ? '🌟 `BOT OFICIAL`' : '✨ `SUB BOT`')}
┃ 📚 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀: ${totalCommands}
┃ 🧑‍🤝‍🧑 𝗨𝘀𝘂𝗮𝗿𝗶𝗼𝘀: ${totalreg}
┃ ⏱️ 𝗧𝗶𝗲𝗺𝗽𝗼 𝗮𝗰𝘁𝗶𝘃𝗼: *${uptime}*
┃
╰═══◉◉◉═════❖
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
  🧪 Lista de comandos **Sukuna MD**

͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖨𝗇ẜᨣ\`*  🌾 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #ᴀғᴋ [ᴀʟᴀsᴀɴ]
⤷ ✦ #ᴍᴇɴᴜ
⤷ ✦ #ᴜᴘᴛɪᴍᴇ
⤷ ✦ #sᴄʀɪᴘᴛ
⤷ ✦ #sᴛᴀғғ
⤷ ✦ #ᴄʀᴇᴀᴅᴏʀ
⤷ ✦ #ɢʀᴜᴘᴏs
⤷ ✦ #ᴇsᴛᴀᴅᴏ
⤷ ✦ #ɪɴғᴏʙᴏᴛ
⤷ ✦ #sᴜɢ
⤷ ✦ #ᴘɪɴɢ
⤷ ✦ #ʀᴇᴘᴏʀᴛᴀʀ *<ᴛᴇxᴛ>*
⤷ ✦ #ʀᴇɢʟᴀs
⤷ ✦ #sᴘᴇᴇᴅ
⤷ ✦ #sɪsᴛᴇᴍᴀ
⤷ ✦ #ᴜsᴜᴀʀɪᴏs
⤷ ✦ #ᴅs
⤷ ✦ #ғᴜɴᴄɪᴏɴᴇs
⤷ ✦ #ᴇᴅɪᴛᴀᴜᴛᴏʀᴇsᴘᴏɴᴅᴇʀ
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`ᴍᧉɴᴜs\`*  🎄  ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #ᴍᴇɴᴜʟɪsᴛ
⤷ ✦ #ᴅᴇᴠ - *ᴍᴇɴᴜ ᴏᴡɴᴇʀ*
⤷ ✦ #ᴍᴇɴᴜsᴛɪᴄᴋᴇʀ - *ᴍᴇɴᴜ sᴛɪᴄᴋᴇʀs*
⤷ ✦ #ᴍᴇɴᴜsᴇ - *ᴍᴇɴᴜ sᴇᴀʀᴄʜ*
⤷ ✦ #ᴍᴇɴᴜᴅʟ - *ᴍᴇɴᴜ ᴅᴇsᴄᴀʀɢᴀs*
⤷ ✦ #ᴍᴇɴᴜʟᴏɢᴏs - *ʟᴏɢᴏs*
⤷ ✦ #ᴍᴇɴᴜ18 - *ᴍᴇɴᴜ ʜᴏᴛ*
⤷ ✦ #ᴍᴇɴᴜɢᴘ - *ᴍᴇɴᴜ ɢʀᴜᴘᴏ*
⤷ ✦ #ᴍᴇɴᴜ2 - *ᴍᴇɴᴜ ᴀᴜᴅɪᴏs*
⤷ ✦ #ᴍᴇɴᴜʀᴘɢ - *ᴍᴇɴᴜ ᴇᴄᴏɴᴏᴍɪᴀ*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`sᧉᴀᴄʜ\`*  🏮 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #ᴀɴɪᴍᴇɪɴғᴏ
⤷ ✦ #ᴀɴɪᴍᴇsᴇᴀʀᴄʜ
⤷ ✦ #ᴄᴜᴇᴠᴀɴᴀ
⤷ ✦ #ɢɪᴛʜᴜʙsᴇᴀʀᴄʜ
⤷ ✦ #sᴇᴀʀᴄʜʜᴇɴᴛᴀɪ
⤷ ✦ #ɢᴏᴏɢʟᴇ *<ʙúsǫᴜᴇᴅᴀ>*
⤷ ✦ #ɪᴍᴀɢᴇɴ *<ǫᴜᴇʀʏ>*
⤷ ✦ #ɪɴғᴏᴀɴɪᴍᴇ
⤷ ✦ #ɢɪᴛʜᴜʙsᴛᴀʟᴋ *<ǫᴜᴇʀʏ>*
⤷ ✦ #sᴏᴜɴᴅᴄʟᴏᴜᴅsᴇᴀʀᴄʜ *<ᴛxᴛ>*
⤷ ✦ #ᴘɪɴᴛᴇʀᴇsᴛ
⤷ ✦ #ᴘᴏʀɴʜᴜʙsᴇᴀʀᴄʜ
⤷ ✦ #sᴘᴏᴛɪғʏsᴇᴀʀᴄʜ *<ᴛᴇxᴛᴏ>*
⤷ ✦ #ʏᴛsᴇᴀʀᴄʜ2 *<ᴛᴇxᴛ>*
⤷ ✦ #ɴᴘᴍᴊs
⤷ ✦ #ɢɴᴜʟᴀ
⤷ ✦ #ᴀᴘᴋsᴇᴀʀᴄʜ
⤷ ✦ #ᴡɪᴋɪs
⤷ ✦ #ᴛɪᴋᴛᴏᴋsᴇᴀʀᴄʜ *<ᴛxᴛ>*
⤷ ✦ #ᴛᴡᴇᴇᴛᴘᴏsᴛs
⤷ ✦ #xɴxxs
⤷ ✦ #xᴠsᴇᴀʀᴄʜ
⤷ ✦ #ʏᴛs
⤷ ✦ #ғᴅʀᴏɪᴅsᴇᴀʀᴄʜ *<ᴛéʀᴍɪɴᴏ>*
⤷ ✦ #ʜᴀᴘᴘʏᴍᴏᴅsᴇᴀʀᴄʜ *<ʙúsǫᴜᴇᴅᴀ>*
⤷ ✦ #ᴄɪɴᴇᴄᴀʟɪᴅᴀᴅsᴇᴀʀᴄʜ *<ʙúsǫᴜᴇᴅᴀ>*
⤷ ✦ #ʏᴀʜᴏᴏsᴇᴀʀᴄʜ *<ʙúsǫᴜᴇᴅᴀ>*
⤷ ✦ #ᴍᴏᴠɪᴇ *<ᴛéʀᴍɪɴᴏ>*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Subs\`*  🍰 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #qr
⤷ ✦ #code
⤷ ✦ #token
⤷ ✦ #sockets
⤷ ✦ #deletesesion
⤷ ✦ #pausarai
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖣ᨣ𝗐𝗇𝗅ᨣ𝖺𝖽\`* 🌳 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #fb2
⤷ ✦ #fdroid *<url>*
⤷ ✦ #fb
⤷ ✦ #sound
⤷ ✦ #gitclone *<url git>*
⤷ ✦ #gdrive
⤷ ✦ #ig
⤷ ✦ #mediafire *<url>*
⤷ ✦ #mega
⤷ ✦ #apk *<nombre>*
⤷ ✦ #pinvid *<link>*
⤷ ✦ #apk2 *<busqueda>*
⤷ ✦ #npmdl
⤷ ✦ #tt2
⤷ ✦ #kwaidl
⤷ ✦ #likee *<url>*
⤷ ✦ #aplay2 • applemusic2
⤷ ✦ #capcut *<url>*
⤷ ✦ #play
⤷ ✦ #play2
⤷ ✦ #ytmp3doc
⤷ ✦ #ytmp4doc
⤷ ✦ #iaimg *<texto>*
⤷ ✦ #yta
⤷ ✦ #ytv
⤷ ✦ #tiktokrandom
⤷ ✦ #spotify
⤷ ✦ #tiktokhd
⤷ ✦ #tiktoktrends
⤷ ✦ #snapchat *<link>*
⤷ ✦ #terabox
⤷ ✦ #tiktok *<url>*
⤷ ✦ #tiktokmp3 *<url>*
⤷ ✦ #tiktokimg *<url>*
⤷ ✦ #twitter *<url>*
⤷ ✦ #xvideosdl
⤷ ✦ #xnxxdl
⤷ ✦ #pindl
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖥𝗎𝗇\`*  🥯 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #gay *@tag* 
⤷ ✦ #lesbiana *@tag* 
⤷ ✦ #pajero *@tag* 
⤷ ✦ #pajera *@tag* 
⤷ ✦ #puto *@tag* 
⤷ ✦ #puta *@tag* 
⤷ ✦ #manco *@tag* 
⤷ ✦ #manca *@tag* 
⤷ ✦ #rata *@tag*
⤷ ✦ #prostituta *@tag*
⤷ ✦ #amigorandom
⤷ ✦ #jalamela
⤷ ✦ #simi
⤷ ✦ #chiste
⤷ ✦ #consejo
⤷ ✦ #doxear *<mension>*
⤷ ✦ #facto
⤷ ✦ #reto
⤷ ✦ #verdad
⤷ ✦ #prostituto *<@tag>*
⤷ ✦ #formarpareja
⤷ ✦ #formarpareja5
⤷ ✦ #huevo *@user*
⤷ ✦ #chupalo *<mencion>*
⤷ ✦ #aplauso *<mencion>*
⤷ ✦ #marron *<mencion>*
⤷ ✦ #suicidar
⤷ ✦ #iqtest <mencion>*
⤷ ✦ #meme
⤷ ✦ #morse
⤷ ✦ #nombreninja *<texto>*
⤷ ✦ #paja
⤷ ✦ #personalidad *<mencion>*
⤷ ✦ #pregunta 
⤷ ✦ #zodiac *2002 02 25*
⤷ ✦ #ship 
⤷ ✦ #sorte 
⤷ ✦ #top *[texto]*
⤷ ✦ #formartrio *<mencion>*
⤷ ✦ #tt
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖥𝗋𝖺𝗌ᧉ𝗌\`* 🖍️ ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #piropo
⤷ ✦ #frase
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖩𝗎ᧉ𝗀ᨣ𝗌\`*  🥥 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #ahorcado
⤷ ✦ #delxo
⤷ ✦ #genio *<pregunta>*
⤷ ✦ #math *<mode>*
⤷ ✦ #ppt *texto*
⤷ ✦ #pvp
⤷ ✦ #sopa
⤷ ✦ #acertijo
⤷ ✦ #ttt *texto*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖠𝗇ı𝗆ᧉ\`*  🍮 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #angry/enojado @tag
⤷ ✦ #bath/bañarse @tag
⤷ ✦ #bite/morder @tag
⤷ ✦ #bleh/lengua @tag
⤷ ✦ #blush/sonrojarse @tag
⤷ ✦ #bored/aburrido @tag
⤷ ✦ #nights/noches
⤷ ✦ #dias/days
⤷ ✦ #coffe/cafe @tag
⤷ ✦ #cry/llorar @tag
⤷ ✦ #cuddle/acurrucarse @tag
⤷ ✦ #dance/bailar @tag
⤷ ✦ #drunk/borracho @tag
⤷ ✦ #eat/comer @tag
⤷ ✦ #messi
⤷ ✦ #cr7
⤷ ✦ #facepalm/palmada @tag
⤷ ✦ #happy/feliz @tag
⤷ ✦ #hello/hola @tag
⤷ ✦ #hug/abrazar @tag
⤷ ✦ #kill/matar @tag
⤷ ✦ #kiss2/besar2 @tag
⤷ ✦ #kiss/besar @tag
⤷ ✦ #laugh/reirse @tag
⤷ ✦ #lick/lamer @tag
⤷ ✦ #love2/enamorada @tag
⤷ ✦ #patt/acariciar @tag
⤷ ✦ #poke/picar @tag
⤷ ✦ #pout/pucheros @tag
⤷ ✦ #ppcouple
⤷ ✦ #preg/embarazar @tag
⤷ ✦ #punch/golpear @tag
⤷ ✦ #run/correr @tag
⤷ ✦ #sad/triste @tag
⤷ ✦ #scared/asustada @tag
⤷ ✦ #seduce/seducir @tag
⤷ ✦ #shy/timida @tag
⤷ ✦ #slap/bofetada @tag
⤷ ✦ #sleep/dormir @tag
⤷ ✦ #smoke/fumar @tag
⤷ ✦ #think/pensando @tag
⤷ ✦ #undress/encuerar @tag
⤷ ✦ #waifu
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Pᧉrẜil\`*  🩸 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #reg
⤷ ✦ #unreg
⤷ ✦ #profile
⤷ ✦ #marry *[mension / etiquetar]*
⤷ ✦ #divorce
⤷ ✦ #setgenre *<text>*
⤷ ✦ #delgenre
⤷ ✦ #setbirth *<text>*
⤷ ✦ #delbirth
⤷ ✦ #setdesc *<text>*
⤷ ✦ #deldesc
╰┈┈┈▥
╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Logos\`*  🖼️ ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #glitchtext
⤷ ✦ #narutotext
⤷ ✦ #dragonball
⤷ ✦ #neonlight
⤷ ✦ #pubglogo
⤷ ✦ #harrypotter
⤷ ✦ #marvel
⤷ ✦ #pixelglitch
⤷ ✦ #amongustext
⤷ ✦ #writetext
⤷ ✦ #advancedglow
⤷ ✦ #typographytext
⤷ ✦ #neonglitch
⤷ ✦ #flagtext
⤷ ✦ #flag3dtext
⤷ ✦ #deletingtext
⤷ ✦ #blackpinkstyle
⤷ ✦ #glowingtext
⤷ ✦ #underwatertext
⤷ ✦ #logomaker
⤷ ✦ #cartoonstyle
⤷ ✦ #papercutstyle
⤷ ✦ #watercolortext
⤷ ✦ #effectclouds
⤷ ✦ #blackpinklogo
⤷ ✦ #gradienttext
⤷ ✦ #summerbeach
⤷ ✦ #luxurygold
⤷ ✦ #multicoloredneon
⤷ ✦ #sandsummer
⤷ ✦ #galaxywallpaper
⤷ ✦ #style
⤷ ✦ #makingneon
⤷ ✦ #royaltext
⤷ ✦ #freecreate
⤷ ✦ #galaxystyle
⤷ ✦ #rainytext
⤷ ✦ #graffititext
⤷ ✦ #colorfulltext
⤷ ✦ #equalizertext
⤷ ✦ #angeltxt
⤷ ✦ #starlight
⤷ ✦ #steel
⤷ ✦ #neoncity
⤷ ✦ #cloudsky
⤷ ✦ #matrix
⤷ ✦ #minion
⤷ ✦ #papercut3d
⤷ ✦ #firetext
⤷ ✦ #icecold
⤷ ✦ #rainbowtext
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Stalk\`*  🌀 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #tiktokstalk *<usuario>*
⤷ ✦ #kwaistalk *<usuario>*
⤷ ✦ #telegramstalk *<nombre_usuario>*
⤷ ✦ #youtubestalk *<nombre de usuario>*
⤷ ✦ #instagramstalk *<usuario>*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Prᧉmιυɱ\`*  🍄 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #comprarpremium
⤷ ✦ #premium
⤷ ✦ #vip
⤷ ✦ #spamwa <number>|<mesage>|<no of messages>
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Rpg\`*  🥧 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #aventura
⤷ ✦ #baltop
⤷ ✦ #bank / bal
⤷ ✦ #cazar 
⤷ ✦ #codigo *<cantida de coins>*
⤷ ✦ #canjear *<código>*
⤷ ✦ #cartera
⤷ ✦ #apostar *<cantidad>*
⤷ ✦ #cf
⤷ ✦ #cofre
⤷ ✦ #crimen
⤷ ✦ #daily
⤷ ✦ #depositar 
⤷ ✦ #explorar
⤷ ✦ #gremio
⤷ ✦ #regalo
⤷ ✦ #halloween
⤷ ✦ #heal
⤷ ✦ #inventario 
⤷ ✦ #mensual
⤷ ✦ #mazmorra
⤷ ✦ #minar
⤷ ✦ #navidad
⤷ ✦ #retirar
⤷ ✦ #robar
⤷ ✦ #robarxp
⤷ ✦ #ruleta *<cantidad> <color>*
⤷ ✦ #buyall
⤷ ✦ #buy
⤷ ✦ #protituirse
⤷ ✦ #work
⤷ ✦ #pay / transfer 
⤷ ✦ #semanal
⤷ ✦ #levelup
⤷ ✦ #lvl @user
⤷ ✦ #slot *<apuesta>*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Gᴀᴄʜᴀ\`*  ☕ ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #rw
⤷ ✦ #reclamar 
⤷ ✦ #harem
⤷ ✦ #waifuimage
⤷ ✦ #charinfo
⤷ ✦ #topwaifus *[pagina]*
⤷ ✦ #regalar *<nombre del personaje> @usuario*
⤷ ✦ #vote *<personaje>*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Sᴛɪᴄᴋᴇʀs\`*  👾 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #sticker *<img>*
⤷ ✦ #sticker *<url>*
⤷ ✦ #setmeta
⤷ ✦ #delmeta
⤷ ✦ #bratvid *<texto>*
⤷ ✦ #pfp *@user*
⤷ ✦ #qc
⤷ ✦ #toimg *(reply)*
⤷ ✦ #brat
⤷ ✦ #bratvid *<texto>*
⤷ ✦ #emojimix  *<emoji+emoji>*
⤷ ✦ #wm *<packname>|<author>*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖳ᨣᨣ𝗅𝗌\`*  🍚 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #letra *<texto>*
⤷ ✦ #fake
⤷ ✦ #hd
⤷ ✦ #detectar
⤷ ✦ #clima *<ciudad/país>*
⤷ ✦ #join
⤷ ✦ #nuevafotochannel
⤷ ✦ #nosilenciarcanal
⤷ ✦ #silenciarcanal
⤷ ✦ #noseguircanal
⤷ ✦ #seguircanal 
⤷ ✦ #avisoschannel 
⤷ ✦ #resiviravisos 
⤷ ✦ #inspect 
⤷ ✦ #inspeccionar 
⤷ ✦ #eliminarfotochannel 
⤷ ✦ #reactioneschannel 
⤷ ✦ #reaccioneschannel 
⤷ ✦ #nuevonombrecanal 
⤷ ✦ #nuevadescchannel
⤷ ✦ #setavatar
⤷ ✦ #setbanner
⤷ ✦ #seticono
⤷ ✦ #setmoneda
⤷ ✦ #setname nombre1/nombre2
⤷ ✦ #cal *<ecuacion>*
⤷ ✦ #horario
⤷ ✦ #read
⤷ ✦ #traducir <idoma>
⤷ ✦ #say
⤷ ✦ #whatmusic <audio/video>
⤷ ✦ #paisinfo
⤷ ✦ #ssweb
⤷ ✦ #tamaño *<cantidad>*
⤷ ✦ #document *<audio/video>*
⤷ ✦ #translate
⤷ ✦ #up
⤷ ✦ #enhance
⤷ ✦ #wikipedia
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖮𝗇-𝖮ẜẜ\`*  🧋 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #welcome
⤷ ✦ #bienvenida
⤷ ✦ #antiprivado
⤷ ✦ #antiprivate
⤷ ✦ #restrict
⤷ ✦ #restringir
⤷ ✦ #antibot
⤷ ✦ #antibots
⤷ ✦ #autoaceptar
⤷ ✦ #aceptarauto
⤷ ✦ #autorechazar
⤷ ✦ #rechazarauto
⤷ ✦ #autoresponder
⤷ ✦ #autorespond
⤷ ✦ #antisubbots
⤷ ✦ #antibot2
⤷ ✦ #modoadmin
⤷ ✦ #soloadmin
⤷ ✦ #reaction
⤷ ✦ #reaccion
⤷ ✦ #nsfw
⤷ ✦ #modohorny
⤷ ✦ #antispam
⤷ ✦ #jadibotmd
⤷ ✦ #modejadibot
⤷ ✦ #subbots
⤷ ✦ #detect
⤷ ✦ #avisos
⤷ ✦ #antilink
⤷ ✦ #audios
⤷ ✦ #antiver
⤷ ✦ #antiocultar
⤷ ✦ #antilink2
⤷ ✦ #antiarabe
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Grupos\`*  ⚙️ ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #admins
⤷ ✦ #agregar
⤷ ✦ #advertencia <@user>
⤷ ✦ #delwarn
⤷ ✦ #grupo abrir / cerrar
⤷ ✦ #group open / close
⤷ ✦ #delete
⤷ ✦ #demote <@user>
⤷ ✦ #promote <@user>
⤷ ✦ #encuesta <text|text2>
⤷ ✦ #kickfantasmas
⤷ ✦ #gpbanner
⤷ ✦ #gpdesc
⤷ ✦ #gpname
⤷ ✦ #hidetag
⤷ ✦ #infogrupo
⤷ ✦ #kickall
⤷ ✦ #kick <@user>
⤷ ✦ #kicknum
⤷ ✦ #listonline
⤷ ✦ #link
⤷ ✦ #listadv
⤷ ✦ #mute
⤷ ✦ #unmute
⤷ ✦ #config
⤷ ✦ #restablecer
⤷ ✦ #setbye
⤷ ✦ #setwelcome
⤷ ✦ #testwelcome
⤷ ✦ #setemoji <emoji>
⤷ ✦ #invocar *<mensaje opcional>*
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Nsfw\`*  🪼 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #sixnine/69 @tag
⤷ ✦ #anal/culiar @tag
⤷ ✦ #blowjob/mamada @tag
⤷ ✦ #boobjob/rusa @tag
⤷ ✦ #cum/leche @tag
⤷ ✦ #fap/paja @tag
⤷ ✦ #follar @tag
⤷ ✦ #fuck/coger @tag
⤷ ✦ #footjob/pies @tag
⤷ ✦ #fuck2/coger2 @tag
⤷ ✦ #grabboobs/agarrartetas @tag
⤷ ✦ #grop/manosear @tag
⤷ ✦ #penetrar @user
⤷ ✦ #lickpussy/coño @tag
⤷ ✦ #r34 <tag>
⤷ ✦ #sexo/sex @tag
⤷ ✦ #spank/nalgada @tag
⤷ ✦ #suckboobs/chupartetas @tag
⤷ ✦ #violar/perra @tag
⤷ ✦ #lesbianas/tijeras @tag
⤷ ✦ #pack
⤷ ✦ #tetas
⤷ ✦ #undress/encuerar
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`Owner\`*  🌷 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #addcoins *<@user>*
⤷ ✦ #addowner / delowner
⤷ ✦ #addprem [@user] <days>
⤷ ✦ #añadirxp
⤷ ✦ #copia
⤷ ✦ #autoadmin
⤷ ✦ #banuser *@tag <razón>*
⤷ ✦ #banlist
⤷ ✦ #bcgc
⤷ ✦ #block / unblock
⤷ ✦ #blocklist
⤷ ✦ #chetar *@user* / *<número>*
⤷ ✦ #cleartmp
⤷ ✦ #creargc
⤷ ✦ #deletefile
⤷ ✦ #delprem <@user>
⤷ ✦ #deschetar *@user* / *<número>*
⤷ ✦ #dsowner
⤷ ✦ =>
⤷ ✦ >
⤷ ✦ #fetch
⤷ ✦ #getplugin
⤷ ✦ #grouplist
⤷ ✦ #salir
⤷ ✦ #let
⤷ ✦ #prefix [prefix]
⤷ ✦ #quitarcoin *<@user>* / all
⤷ ✦ #quitarxp *<@user>*
⤷ ✦ #resetprefix
⤷ ✦ #restablecerdatos
⤷ ✦ #restart / reiniciar
⤷ ✦ #reunion
⤷ ✦ #savefile <ruta/nombre>
⤷ ✦ #saveplugin
⤷ ✦ #setcmd *<texto>*
⤷ ✦ #delcmd
⤷ ✦ #listcmd
⤷ ✦ #setimage
⤷ ✦ #setstatus <teks>
⤷ ✦ #spam2
⤷ ✦ #unbanuser <@tag>
⤷ ✦ #ip <alamat ip>
⤷ ✦ #update / fix
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖨𝗇ƚᧉ𝖨ı𝗀ᧉ𝗇𝖼ı𝖺𝗌\`*  💭 ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #dalle
⤷ ✦ #demo *<texto>*
⤷ ✦ #flux *<texto>*
⤷ ✦ #gemini
⤷ ✦ #ia
⤷ ✦ #llama
╰┈┈┈▥

╔══❖•ೋ🌿ೋ•❖══╗
  𖤐 𓆩 *\`𝖢ᨣ𝗇𝗏ᧉ𝗋ƚᧉ𝗋𝗌\`*  🌪️ ᩚ꤬ᰨᰍ 𓆪
╚══❖•ೋ🌿ೋ•❖══╝
⤷ ✦ #tourl <imagen>
⤷ ✦ #catbox
⤷ ✦ #tourl3
⤷ ✦ #togifaud
⤷ ✦ #tomp3
⤷ ✦ #tovideo
⤷ ✦ #tts <lang> <teks>
⤷ ✦ #tts2
╰┈┈┈▥


   🧿 *𝗖𝗥𝗘𝗔 𝗨𝗡 𝗦𝗨𝗕𝗕𝗢𝗧 𝗘𝗡 𝗦𝗘𝗚𝗨𝗡𝗗𝗢𝗦*
> 🛰️ ➊ *#qr* – Escanea un 𝖢𝗈𝖽𝗂𝗀𝗈 𝗤𝗥  
> 🔐 ➋ *#code* – Usa un 𝖢𝗈𝖽𝗂𝗀𝗈 de 8 dígitos
`.trim();

  await m.react('⚙️');
  await conn.sendMessage(
    m.chat,
    {
      image: { url: 'https://files.catbox.moe/gh3gbs.jpg' },
      caption: menuText,
      contextInfo: {
        externalAdReply: {
          title: '🌾 Sukuna Ultra MD',
          body: '☯︎ Dev by Shadow\'Core',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/8ng4fs.jpg',
          mediaUrl: 'https://github.com/Yuji-XDev/SukunaUltra-MD',
          sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
          renderLargerThumbnail: false
        }
      }
    },
    { quoted: shadow }
  );
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);

  let horas = h === 1 ? 'hora' : 'horas';
  let minutos = m === 1 ? 'minuto' : 'minutos';
  let segundos = s === 1 ? 'segundo' : 'segundos';

  return `${h} ${horas}, ${m} ${minutos}, ${s} ${segundos}`;
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  let res = "Buenas Noches🌙";
  if (time >= 5 && time < 12) res = "Buenos Días☀️";
  else if (time >= 12 && time < 18) res = "Buenas Tardes🌤️";
  else if (time >= 18) res = "Buenas Noches🌙";
  return res;
}