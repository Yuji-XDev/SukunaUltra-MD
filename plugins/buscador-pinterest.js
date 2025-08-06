import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, args }) => {
  if (!text) return m.reply(`☘️ Ingresa un texto. Ejemplo: *.pinterest anime*`);

  try {
    if (text.includes("https://")) {
      m.react("⌛");
      let i = await dl(args[0]);
      let isVideo = i.download.includes(".mp4");

      await conn.sendMessage(m.chat, {
        [isVideo ? "video" : "image"]: { url: i.download },
        caption: `🖼️ *Título:* ${i.title}`
      }, { quoted: m });

      return m.react("✅");
    }

    m.react('🕒');
    const results = await pins(text);
    if (!results.length) return conn.reply(m.chat, `⚠️ No se encontraron resultados para "${text}".`, m);

    const medias = results.slice(0, 10).map(img => ({
      type: 'image',
      data: { url: img.image_large_url }
    }));

    let caption = `╭━━━〔 🔎 *Pinterest Search* 〕━━⬣\n`;
    caption += `┃☘️ *Búsqueda:* ${text}\n`;
    caption += `┃📷 *Mostrando:* ${medias.length} / ${results.length} resultados\n`;
    caption += `╰━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendSylphy(m.chat, medias, {
      caption,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Error al obtener imágenes de Pinterest:\n\n' + e, m);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['download'];

export default handler;

// FUNCIONES AUXILIARES

async function dl(url) {
  try {
    let res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    let $ = cheerio.load(res.data);
    let tag = $('script[data-test-id="video-snippet"]');

    if (tag.length) {
      let result = JSON.parse(tag.text());
      return {
        title: result.name,
        download: result.contentUrl
      };
    } else {
      let json = JSON.parse($("script[data-relay-response='true']").eq(0).text());
      let result = json.response.data["v3GetPinQuery"].data;
      return {
        title: result.title,
        download: result.imageLargeUrl
      };
    }
  } catch {
    return { msg: "Error, inténtalo de nuevo más tarde" };
  }
}

const pins = async (query) => {
  const url = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%7D%2C%22context%22%3A%7B%7D%7D`;

  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'x-requested-with': 'XMLHttpRequest'
  };

  try {
    const res = await axios.get(url, { headers });
    const data = res.data?.resource_response?.data?.results || [];

    return data.map(item => {
      if (item.images) {
        return {
          image_large_url: item.images.orig?.url || null,
          image_medium_url: item.images['564x']?.url || null,
          image_small_url: item.images['236x']?.url || null
        };
      }
      return null;
    }).filter(Boolean);

  } catch (error) {
    console.error('❌ Error al buscar en Pinterest:', error);
    return [];
  }
};