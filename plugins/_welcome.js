import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  const getPais = (numero) => {
    const paisesPorPrefijo = {
      "1": "🇺🇸 Estados Unidos",
      "34": "🇪🇸 España",
      "52": "🇲🇽 México",
      "54": "🇦🇷 Argentina",
      "55": "🇧🇷 Brasil",
      "56": "🇨🇱 Chile",
      "57": "🇨🇴 Colombia",
      "58": "🇻🇪 Venezuela",
      "591": "🇧🇴 Bolivia",
      "593": "🇪🇨 Ecuador",
      "595": "🇵🇾 Paraguay",
      "598": "🇺🇾 Uruguay",
      "502": "🇬🇹 Guatemala",
      "503": "🇸🇻 El Salvador",
      "504": "🇭🇳 Honduras",
      "505": "🇳🇮 Nicaragua",
      "506": "🇨🇷 Costa Rica",
      "507": "🇵🇦 Panamá",
      "51": "🇵🇪 Perú",
      "53": "🇨🇺 Cuba",
      "91": "🇮🇳 India"
    };
    for (let i = 1; i <= 3; i++) {
      const prefijo = numero.slice(0, i);
      if (paisesPorPrefijo[prefijo]) return paisesPorPrefijo[prefijo];
    }
    return "🌎 Desconocido";
  };

  const numeroUsuario = m.messageStubParameters?.[0]?.split('@')[0];
  if (!numeroUsuario) return;
  const pais = getPais(numeroUsuario);

  const fecha = new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima' });
  const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  let pp;
  try {
    pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image');
  } catch {
    pp = 'https://files.catbox.moe/04u4qi.jpg';
  }

  let img;
  try {
    img = await (await fetch(pp)).buffer();
  } catch {
    img = null;
  }

  const chat = global.db.data.chats[m.chat];
  const txt = `▧▧▧ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴 :: SYSTEM ONLINE ▧▧▧`;
  const txt1 = `▧▧▧ 𝙎𝙃𝙐𝙏𝙏𝙄𝙉𝙂 𝘿𝙊𝙒𝙉 :: USER LEFT ▧▧▧`;
   
  let redes = ' https://gituh.com/Yuji-XDev';
  let groupSize = participants.length;
  if (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++;
  else if (
    m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) groupSize--;

  if (chat?.welcome && m.messageStubType == 27) {
    let bienvenida = `⌬ ──[ 𝙉𝙐𝙀𝙑𝙊 𝙉𝙊𝘿𝙊 𝘾𝙊𝙉𝙀𝘾𝙏𝘼𝘿𝙊 ]── ⌬

╭╼⃝🌸✦ 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝑵𝒚𝒂~ ✦🌸╾⃝╮
┃
┃ 🐾 *Nᴜᴇᴠ@:* @${numeroUsuario}
┃ 🎀 *𝙐𝙨𝙚𝙧𝙨 𝙘𝙤𝙣𝙚𝙘𝙩𝙖𝙙𝙤𝙨:* ${groupSize}
┃ 🗺️ *𝙇𝙤𝙘𝙖𝙡𝙞𝙯𝙖𝙘𝙞𝙤́𝙣:* ${pais}
┃ 📆 *𝙏𝙞𝙢𝙚𝙨𝙩𝙖𝙢𝙥:* ${fecha} • ${hora}
┃ 🏰 *𝙂𝙧𝙪𝙥𝙤 𝙙𝙚 𝙙𝙚𝙨𝙥𝙡𝙞𝙚𝙜𝙪𝙚:* ${groupMetadata.subject}
┃
╰━･ﾟ✧*:･ﾟ✿🌸✧ﾟ･:✿･ﾟ✧━╯

💌 *¡Bienvenid@! Siéntete como en casa~*
> 🛠 \`\`\`ᴜsᴀ #ᴍᴇɴᴜ ᴘᴀʀᴀ ᴠᴇʀ ʟᴏs ᴄᴏᴍᴀɴᴅᴏs ᴅɪsᴘᴏɴɪʙʟᴇs.\`\`\``;

    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak);
  }

  if (chat?.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `╭─⃟🌹❖ 𝐇𝐀𝐒𝐓𝐀 𝐏𝐑𝐎𝐍𝐓𝐎 ❖🌹⃟─╮
┃
┃ 💔 *Se ha ido:* @${numeroUsuario}
┃ 👥 *Miembros restantes:* ${groupSize}
┃ 🌐 *País:* ${pais}
┃ 🗓️ *Fecha:* ${fecha}
┃ 🕰️ *Hora Peru:* ${hora}
┃ 🏡 *Grupo:* ${groupMetadata.subject}
┃
╰─────────────✦

🕊️ *Que los vientos te lleven a nuevos destinos...*
> 🛠 \`\`\`ᴜsᴀ #ᴍᴇɴᴜ ᴘᴀʀᴀ ᴠᴇʀ ʟᴏs ᴄᴏᴍᴀɴᴅᴏs ᴅɪsᴘᴏɴɪʙʟᴇs.\`\`\``;

    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak);
  }
}