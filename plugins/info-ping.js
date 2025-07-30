import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'

let handler = async (m, { conn }) => {
         let timestamp = speed();
         let latensi = speed() - timestamp;
         exec(`neofetch --stdout`, (error, stdout, stderr) => {
          let child = stdout.toString("utf-8");
          let ssd = child.replace(/Memory:/, "Ram:");

          conn.reply(m.chat, `┏━❖『 🖤 𝐋𝐀𝐓𝐄𝐍𝐂𝐈𝐀 』❖━┓
┃ ✰ *¡Pong recibido!*
┃ 💔 \`Velocidad\`: ${latensi.toFixed(4)}ms
┗━━━━━━━━━━━━━━━━━┛`, m, fake);
            });
}
handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler
