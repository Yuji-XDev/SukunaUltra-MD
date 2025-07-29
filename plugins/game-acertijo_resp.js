import similarity from 'similarity';
const threshold = 0.72;

const handler = (m) => m;

handler.before = async function(m) {
  const id = m.chat;

  // Verificar si el mensaje es una respuesta al acertijo enviado por el bot
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.text || !/^ⷮ/i.test(m.quoted.text)) return;

  this.tekateki = this.tekateki ? this.tekateki : {};

  // Verificar si el juego está activo para este chat
  if (!(id in this.tekateki)) {
    return; // Si el juego ya terminó, no hacer nada ni enviar mensaje
  }

  // Verificar si el mensaje citado corresponde al acertijo actual
  if (m.quoted.id === this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));

    // Comprobar si la respuesta es correcta
    if (m.text.toLowerCase() === json.response.toLowerCase().trim()) {
      m.reply(`*Respuesta correcta!*\n+${this.tekateki[id][2]} exp`);
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } 
    // Si la respuesta es similar (umbral de similitud)
    else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
      m.reply(`*Casi lo logras!*`);
    } 
    // Si la respuesta es incorrecta
    else {
      m.reply('*Respuesta incorrecta!*');
    }
  }

  return true; // Asegúrate de que esto sea verdadero para continuar la ejecución
};

handler.exp = 0;
export default handler;