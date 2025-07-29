let handler = async (m, { conn, args, usedPrefix, command }) => {
  let url = args[0];
  if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
    return m.reply(`❗ *Ingresa un enlace de YouTube válido.*\n\n*Ejemplo:* ${usedPrefix + command} https://youtu.be/KHgllosZ3kA`);
  }

  try {
    m.react('🎶');

    let res = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(url)}`);
    let json = await res.json();

    if (!json.resultado || !json.resultado.descargar || !json.resultado.descargar.url) {
      return m.reply('⚠️ No se pudo obtener el audio. Intenta con otro enlace.');
    }

    let metadatos = json.resultado.metadatos || {};
    let {
      título = 'Desconocido',
      duración = {},
      vistas = '0',
      imagen = '',
      autor = {},
      ago = 'Desconocido'
    } = metadatos;

    let info = `✨ *TÍTULO:* ${título}
🎵 *DURACIÓN:* ${duración.timestamp || 'No disponible'}
📊 *VISTAS:* ${vistas.toLocaleString?.() || vistas}
🎤 *AUTOR:* ${autor.nombre || 'Desconocido'}
📅 *PUBLICADO:* ${ago}`;

    await conn.sendMessage(m.chat, {
      image: { url: imagen },
      caption: info,
      contextInfo: {
        externalAdReply: {
          title: título,
          body: `Duración: ${duración.timestamp || 'Desconocido'}`,
          thumbnailUrl: imagen,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: url
        }
      }
    });

    await conn.sendMessage(m.chat, {
      document: { url: json.resultado.descargar.url },
      fileName: json.resultado.descargar.filename,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al procesar el enlace.');
  }
};

handler.help = ['yt3'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = ['yt3'];

export default handler;