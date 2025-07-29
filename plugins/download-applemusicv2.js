import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`*📀 Por favor, ingresa el nombre de la música que deseas descargar de Apple Music*\n> *\`Ejemplo:\`* ${usedPrefix + command} Bad Bunny - Amorfoda`);
  }

  const appleMusic = {
    search: async (query) => {
      const url = `https://music.apple.com/us/search?term=${encodeURIComponent(query)}`;
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];

        $('.grid-item').each((i, el) => {
          const title = $(el).find('.top-search-lockup__primary__title').text().trim();
          const subtitle = $(el).find('.top-search-lockup__secondary').text().trim();
          const link = $(el).find('a.click-action').attr('href');
          if (title && link) results.push({ title, subtitle, link: `https://music.apple.com${link}` });
        });

        return results;
      } catch (e) {
        console.error('❌ Error en búsqueda de Apple Music:', e);
        return [];
      }
    }
  };

  const appledown = {
    getData: async (url) => {
      try {
        const { data } = await axios.get(`https://aaplmusicdownloader.com/api/applesearch.php?url=${encodeURIComponent(url)}`, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'MyApp/1.0',
            'Referer': 'https://aaplmusicdownloader.com/'
          }
        });
        return data;
      } catch (e) {
        console.error('❌ Error obteniendo datos:', e.message);
        return null;
      }
    },
    getAudio: async (trackName, artist, urlMusic, token) => {
      try {
        const res = await axios.post(
          'https://aaplmusicdownloader.com/api/composer/swd.php',
          qs.stringify({ song_name: trackName, artist_name: artist, url: urlMusic, token }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              'User-Agent': 'MyApp/1.0',
              'Referer': 'https://aaplmusicdownloader.com/song.php#'
            }
          }
        );
        return res.data?.dlink || null;
      } catch (e) {
        console.error('❌ Error obteniendo audio:', e.message);
        return null;
      }
    },
    download: async (urlMusic) => {
      const musicData = await appledown.getData(urlMusic);
      if (!musicData || !musicData.name) return { success: false, message: '⚠️ No se encontraron datos de la canción.' };

      try {
        const encoded = encodeURIComponent(JSON.stringify([
          musicData.name,
          musicData.albumname,
          musicData.artist,
          musicData.thumb,
          musicData.duration,
          musicData.url
        ]));

        const res = await axios.post(
          'https://aaplmusicdownloader.com/song.php',
          `data=${encoded}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Referer': 'https://aaplmusicdownloader.com/',
              'User-Agent': 'MyApp/1.0'
            }
          }
        );

        const $ = cheerio.load(res.data);
        const trackName = $('td:contains("Track Name:")').next().text();
        const albumName = $('td:contains("Album:")').next().text();
        const artist = $('td:contains("Artist:")').next().text();
        const thumb = $('figure.image img').attr('src');
        const duration = $('td:contains("Duration:")').next().text();
        const token = $('a#download_btn').attr('token');
        const download = await appledown.getAudio(trackName, artist, urlMusic, token);

        return {
          success: true,
          name: trackName,
          albumname: albumName,
          artist,
          thumb,
          duration,
          download
        };
      } catch (e) {
        console.error('❌ Error descargando música:', e.message);
        return { success: false, message: e.message };
      }
    }
  };

  await conn.sendMessage(m.chat, { react: { text: "🎵", key: m.key } });

  const search = await appleMusic.search(text);
  if (!search.length) return m.reply("❌ No se encontraron resultados en Apple Music.");

  const info = await appledown.download(search[0].link);
  if (!info.success) return m.reply(`❌ ${info.message}`);

  const { name, albumname, artist, download, thumb, duration } = info;

  const message = {
    audio: { url: download },
    mimetype: 'audio/mp4',
    fileName: `${name}.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: search[0].link,
        title: name,
        sourceUrl: search[0].link,
        thumbnail: await (await conn.getFile(thumb)).data
      }
    }
  };

  await conn.sendMessage(m.chat, message, { quoted: m });
  await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
};

handler.help = ['aplay2'];
handler.tags = ['descargas'];
handler.command = ['aplay2', 'applemusic2'];

export default handler;