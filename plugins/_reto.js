import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, command }) => {
  try {
    // Página que contiene listas de retos
    let url = 'https://parahoreca.com/retos-divertidos/';
    let res = await fetch(url);
    let html = await res.text();
    let $ = cheerio.load(html);

    // Buscar retos (en este caso están en <li>)
    let retos = [];
    $('li').each((i, el) => {
      let texto = $(el).text().trim();
      if (texto.length > 10) retos.push(texto);
    });

    if (!retos.length) throw 'No encontré retos en la página.';

    let reto = retos[Math.floor(Math.random() * retos.length)];

    let mensaje = `
╭━━━〔 🎯 𝑹𝒆𝒕𝒐 𝑫𝒆𝒍 𝑫𝒊𝒂 〕━━━⬣
│ ⚡ *${reto}*
┗━━━「 𝐒𝐔𝐊𝐔𝐍𝐀 𝐁𝐎𝐓 」━━━┛
    `;

    conn.reply(m.chat, mensaje, m);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ No pude obtener un reto en este momento.', m);
  }
};

handler.help = ['reto2'];
handler.tags = ['fun'];
handler.command = /^reto2$/i;

export default handler;