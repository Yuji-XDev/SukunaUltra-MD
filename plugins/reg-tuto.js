let handler = async (m, { conn }) => {
  const usuario = m.pushName || 'Usuario';
  const videoUrl = 'https://qu.ax/yTjnH.mp4';

  const texto = `Hola @${m.sender.split('@')[0]} aquí está el tutorial para hacerte subbot en sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀.`;

  const options = {
    quoted: m,
    caption: texto,
    mentions: [m.sender]
  };

  await conn.sendMessage(m.chat, { video: { url: videoUrl }, ...options });
};

handler.command = ['tutosub']

export default handler;