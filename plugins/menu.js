import axios from 'axios';
import moment from 'moment-timezone';

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

  const loadingImage = 'https://files.catbox.moe/jiczl6.png';

  const imgRandomArr = [
    "https://iili.io/FKVDVAN.jpg",
    "https://iili.io/FKVbUrJ.jpg"
  ];
  const imgRandom = imgRandomArr[Math.floor(Math.random() * imgRandomArr.length)];

  const textArr = [
    "*✦ 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀 𝐁𝐘 𝐒𝐡𝐚𝐝𝐨𝐰'𝐂𝐨𝐫𝐞 ✦*",
    "⚜️ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐜𝐨𝐥𝐞𝐜𝐭𝐢𝐯𝐨 𝐞𝐧 𝐜𝐮𝐫𝐬𝐨...",
    "🔮 𝐄𝐭𝐢𝐪𝐮𝐞𝐭𝐚𝐧𝐝𝐨 𝐚 𝐥𝐚𝐬 𝐚𝐥𝐦𝐚𝐬 𝐩𝐞𝐫𝐝𝐢𝐝𝐚𝐬"
  ];
  const text = textArr[Math.floor(Math.random() * textArr.length)];

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
    contextInfo: {
      externalAdReply: {
        title: 'Dev.Shadow 🇦🇱',
        body: '🌾◌*̥₊ 𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 𝑀𝐷 ◌❐🎋༉',
        thumbnailUrl: loadingImage,
        sourceUrl: 'https://github.com/Yuji-XDev',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  await new Promise(resolve => setTimeout(resolve, 2000));

  let sukunaurl = 'https://files.catbox.moe/i85pfi.mp4';

  let hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
  let fechaObj = new Date();
  let fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' });
  let dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' });

  let menuText = `
🎄 ${ucapan()} @${userId.split('@')[0]}

╔════ ❖ •❁• ✦ •❁• ❖ ════╗
║      🌸 𝐒𝐔𝐊𝐔𝐍𝐀 - 𝐁𝐎𝐓 🌸
╚════ ❖ •❁• ✦ •❁• ❖ ════╝
┃ 👤 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${name}
┃ 🧬 𝗡𝗶𝘃𝗲𝗹: ${level}
┃ ⚡ 𝗘𝑋𝑃: ${exp}
┃ 🎖️ 𝗥𝗮𝗻𝗴𝗼: ${role}
┃ 📈 𝗣𝗿𝗼𝗴𝗿𝗲𝘀𝗼: [██████████]
╿
┃ ⚙️ 𝗠𝗼𝗱𝗼: 🔒 Privado
┃ 👑 𝗖𝗿𝗲𝗮𝗱𝗼𝗿: +51969214380
┃ 🤖 𝗕𝗼𝘁: ${(conn.user.jid == global.conn.user.jid ? '🌟 `BOT OFICIAL`' : '✨ `SUB BOT`')}
┃ 📚 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀: ${totalCommands}
┃ 🧑‍🤝‍🧑 𝗨𝘀𝘂𝗮𝗿𝗶𝗼𝘀: ${totalreg}
┃ ⏱️ 𝗧𝗶𝗲𝗺𝗽𝗼 𝗮𝗰𝘁𝗶𝘃𝗼: *${uptime}*
╰━━━━━━━━━━━━━━━━━━━━━━⬣
╭━━━━━━━━━━━━━━━━━━━━━━⬣
┃    🌳  𝗙𝗘𝗖𝗛𝗔 & 𝗛𝗢𝗥𝗔 🕒
┃ 🌾 *Hora Peru:* ${hora}
┃ 🍭 *Fecha:* ${fecha}
┃ 🎲 *Dia:* ${dia}
╰━━━━━━━━━━━━━━━━━━━━━━⬣
`.trim();

  await m.react('🌴');

  await conn.sendMessage(
    m.chat,
    {
      image: { url: sukunaurl },
      caption: menuText,
      contextInfo: {
        externalAdReply: {
          title: '🌾 Sukuna Ultra MD',
          body: '☯︎ Dev by Shadow\'Core',
          mediaType: 1,
          thumbnailUrl: 'https://files.catbox.moe/4kpxfk.png',
          mediaUrl: 'https://github.com/Yuji-XDev/SukunaUltra-MD',
          sourceUrl: 'https://github.com/Yuji-XDev/SukunaUltra-MD',
          renderLargerThumbnail: true
        }
      }
    },
    { quoted: m }
  );
};

handler.help = ['menu3'];
handler.tags = ['main'];
handler.command = ['menu3', 'menú', 'help', 'allmenú', 'allmenu', 'menucompleto'];
export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor((ms % 3600000) / 60000);
  let s = Math.floor((ms % 60000) / 1000);
  return `${h}H ${m}M ${s}S`;
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH');
  if (time >= 5 && time < 12) return "Buenos Días☀️";
  if (time >= 12 && time < 18) return "Buenas Tardes🌤️";
  return "Buenas Noches🌙";
}