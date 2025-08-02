let handler = async(m, { conn }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
  return m.reply(`《✦》El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw on*`);
  }
let img = 'https://delirius-apiofc.vercel.app/nsfw/boobs';

let text = '*🍭 TETAS*';

conn.sendMessage(m.chat, { image: { url: img }, caption: text }, { quoted: m });
m.react('✅');
}

handler.help = ['tetas'];
handler.tags = ['nsfw'];
handler.command = ['tetas'];

export default handler;