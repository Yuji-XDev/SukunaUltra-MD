import axios from 'axios';
import * as cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) {
        let msg = '';
        if (command === 'nimegamesearch') {
            msg = `🔍 *Senpai*, ingresa el título del anime.\nEjemplo: *${usedPrefix + command} Naruto*`;
        } else if (command === 'nimegamedetail') {
            msg = `📚 *Senpai*, ingresa la URL del anime.\nEjemplo: *${usedPrefix + command} https://nimegami.id/anime/naruto-shippuden/*`;
        }
        return conn.sendMessage(m.chat, { text: msg });
    }

    try {
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        if (command === 'nimegamesearch') {
            const results = await buscarAnime(text);

            if (!results.length) return conn.sendMessage(m.chat, {
                text: `😢 *Senpai*, no se encontraron resultados para *${text}*.`
            });

            let caption = `🎬 *Resultados para "${text}"*:\n\n`;

            for (let [i, res] of results.entries()) {
                caption += `🔹 *${i + 1}. ${res.title}*\n`;
                caption += `🏷️ Tipo: ${res.tipe}\n`;
                caption += `🎭 Estado: ${res.status}\n`;
                caption += `🔢 Episodios: ${res.jumlahEps}\n`;
                caption += `⭐ Calificación: ${res.rating}\n`;
                caption += `🔗 ${res.link}\n\n`;

                if (i === 0 && res.thumb) {
                    await conn.sendMessage(m.chat, {
                        image: { url: res.thumb },
                        caption
                    });
                    caption = '';
                }
            }

            if (caption.trim()) await conn.sendMessage(m.chat, { text: caption });
        }

        if (command === 'nimegamedetail') {
            const details = await obtenerDetalleAnime(text);

            if (!details.length) return conn.sendMessage(m.chat, {
                text: `😢 *Senpai*, no se encontró el detalle del anime.`
            });

            const d = details[0];
            let caption = `✨ *Detalles del Anime*\n`;
            caption += `📌 *Título:* ${d.judul}\n`;
            caption += `🖋️ *Autor:* ${d.author}\n`;
            caption += `⏰ *Duración por Episodio:* ${d.durasiEps}\n`;
            caption += `⭐ *Calificación:* ${d.rating}\n`;
            caption += `📺 *Estudio:* ${d.studio}\n`;
            caption += `🎭 *Tipo:* ${d.tipe}\n`;
            caption += `🧩 *Género:* ${d.genre.join(', ')}\n`;
            caption += `🍂 *Temporada:* ${d.musim || 'Desconocido'}\n`;
            caption += `💬 *Subtítulo:* ${d.subtitle}\n`;
            caption += `📝 *Sinopsis:* ${d.sinopsis}\n`;
            caption += `🔗 *Fuente:* https://nimegami.id`;

            if (d.thumb) {
                await conn.sendMessage(m.chat, {
                    image: { url: d.thumb },
                    caption
                });
            } else {
                await conn.sendMessage(m.chat, { text: caption });
            }
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (e) {
        console.error('❌ Error:', e.message);
        let errorMsg = `⚠️ *Ocurrió un error inesperado.*\nInténtalo más tarde, Senpai.`;

        await conn.sendMessage(m.chat, { text: errorMsg });
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

async function buscarAnime(query) {
    const response = await axios.get(`https://nimegami.id/?s=${encodeURIComponent(query)}&post_type=post`);
    const $ = cheerio.load(response.data);
    const results = [];

    $('.archive-a article').each((i, el) => {
        const thumb = $(el).find('.attachment-medium').attr('src');
        const title = $(el).find('h2').text().trim();
        const status = $(el).find('.term_tag-a a').text().trim();
        const tipe = $(el).find('.terms_tag').text().trim();
        const jumlahEps = $(el).find('.eps-archive').text().trim();
        const rating = $(el).find('.rating-archive').text().trim() || 'Sin calificación';
        const link = $(el).find('h2 a').attr('href');

        if (title && link) {
            results.push({ thumb, title, status, tipe, jumlahEps, rating, link });
        }
    });

    return results;
}

async function obtenerDetalleAnime(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const details = [];

    $('article.single').each((i, el) => {
        let genre = [];
        $(el).find('.info2 table tbody tr .info_a a').each((i, ul) => {
            genre.push($(ul).text().trim());
        });

        const thumb = $(el).find('.coverthumbnail a').attr('href');
        const td = $(el).find('.info2 table tbody tr td');

        details.push({
            thumb,
            judul: td.eq(1).text().trim(),
            author: td.eq(3).text().trim(),
            durasiEps: td.eq(5).text().trim(),
            rating: td.eq(7).text().trim(),
            studio: td.eq(9).text().trim(),
            tipe: td.eq(15).text().trim(),
            subtitle: td.eq(19).text().trim(),
            sinopsis: $('#Sinopsis p').eq(0).text().trim(),
            genre
        });
    });

    return details;
}

handler.help = ['nimegamesearch <anime>', 'nimegamedetail <url>'];
handler.tags = ['anime'];
handler.command = ['nimegamesearch', 'animesearch', 'nimegamedetail'];
handler.register = true;
handler.limit = false;

export default handler;