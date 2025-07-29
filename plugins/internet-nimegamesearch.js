import axios from 'axios';
import * as cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text && command === 'nimegamesearch') return conn.sendMessage(m.chat, {
        text: `🔍 *Senpai*, ¡ingresa el título del anime que deseas buscar!  
Ejemplo: *${usedPrefix + command}* Naruto`
    });

    if (!text && command === 'nimegamedetail') return conn.sendMessage(m.chat, {
        text: `📚 *Senpai*, ¡ingresa la URL del detalle del anime!  
Ejemplo: *${usedPrefix + command}* https://nimegami.id/anime/naruto-shippuden/` 
    });

    try {
        if (command === 'nimegamesearch') {
            await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
            
            const results = await buscarAnime(text);
            
            if (!results.length) return conn.sendMessage(m.chat, {
                text: `😢 *Senpai*, no se encontraron resultados para "${text}" en NimeGami.`
            });

            let caption = `🎬 *Resultados de búsqueda para "${text}"*:\n\n`;
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
                } else if (i < 5) {
                    caption += `\n`;
                }
            }

            if (caption.trim()) await conn.sendMessage(m.chat, { text: caption });
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        }

        if (command === 'nimegamedetail') {
            await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
            
            const details = await obtenerDetalleAnime(text);
            
            if (!details.length) return conn.sendMessage(m.chat, {
                text: `😢 *Senpai*, no se encontraron detalles del anime.`
            });

            const detail = details[0];
            let caption = `✨ *Detalles del Anime*  
📌 *Título:* ${detail.judul}\n`;
            caption += `🖋️ *Autor:* ${detail.author}\n`;
            caption += `⏰ *Duración por Episodio:* ${detail.durasiEps}\n`;
            caption += `⭐ *Calificación:* ${detail.rating}\n`;
            caption += `📺 *Estudio:* ${detail.studio}\n`;
            caption += `🎭 *Tipo:* ${detail.tipe}\n`;
            caption += `🧩 *Género:* ${detail.genre.join(', ')}\n`;
            caption += `🍂 *Temporada:* ${detail.musim}\n`;
            caption += `💬 *Subtítulo:* ${detail.subtitle}\n`;
            caption += `📝 *Sinopsis:* ${detail.sinopsis}\n\n`;
            caption += `🔗 *Fuente:* https://nimegami.id`; 

            if (detail.thumb) {
                await conn.sendMessage(m.chat, {
                    image: { url: detail.thumb },
                    caption
                });
            } else {
                await conn.sendMessage(m.chat, {
                    text: caption
                });
            }
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        }
    } catch (e) {
        console.error('Error:', e.message);
        let errorMsg = `⚠️ *Ups, ocurrió un error, Senpai!*  
Intenta de nuevo más tarde, esta función está de mal humor 😅`;

        if (e.message.includes('tidak ada hasil')) {
            errorMsg = `😢 *Senpai*, no se encontraron resultados para "${text}".`;
        }

        await conn.sendMessage(m.chat, { text: errorMsg });
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

async function buscarAnime(query) {
    try {
        const response = await axios.get(`https://nimegami.id/?s=${encodeURIComponent(query)}&post_type=post`);
        const $ = cheerio.load(response.data);
        const results = [];

        $('.archive-a article').each((i, el) => {
            const thumb = $(el).find('.attachment-medium').attr('src');
            const title = $(el).find('h2').text().trim();
            const status = $(el).find('.term_tag-a a').text().trim();
            const tipe = $(el).find('.terms_tag').text().trim();
            const jumlahEps = $(el).find('.eps-archive').text().trim();
            const rating = $(el).find('.rating-archive').text().trim() || 'sin calificación';
            const link = $(el).find('h2 a').attr('href');

            if (title && link) {
                results.push({
                    thumb,
                    title,
                    status,
                    tipe,
                    jumlahEps,
                    rating,
                    link
                });
            }
        });

        return results;
    } catch (error) {
        throw new Error('No se pudo extraer la página');
    }
}

async function obtenerDetalleAnime(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const details = [];

        $('article.single').each((i, el) => {
            let genre = [];
            $(el).find('.info2 table tbody tr .info_a a').each((i, ul) => {
                genre.push($(ul).text().trim());
            });

            const thumb = $(el).find('.coverthumbnail a').attr('href');
            const judul = $(el).find('.info2 table tbody tr td').eq(1).text().trim();
            const author = $(el).find('.info2 table tbody tr td').eq(3).text().trim();
            const durasiEps = $(el).find('.info2 table tbody tr td').eq(5).text().trim();
            const rating = $(el).find('.info2 table tbody tr td').eq(7).text().trim();
            const studio = $(el).find('.info2 table tbody tr td').eq(9).text().trim();
            const tipe = $(el).find('.info2 table tbody tr td').eq(15).text().trim();
            const subtitle = $(el).find('.info2 table tbody tr td').eq(19).text().trim();
            const sinopsis = $('#Sinopsis p').eq(0).text().trim(); 

            details.push({
                thumb,
                judul,
                author,
                durasiEps,
                rating,
                studio,
                tipe,
                genre,
                subtitle,
                sinopsis
            });
        });

        return details;
    } catch (error) {
        throw new Error('No se pudo obtener el detalle del anime');
    }
}

handler.help = ['nimegamesearch <título>', 'nimegamedetail <url>'];
handler.tags = ['buscador', 'internet'];
handler.command = ['nimegamesearch', 'animesearch'];
handler.register = true;
handler.limit = false;

export default handler;