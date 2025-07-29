import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ");
  if (!text) {
    return m.reply(
      `┌──〔 📀 𝙈𝙊𝘿𝙊 𝙎𝙐𝙆𝙐𝙉𝘼 〕──┐
│ ⚠️ 𝙐𝙎𝙊 𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝙊:
│ ${usedPrefix}${command} shakira soltera
└──────────────────────┘`
    );
  }

  await m.react('💻');

 /* await m.reply(
    `┌──〔 🔍 𝙎𝙐𝘽𝙎𝙔𝙎𝙏𝙀𝙈 𝘼𝘾𝙏𝙄𝙑𝙀 〕──┐
│ 📡 Buscando en redes oscuras . . .
│ 💾 Término: ${text}
│ ⏳ Descifrando resultados...
└────────────────────────────┘`
  );*/

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl) {
      return m.reply(
        `┌──〔 ❌ 𝙀𝙍𝙍𝙊𝙍 𝟰𝟬𝟰 〕──┐
│ 🔎 No se encontró nada para:
│ "${text}"
└──────────────────────┘`
      );
    }

    const { title, artist, duration, cover, url } = json.result.metadata;
    const audio = json.result.downloadUrl;

    /*await conn.sendMessage(m.chat, {
      image: { url: cover },
      caption: 
`┌─〔 𝙈𝙀𝙏𝘼𝘿𝘼𝙏𝘼 𝘿𝙀 𝙇𝘼 𝘾𝘼𝙉𝘾𝙄Ó𝙉 〕─┐
│ 🧬 𝙏𝙞́𝙩𝙪𝙡𝙤: ${title}
│ 🎙️ 𝘼𝙧𝙩𝙞𝙨𝙩𝙖: ${artist}
│ ⏱️ 𝘿𝙪𝙧𝙖𝙘𝙞ó𝙣: ${duration}
│ 🌐 𝙎𝙥𝙤𝙩𝙞𝙛𝙮: ${url}
└────〔 𝙎𝙪𝙠𝙪𝙣𝙖_𝙎𝙮𝙨𝙩𝙚𝙢 🌳〕────┘`
    }, { quoted: m });*/

    await m.reply(
      `📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗘𝗡 𝗖𝗨𝗥𝗦𝗢...
> [▰▰▰▰▰▱▱▱▱▱] 50%
> Archivo: 🎧 ${title}
> Espera unos segundos...`
    );

    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
      ptt: false,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: '🌌 ᴅᴇsᴄᴀʀgᴀ ᴄᴏᴍᴘʟᴇᴛᴀ 🔊',
          thumbnailUrl: cover,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: url
        }
      }
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    return m.reply(
      `┌──〔 ❌ 𝙀𝙍𝙍𝙊𝙍 𝙎𝙄𝙎𝙏𝙀𝙈𝘼 〕──┐
│ ⚠️ Ocurrió un fallo inesperado.
│ 📄 Detalles en consola.
│ 🔁 Intenta de nuevo más tarde.
└────〔 💀 𝙎𝙪𝙠𝙪𝙣𝙖_𝙁𝘼𝙄𝙇.𝙙𝙢𝙥 〕────┘`
    );
  }
};

handler.command = ['music'];
handler.help = ['music <nombre>'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;