import acrcloud from 'acrcloud';
import { tmpdir } from 'os';
import { writeFile, unlink } from 'fs/promises';
import { randomUUID } from 'crypto';
import yts from 'yt-search';
import fetch from 'node-fetch';
import path from 'path';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

const msToTime = (ms) => {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}m ${sec}s`;
};

let handler = async (m, { conn, command, usedPrefix }) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';

  if (!/audio|video/.test(mime)) {
    return conn.reply(m.chat, `🎧 *Responde a un audio o video para reconocer la música.*`, m, fake);
  }

  try {
    await m.react('🎵');

    const buffer = await q.download();
    if (!buffer || buffer.length > 5 * 1024 * 1024) {
      throw '⚠️ *Archivo inválido o muy pesado. Usa uno menor a 5MB.*';
    }

    const filePath = path.join(tmpdir(), `${randomUUID()}.mp3`);
    await writeFile(filePath, buffer);

    const result = await acr.identify(buffer);
    await unlink(filePath);

    if (result.status?.msg !== 'Success') throw '❌ No se pudo identificar ninguna canción.';

    const song = result.metadata?.music?.[0];
    if (!song) throw '❌ No se encontró información de la canción.';

    const title = song.title || 'Desconocido';
    const artist = song.artists?.[0]?.name || 'Desconocido';
    const album = song.album?.name || 'Desconocido';
    const genres = song.genres?.map(g => g.name).join(', ') || 'Desconocido';
    const duration = song.duration_ms ? msToTime(song.duration_ms) : 'Desconocido';
    const release = song.release_date || 'Desconocido';
    const image = song.album?.images?.[0]?.url || 'https://i.imgur.com/yYUk4Yr.jpg';


    let youtubeUrl = song.external_metadata?.youtube?.vid
      ? `https://youtu.be/${song.external_metadata.youtube.vid}`
      : '';

    if (!youtubeUrl) {
      const ytSearch = await yts(`${title} ${artist}`);
      const video = ytSearch.videos?.[0];
      if (video) youtubeUrl = video.url;
    }


    let spotifyUrl = song.external_metadata?.spotify?.track?.external_urls?.spotify || '';
    if (!spotifyUrl) {
      const sp = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(title + ' ' + artist)}`);
      const json = await sp.json();
      if (json?.datos?.length > 0) spotifyUrl = json.datos[0].url;
    }

    const info = `
╭━━〔 *🎼 WHATMUSIC DETECTADO* 〕━━⬣
┃ 🎧 *Título:* ${title}
┃ 👤 *Artista:* ${artist}
┃ 💿 *Álbum:* ${album}
┃ 📀 *Género:* ${genres}
┃ 🗓 *Lanzamiento:* ${release}
┃ ⏱ *Duración:* ${duration}
┃
┃ 🔗 *YouTube:* ${youtubeUrl || 'No encontrado'}
┃ 🔗 *Spotify:* ${spotifyUrl || 'No encontrado'}
╰━━━━━━━━━━━━━━━━━━━━⬣┃
`.trim();

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title,
          body: artist,
          thumbnailUrl: image,
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: youtubeUrl || spotifyUrl || ''
        }
      },
      buttons: [
        {
          buttonId: `${usedPrefix}play ${youtubeUrl}`,
          buttonText: { displayText: '📥 Descargar' },
          type: 1
        },
        {
          buttonId: `${usedPrefix}ytsearch ${title}`,
          buttonText: { displayText: '🔎 Buscar' },
          type: 1
        }
      ],
      footer: '🌾 Powered By Dev.Shadow 🌳'
    }, { quoted: m });

  } catch (err) {
    console.error('[❌ WHATMUSIC ERROR]:', err);
    await conn.reply(m.chat, `❌ *No se pudo reconocer la música.*\n\n💡 Asegúrate de enviar un audio de buena calidad y mínimo 10s.\n\n🔁 *Error:* ${err}`, m, fake);
  }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;