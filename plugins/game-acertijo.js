import fs from 'fs';


const timeout = 60000;
const poin = 500;
const handler = async (m, {conn, usedPrefix}) => {

  conn.tekateki = conn.tekateki ? conn.tekateki : {};
  const id = m.chat;
  if (id in conn.tekateki) {
    conn.reply(m.chat, '*⚠️ Estas En Juego*' , conn.tekateki[id][0]);
    throw false;
  }

const filePath = './src/game/acertijo.json';
const fileContent = fs.readFileSync(filePath, 'utf8');
const tekateki = JSON.parse(fileContent);

  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');

  const caption = `
ⷮ *${json.question}* 
• *Tiempo restante:* ${(timeout / 1000).toFixed(2)} segundos
• *Puntos:* +${poin} Exp
`.trim();

  conn.tekateki[id] = [
    await conn.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo! La respuesta era: ${json.response}`, conn.tekateki[id][0]);
      delete conn.tekateki[id];
    }, timeout)];
};
handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = ['acertijo', 'acert'];
export default handler;