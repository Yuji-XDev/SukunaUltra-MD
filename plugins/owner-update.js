import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply(`Actualizando.`);

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `Error: No se pudo realizar la actualizacion.\nRazon: ${err.message}`, m);
      return;
    }

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `*El bot ya esta actualizado.*`, m, fake);
    } else {
      conn.reply(m.chat, `*Actualizacion realizada con Exito.*\n\n${stdout}`, m, fake);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'fix'];
handler.rowner = true;

export default handler;