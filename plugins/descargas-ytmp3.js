import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `╭━━⬣『 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙇𝙄𝙉𝙆 』⬣━━╮
┃⛩️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙖 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙔𝙤𝙪𝙏𝙪𝙗𝙚 🌲
╰━━━〔 🌀 𝙎𝙐𝙆𝙐𝙉𝘼 𝘽𝙊𝙏 〕━━⬣`, m);
    }

    await conn.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });

    const search = await yts(text);
    const video = search.videos[0];
    if (!video) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const { title, timestamp, views, ago, url, author, thumbnail } = video;
    const canal = author?.name || 'Desconocido';
    const vistas = new Intl.NumberFormat('es-PE').format(views); // Con puntos

    const [min, seg] = timestamp.split(':');
    const duracion = `${parseInt(min)} minutos, ${min === '1' ? '' : 's'}, ${parseInt(seg)} segundo${seg === '1' ? '' : 's'}`;

    const api = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${url}`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json || !json.status || !json.download) {
      throw new Error('⚠️ No se pudo generar el enlace de descarga.');
    }

    const textoInfo = `╭━━⬣『 *🎲 YOUTUBE - MP3* 』⬣━━⬣
┃
┃ 🍃 *Titulo:* ${title}
┃ ⏱️ *Duración:* ${duracion}
┃ 🍰 *Canal:* ${canal}
┃ 👀 *Vistas:* ${vistas}
┃ 🌱 *Publicado:* ${ago}
┃ 🔗 *Link:* ${url}
┃
╰━━━━⬣\n\n*➭ El audio se está enviando... 🌸*`;

    const thumbnailBuffer = await (await fetch(thumbnail)).buffer();

    /*await conn.sendMessage(m.chat, {
      image: thumbnailBuffer,
      caption: textoInfo,
      contextInfo: {
        title: title,
        body: dev,
        thumbnailUrl: thumbnailBuffer,
        mediaType: 1,
        renderLargerThumbnail: false,
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401008003732@newsletter',
          newsletterName: '=͟͟͞𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 • 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⌺',
          serverMessageId: -1
        }
      }
    }, { quoted: m });*/
    
    
    await conn.sendMessage(m.chat, { text: textoInfo,  
      contextInfo:{  
        forwardedNewsletterMessageInfo: { 
          newsletterJid: '120363401008003732@newsletter', 
          serverMessageId: '', 
          newsletterName: 'sukuna ultra' 
        },
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid: null,  
        externalAdReply: {  
          showAdAttribution: true,  
          renderLargerThumbnail: true,  
          title: title,   
          body: wm,
          containsAutoReply: true,  
          mediaType: 1,     
          thumbnailUrl: thumbnailBuffer, 
          sourceUrl: "https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U"
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: json.download },
      mimetype: 'audio/mpeg',
      fileName: `${json.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          title: json.title,
          body: 'YOUTUBE • MP3',
          mediaType: 1,
          thumbnail: thumbnailBuffer,
          mediaUrl: url,
          sourceUrl: url,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: fkontak });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error('❌ Error en ytmp3:', e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return conn.reply(m.chat, `❌ *Error:* ${e.message}`, m);
  }
};

handler.command = ['ytmp3'];
handler.tags = ['descargas'];
handler.help = ['ytmp3 *<link o título>*'];

export default handler;