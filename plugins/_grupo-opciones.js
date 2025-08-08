const handler = async (m, { conn }) => {
  const { welcome, antiPrivate, antiarabe, restrict, antiBot, autoAceptar, autoRechazar, antiBot2, modoadmin, reaction, nsfw, antiLink2, jadibotmd, detect, antiver, audios, antiLink, antifake } = global.db.data.chats[m.chat];  
  
        let thumbnail = 'https://files.catbox.moe/4dple4.jpg';  
        let rcanal = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U';
        
        await conn.sendMessage(m.chat, { 
            text: "🏔️ Enviando panel De configuración", 
            contextInfo: { 
                externalAdReply: { 
                    title: '┈ ⋞ 〈 ʀɪɴ ɪᴛᴏsʜɪ - ᴀɪ 〉 ⋟ ┈',
                    body: '°•°•°•°•°•°•°•°∞°•°•°•°•°•°•°•°',
                    mediaType: 1, 
                    thumbnail: await (await fetch(thumbnail)).buffer(), 
                    sourceUrl: rcanal 
                }
            }
        });

  const estado = (valor) => valor ? ' *`Activado`*' : ' *`Desactivado`*';

  const itoshi = `Estado:`;
  const text = `*PANEL DE CONFIGURACIÓN* 

Grupos :

| ☘️ welcome:
| ✓ ${itoshi} ${estado(welcome)} 
|
| ☘️ Antibot
| ✓ ${itoshi} ${estado(antiBot)} 
|
| ☘️ Autoaceptar
| ✓ ${itoshi} ${estado(autoAceptar)} 
|
| ☘️ Autorechazar
| ✓ ${itoshi} ${estado(autoRechazar)}
|
| ☘️ AntiSub Bots
| ✓ ${itoshi} ${estado(antiBot2)} 
|
| ☘️ Modo Admin
| ✓ ${itoshi} ${estado(modoadmin)} 
|
| ☘️ Reaccion
| ✓ ${itoshi} ${estado(reactiont)}
|
| ☘️ NSFW
| ✓ ${itoshi} ${estado(nsfw)} 
|
| ☘️ Anti Link2
| ✓ ${itoshi} ${estado(antiLink2)} 
|
| ☘️ avisos / detect
| ✓ ${itoshi} ${estado(detect)} 
|
| ☘️ antiocultar / antiver
| ✓ ${itoshi} ${estado(antiver)} 
|
| ☘️ audios
| ✓ ${itoshi} ${estado(audios)} 
|
| ☘️ antilink
| ✓ ${itoshi} ${estado(antiLink)}
|
| ☘️ antifakes
| ✓ ${itoshi}: ${estado(antifake)} 



owner • creador:

| 🌳 Antiprivado
| • ${itoshi} ${estado(antiPrivate)} 
|
| 🌳 Antiarabe
| • ${itoshi} ${estado(antiarabe)} 
|
| 🌳 Retringir
|• ${itoshi} ${estado(restrict)} 
|
| 🌳 modejadibot
|• ${itoshi} ${estado(jadibotmd)} 
|


_*📝 Ejemplo de uso (#antilink on).*_`;

  await conn.sendMessage(m.chat, {
    text: text,
    contextInfo: {
      externalAdReply: {
        title: 'Configuracion Rin itoshi',
        body: 'Gestión Avanzada del Reino',
        thumbnailUrl: 'src/catalogo.jpg',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: fkontak });
};

handler.help = ['on'];
handler.tags = ['grupo'];
handler.command = ['off', 'on', 'nable'];
handler.register = true;
//handler.group = true;

export default handler;