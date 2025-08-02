let handler = async (m, { conn }) => {
m.private = !m.isGroup;

if (!m.private) {
  return await conn.reply(m.chat, '🚫 Este comando solo funciona en privado.', m);
}

  let img = 'https://dark-core-api.vercel.app/api/random/ass?key=api';
  let text = '🍑 *Disfruta tu ración de... arte digital 🙈*';

  conn.sendMessage(m.chat, {
    image: { url: img },
    caption: text,
    buttons: [
      { buttonId: '.culo', buttonText: { displayText: '🔁 Otra más' }, type: 1 }
    ]
  }, { quoted: m });

  m.react('✅');
}

handler.help = ['culo'];
handler.tags = ['nsfw'];
handler.command = ['culo'];

export default handler;