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

    const texto = `╭──⌁˚ ₊˚୨୧˚₊˚⌁──╮
│     🌟 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗕𝗢𝗧 🌟
╰──⌁˚ ₊˚୨୧˚₊˚⌁──╯
🎀 𝗖ʀᴇᴀᴅᴏʀ: *Dev.Shadow*
🧸 𝗖ᴏɴᴛᴀᴄᴛᴏ: *wa.link/z1w9sq*
💾 𝗩ᴇʀꜱɪᴏɴ: *2.2.5*
👥 𝗨ꜱᴜᴀʀɪᴏꜱ: *${totalUsers}*
🧰 𝗖ᴏᴍᴀɴᴅᴏꜱ: *${totalCommands}*
🔐 𝗠ᴏᴅᴏ: *Privado*
📚 𝗟ɪʙʀᴇʀɪᴀ: *Baileys‑MD*
⏱️ 𝗔ᴄᴛɪᴠᴏ: *${uptime}*


╭──⌁˚ ₊˚୨୧˚₊˚⌁──╮
│      💖 𝗧𝗨 𝗣𝗘𝗥𝗙𝗜𝗟 💖
╰──⌁˚ ₊˚୨୧˚₊˚⌁──╯
🆔 𝗜ᴅ: *${conn.getName(m.sender)}*
💸 𝗠ᴏɴᴇᴅᴀꜱ:  *${user.coin || 0}*
📊 𝗡ɪᴠᴇʟ:  *${user.level || 0}*
⚡ 𝗘xᴘ: *${user.exp || 0}*
👑 𝗥ᴀɴɢᴏ: *${user.role || 'Sin Rango'}*


╭──⌁˚ ₊˚୨୧˚₊˚⌁──╮
│     📅 𝗙𝗘𝗖𝗛𝗔 & 𝗛𝗢𝗥𝗔 🕒
╰──⌁˚ ₊˚୨୧˚₊˚⌁──╯
📆 𝗙ᴇᴄʜᴀ: *${fecha}*
📅 𝗗ɪᴀ:    *${dia}*
⏰ 𝗛ᴏʀᴀ:  *${hora}*`;
    
    const imgUrl = 'https://files.catbox.moe/4dple4.jpg';
    const imagenBuffer = await (await fetch(imgUrl)).buffer();    
    const thumb2 = await sharp(imagenBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    
    
    const imgenUrl = 'https://files.catbox.moe/9l7hcn.jpg';
    const imgBuffer = await (await fetch(imgenUrl)).buffer();
     
    const thumb = await sharp(imgBuffer).resize(400, 400).jpeg({ quality: 70 }).toBuffer();
    const docBuffer = await sharp(imagenBuffer).webp({ quality: 90 }).toBuffer();
    
    

    const buttons = [
      { buttonId: `${usedPrefix}creador`, buttonText: { displayText: '📞 Creador' }, type: 1 },
      { buttonId: `${usedPrefix}reg dv.Shadow.18`, buttonText: { displayText: '👤 Auto Verificar' }, type: 1 },
      { buttonId: `${usedPrefix}sistema`, buttonText: { displayText: '🌾 Ver Sistema del Bot' }, type: 1 }
    ];

     const sections = [{
          buttonId: 'action',
          buttonText: { displayText: '🌐 Comandos do Bot' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: "🌐 Lista completa",
              sections: [
                {
                  title: "🌟 Comandos Principais",
                  highlight_label: "By Fenrys V4",
                  rows: [
                    { title: "📜 Menu Principal", description: "Comandos básicos e mais utilizados.", id: `${prefix}menupp` },
                    { title: "🆕 Novos Comandos", description: "Veja o que há de novo no bot.", id: `${prefix}menunovo` },
                    { title: "👑 Menu do Dono", description: "Acesso exclusivo do criador.", id: `${prefix}menudono` },
                    { title: "🛡 Administração", description: "Ferramentas para gerenciar grupos.", id: `${prefix}menuadm` },
                    { title: "💠 Premium", description: "Funções especiais para usuários VIP.", id: `${prefix}menupremium` },
                    { title: "🎉 Brincadeiras", description: "Comandos para diversão no grupo.", id: `${prefix}brincadeiras` },
                    { title: "🖼 Efeitos Visuais", description: "Aplique efeitos com estilo.", id: `${prefix}Efeitosimg` },
                    { title: "🪙 Sistema de Coins", description: "Ganhe e use moedas virtuais.", id: `${prefix}menucoins` },
                    { title: "⚔️ Mundo RPG", description: "Aventuras, batalhas e evolução.", id: `${prefix}menurpg` },
                    { title: "🎨 Criação de Logos", description: "Gere logos personalizados.", id: `${prefix}menulogos` }
      ]
    }];

    await conn.sendMessage(m.chat, {
      document: docBuffer,
      fileName: `SUKUNA ULTRA 💚`,
      mimetype: 'image/PNG',
      caption: texto,
      jpegThumbnail: thumb2,
      footer: '[⚙] Sistema: *SU₭Ʉ₦₳.EXΞ*',
      buttons: [
        ...buttons,
        {
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '🌳 MENU - LIST ☘️',
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
          body: `あ ${global.namebot} あ`,
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