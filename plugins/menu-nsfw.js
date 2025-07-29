import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    const img = './src/catalogo.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `👋🏻 ¡Hᴏʟᴀ! ${taguser}
Bɪᴇɴᴠᴇɴɪᴅᴏ ᴀʟ ᴍᴇɴᴜ *ɴsғᴡ* 🔞


𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`* 🪱 ᦡᦡ
ര ׄ⃟🪱˚ .xnxxsearch *<query>*
ര ׄ⃟🪱˚ .pornhubsearch *texto*
ര ׄ⃟🪱˚ .hentaisearch
ര ׄ⃟🪱˚ .r34 *texto*
ര ׄ⃟🪱˚ .xvsearch

━━━━━━━━━━━━━━━━━━━

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`* 🧋ᦡᦡ
ര ׄ⃟🧋˚ .xnxxdl *ulr*
ര ׄ⃟🧋˚ .xvideosdl *url*	

━━━━━━━━━━━━━━━━━━━

𓂂𓏸  𐅹੭੭   *\`gі𝖿s\`* 🦪 ᦡᦡ
ര ׄ⃟🦪˚ .sixnine/69 @tag
ര ׄ⃟🦪˚ .anal/culiar @tag
ര ׄ⃟🦪˚ .blowjob/mamada @tag
ര ׄ⃟🦪˚ .boobjob/rusa @tag
ര ׄ⃟🦪˚ .cum/leche @tag
ര ׄ⃟🦪˚ .fap/paja @tag
ര ׄ⃟🦪˚ .follar @tag
ര ׄ⃟🦪˚ .footjob/pies @tag
ര ׄ⃟🦪˚ .fuck/coger @tag
ര ׄ⃟🦪˚ .grabboobs/agarrartetas @tag
ര ׄ⃟🦪˚ .grop/manosear @tag
ര ׄ⃟🦪˚ .pack / loli
ര ׄ⃟🦪˚ .penetrar @user
ര ׄ⃟🦪˚ .suckboobs/chupartetas @tag
ര ׄ⃟🦪˚ .tetas
ര ׄ⃟🦪˚ .spank/nalgada @tag
ര ׄ⃟🦪˚ .sexo/sex @tag
ര ׄ⃟🦪˚ .lickpussy/coño @tag
ര ׄ⃟🦪˚ .videoxxx
ര ׄ⃟🦪˚ .violar/perra @tag
ര ׄ⃟🦪˚ .undress
ര ׄ⃟🦪˚ .lesbianas/tijeras @tag

━━━━━━━━━━━━━━━━━━━

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ𝗍ᥱᥒіძ᥆\`* 🍒 ᦡᦡ
ര ׄ⃟🍒˚ .pack
ര ׄ⃟🍒˚ .pack2
ര ׄ⃟🍒˚ .plack3
ര ׄ⃟🍒˚ .plack4
ര ׄ⃟🍒˚ .videoxxx
ര ׄ⃟🍒˚ .loli
ര ׄ⃟🍒˚ .tetas
ര ׄ⃟🍒˚ .videoxxxlesbi

> © mᥱᥒᥙ *ᥒs𝖿ᥕ*`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

  } catch {
    conn.reply(m.chat,'* Error al enviar el menú.*\n\n> ${e}', m);
  }
};

handler.help = ['menunsfw']
handler.command = ['menunsfw', 'menu+18', 'menu18', 'menuhot']
handler.fail = null;

export default handler;