import os from 'os';
import { execSync } from 'child_process';

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const getDiskSpace = () => {
    try {
        const stdout = execSync('df -h | grep -E "^/dev/root|^/dev/sda1"').toString();
        const [ , size, used, available, usePercent ] = stdout.split(/\s+/);
        return { size, used, available, usePercent };
    } catch (error) {
        console.error('✧ Error al obtener el espacio en disco:', error);
        return null;
    }
};


const handler = async (m, { conn }) => {

    const rin = `╭━〔 ⚙️ 𝐂𝐀𝐑𝐆𝐀𝐍𝐃𝐎 𝐃𝐀𝐓𝐎𝐒 ⚙️ 〕━⬣
┃
┃ 🚧 𝐂 𝐀 𝐑 𝐆 𝐀 𝐍 𝐃 𝐎 - 𝐒𝐘𝐒𝐓𝐄𝐌...
┃ 🚀 *𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊́𝙉 𝘿𝙀𝙇 𝙎𝙄𝙎𝙏𝙀𝙈𝘼...*
┃
╰━━━━━━〔 🛰️ 〕━━━━━━⬣`
    await conn.reply(m.chat, rin.trim(), m)
    
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const _muptime = process.uptime() * 1000
    const muptime = clockString(_muptime)
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const nodeUsage = process.memoryUsage();
    const diskSpace = getDiskSpace();

    const message = `𓆩 𖤐 𓈒 𓂃 𝑺.𝑰.𝑺.𝑻.𝑬.𝑴.𝑨 𝑫𝑨𝑺𝑯𝑩𝑶𝑨𝑹𝑫 𓂃 𓈒 𖤐 𓆪
╭══• ༻✦༺•═══•༻✦༺•══╮
   ${done} *🧩 Estado del Sistema*
╰══• ༻✦༺•═══•༻✦༺•══╯

🛰️ *Host:* ${hostname}  
🧬 *Plataforma:* ${platform}  
🔧 *Arquitectura:* ${arch}  
🔋 *RAM Total:* ${formatBytes(totalMem)}  
🪄 *RAM Libre:* ${formatBytes(freeMem)}  
🧁 *RAM Usada:* ${formatBytes(usedMem)}  
⏳ *Tiempo Activo:* ${muptime}

╭── ⌬ 𝘜𝘴𝘰 𝘥𝘦 𝘔𝘦𝘮𝘰𝘳𝘪𝘢 𝘕𝘰𝘥𝘦.js ⌬ ──╮
✶ 📦 *RSS:* ${formatBytes(nodeUsage.rss)}  
✶ 🧠 *Heap Total:* ${formatBytes(nodeUsage.heapTotal)}  
✶ 🧃 *Heap Usado:* ${formatBytes(nodeUsage.heapUsed)}  
✶ 📂 *Externa:* ${formatBytes(nodeUsage.external)}  
✶ 🎯 *Buffers:* ${formatBytes(nodeUsage.arrayBuffers)}  
╰────────────────────────────╯

${diskSpace ? `
╭── ❄️ 𝘌𝘴𝘱𝘢𝘤𝘪𝘰 𝘦𝘯 𝘋𝘪𝘴𝘤𝘰 ─────────╮
✧ 💽 *Total:* ${diskSpace.size}  
✧ 📀 *Usado:* ${diskSpace.used}  
✧ 🪐 *Libre:* ${diskSpace.available}  
✧ 🔮 *Uso:* ${diskSpace.usePercent}  
╰────────────────────────────╯
` : '🚫 *No se pudo obtener el espacio en disco.*'}`;

    await conn.reply(m.chat, message.trim(), m, rcanal, );
};

handler.help = ['sistema'];
handler.tags = ['info'];
handler.command = ['system', 'sistema'];
handler.register = true;

export default handler;

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}