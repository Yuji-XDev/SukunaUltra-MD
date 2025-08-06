import ws from 'ws';
import { totalmem, freemem } from 'os'
import os from 'os'
import util from 'util'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import { spawn, exec, execSync } from 'child_process'
const format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) return conn.reply(m.chat,`🌳 El Comando *${command}* está desactivado temporalmente.`, m, fake)

  const connsActivas = global.conns.filter(conn =>
    conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED
  );
  
  const _muptime = process.uptime() * 1000
  const uptime = clockString(_muptime)

  const vistos = new Set();
  const subbotsUnicos = connsActivas.filter(conn => {
    const jid = conn.user?.jid;
    if (vistos.has(jid)) return false;
    vistos.add(jid);
    return true;
  });

  function convertirMsADiasHorasMinutosSegundos(ms) {
    let segundos = Math.floor(ms / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);
    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    let resultado = '';
    if (dias) resultado += `${dias} ᴅɪᴀs, `;
    if (horas) resultado += `${horas} ʜᴏʀᴀs, `;
    if (minutos) resultado += `${minutos} ᴍɪɴᴜᴛᴏs, `;
    if (segundos) resultado += `${segundos} sᴇɢᴜɴᴅᴏs`;
    return resultado.trim();
  }

  const total = subbotsUnicos.length;
  const maxSubbots = 50;
  const disponibles = maxSubbots - total;
  const mentions = [];


  const totalSubs = subbotsUnicos.length;
  const lista = subbotsUnicos.map((bot, i) => {
    return `╭➤ Sσƈƙꫀƚ #${i + 1} 𓆩🌳𓆪
│⤿ 🧪 \`Usuario:\` ${bot.user?.name || '𝚂𝚄𝙱 𝙱𝙾𝚃 𝚂𝚄𝙺𝚄𝙽𝙰'}
│⤿ 🏮 \`Link:\` wa.me/${(bot.user?.jid || '').replace(/[^0-9]/g, '')}
│⤿ 🍯 \`En linea:\` ${bot.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime) : '𝘿𝙚𝙨𝙘𝙤𝙣𝙤𝙘𝙞𝙙𝙤'}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈꒱`;
  }).join('\n\n\n');

  const textoSubbots = totalSubs === 0
    ? '𝙉𝙤 𝙝𝙖𝙮 𝙎𝙪𝙗-𝘽𝙤𝙩𝙨 𝙖𝙘𝙩𝙞𝙫𝙤𝙨 𝙥𝙤𝙧 𝙖𝙝𝙤𝙧𝙖. 🌙'
    : `*✦ Sockets Activos de Sukuna Ultra-MD ✦*

> ⟢ ⌛ *Tiempo Activo:* _[ ${uptime} ]_
> ⟢ 🌳 *Sessions Libres:* _[ ${disponibles} ]_
> ⟢ 🎄 *Subs conectados:* _[ ${totalSubs} ]_
> ⟢ 💾 *RAM usada:* _[ ${format(totalmem() - freemem())} / ${format(totalmem())} ]_

    -  List de Subs Conectados  -

${lista}

> ${club}`;

  await conn.sendMessage(m.chat, {
    contextInfo: {
      externalAdReply: {
        title: `🍁 𝐒𝐎𝐂𝐊𝐄𝐓𝐒 𝐂𝐎𝐍𝐄𝐂𝐓𝐀𝐃𝐎𝐒 🏮`,
        body: `🧪 ᴄᴏɴᴇᴄᴛᴀᴅᴏs: ${total}/${maxSubbots}`,
        thumbnailUrl: 'https://files.catbox.moe/zgvj8c.jpg',
        sourceUrl: 'https://gituhb.com/Yuji-XDev/SukunaUltra-MD',
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true
      }
    },
    text: textoSubbots
  }, { quoted: fkontak });
};

handler.command = ['sockets', 'bots', 'socket'];
handler.tags = ['jadibot'];
handler.help = ['sockets'];

export default handler;


function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}