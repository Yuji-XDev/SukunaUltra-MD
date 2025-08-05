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
  const txt = `▧▧▧ BIENVENIDO / @ ▧▧▧`;
  const txt1 = `▧▧▧ ADIOS ▧▧▧`;
   
  let redes = ' https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U';
  let groupSize = participants.length;
  if (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++;
  else if (
    m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) groupSize--;

  if (chat?.welcome && m.messageStubType == 27) {
    let bienvenida = `┏━━━━━━ ◦ ❖ ◦ ━━━━━━┓
┃ 🐾 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 𝙉𝙪𝙚𝙫𝙤 𝘿𝙚𝙩𝙚𝙘𝙩𝙖𝙙𝙤
┣➤ 👤 @${numeroUsuario}
┣➤ 👥 Conectados: ${groupSize}
┣➤ 🌍 País: ${pais}
┣➤ 🕓 Timestamp: ${fecha} • ${hora}
┣➤ 🏰 Grupo: ${groupMetadata.subject}
┗━━━━━━━━━━━━━━━━━━━┛`;

    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak);
  }

  if (chat?.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = ` 💔 *Se ha ido:* @${numeroUsuario}
👥 *Miembros restantes:* ${groupSize}
🌐 *País:* ${pais}
🗓️ *Fecha:* ${fecha}
🕰️ *Hora Peru:* ${hora}
🏡 *Grupo:* ${groupMetadata.subject}`;

    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak);
  }
}