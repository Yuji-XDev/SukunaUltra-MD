import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Aldeano';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `╭─〔 ✦ 𝐄𝐗𝐏𝐄𝐃𝐈𝐄𝐍𝐓𝐄 𝐀𝐍Á𝐋𝐈𝐓𝐈𝐂𝐎 ✦ 〕─╮
        ✧ 𝗦𝗨𝗞𝗨𝗡𝗔 - 𝖇𝖑𝖆𝖈𝖐 ✧
╰───────────────────────────╯

🆔 𝕌𝕤𝕦𝕒𝕣𝕚𝕠: @${userId.split('@')[0]}
💠 𝓝𝓸𝓶𝓫𝓻𝓮 𝓬𝓵𝓪𝓿𝓮: *${name}*
🧸 𝓝𝓸𝓽𝓪 𝓶𝓮𝓷𝓽𝓪𝓵: _${description}_

╭─〔 🍃 𝐃𝐀𝐓𝐎𝐒 𝐁𝐀́𝐒𝐈𝐂𝐎𝐒 〕─╮
┃ 🎂 𝐄𝐝𝐚𝐝: ${user.age || 'Desconocida'}
┃ 📅 𝐂𝐮𝐦𝐩𝐥𝐞𝐚𝐧̃𝐨𝐬: ${cumpleanos}
┃ 🧬 𝐆é𝐧𝐞𝐫𝐨: ${genero}
┃ 💞 𝐕í𝐧𝐜𝐮𝐥𝐨 𝐚𝐜𝐭𝐢𝐯𝐨: ${pareja}
╰────────────────────────╯

╭─〔 ⚙️ 𝐑𝐄𝐍𝐃𝐈𝐌𝐈𝐄𝐍𝐓𝐎 𝐄𝐒𝐓𝐑𝐀𝐓𝐄́𝐆𝐈𝐂𝐎 〕─╮
┃ 📈 𝐄𝐗𝐏 𝐀𝐜𝐮𝐦𝐮𝐥𝐚𝐝𝐚: *${exp.toLocaleString()} puntos*
┃ 🧪 𝐍𝐢𝐯𝐞𝐥 𝐀𝐜𝐭𝐮𝐚𝐥: *${nivel}*
┃ 🏅 𝐑𝐚𝐧𝐠𝐨 𝐄𝐬𝐭𝐫𝐚𝐭𝐞𝐠𝐢𝐜𝐨: ${role}
┃
┃ 💰 𝐌𝐨𝐧𝐞𝐝𝐞𝐫𝐨: *${coins.toLocaleString()} ${moneda}*
┃ 🏦 𝐁𝐚𝐧𝐜𝐨: *${bankCoins.toLocaleString()} ${moneda}*
┃ 🌟 𝐏𝐫𝐞𝐦𝐢𝐮𝐦: *${user.premium ? '🟢 Activado' : '🔴 Desactivado'}*
╰───────────────────────────╯
🌙 𝐄𝐯𝐚𝐥𝐮𝐚𝐜𝐢𝐨́𝐧 𝐅𝐢𝐧𝐚𝐥:
❝ 𝑬𝒍 𝒕𝒂𝒍𝒆𝒏𝒕𝒐 𝒔𝒆 𝒇𝒐𝒓𝒋𝒂, 𝒑𝒆𝒓𝒐 𝒍𝒐𝒔 𝒏𝒖́𝒎𝒆𝒓𝒐𝒔 𝒏𝒐 𝒎𝒊𝒆𝒏𝒕𝒆𝒏. ❞

📎 Usa *#perfildates* para actualizar tu historia ✍️
╰─── ⋆｡°✩ 𝓕𝓲𝓷 𝓭𝓮𝓵 𝓲𝓷𝓯𝓸𝓻𝓶𝓮 ✩°｡⋆ ───╯
  `.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '🥀 ✧ 𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 ✧ 🎄',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
