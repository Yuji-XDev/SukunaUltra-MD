let handler = async (m, { conn }) => {
  let imgurl = 'https://files.catbox.moe/nmseef.png';
  const texto = `ʜᴏʟᴀ
    ╔═══════ • ° ❁⊕❁ ° • ═══════╗
        💰⃟⃢᭄͜═✩═[𝐌𝐄𝐍𝐔-𝐑𝐏𝐆]═✩═⃟⃢᭄͜🏆
    ╚═══════ • ° ❁⊕❁ ° • ═══════╝

> 💰🎮⊹ 𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐝𝐞 𝐞𝐜𝐨𝐧𝐨𝐦𝐢́𝐚 𝐲 𝐑𝐏𝐆 𝐩𝐚𝐫𝐚 𝐠𝐚𝐧𝐚𝐫 𝐝𝐢𝐧𝐞𝐫𝐨 𝐲 𝐨𝐭𝐫𝐨𝐬 𝐫𝐞𝐜𝐮𝐫𝐬𝐨𝐬 🏆💎⊹

━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
❖─┅〈 𝑹 𝑷 𝑮 👻
┃𐇛 #ᴀᴠᴇɴᴛᴜʀᴀ
┃𐇛 #ʙᴀʟᴛᴏᴘ
┃𐇛 #ʙᴇʀʙᴜʀu / ᴄᴀᴢᴀʀ
┃𐇛 #ʙᴀɴᴋ / ʙᴀʟ
┃𐇛 #ᴄᴏғʀᴇ
┃𐇛 #ᴅᴇᴘᴏsɪᴛᴀʀ
┃𐇛 #ᴇxᴘʟᴏʀᴀʀ
┃𐇛 #ɢʀᴇᴍɪᴏ
┃𐇛 #ʜᴀʟʟᴏᴡᴇᴇɴ
┃𐇛 #ʜᴇᴀʟ
┃𐇛 #ɪɴᴠᴇɴᴛᴀʀɪᴏ
┃𐇛 #ᴍᴀᴢᴍᴏʀʀᴀ
┃𐇛 #ᴍᴏɴᴛʜʟʏ
┃𐇛 #ʀᴇᴛɪʀᴀʀ *<ᴄᴀɴᴛɪᴅᴀᴅ>*
┃𐇛 #ɴᴀᴠɪᴅᴀᴅ
┃𐇛 #ʀᴏʙᴀʀ
┃𐇛 #ᴘʀᴏsᴛɪᴛᴜɪʀsᴇ
┃𐇛 #ᴡᴇᴇᴋʟʏ
┃𐇛 #ᴘʟᴀʏ
╰━≡

❖─┅〈 𝑬𝑪𝑶𝑵𝑶𝑴𝑰𝑨 🌞
┃⛨ #ᴄᴀɴᴊᴇᴀʀ *<ᴄᴏᴅɪɢᴏ>*
┃⛨ #ᴡᴀʟʟᴇᴛ
┃⛨ #ᴀᴘᴏsᴛᴀʀ *<ᴄᴀɴᴛɪᴅᴀᴅ>*
┃⛨ #ᴄғ
┃⛨ #ᴄʀɪᴍᴇɴ
┃⛨ #ᴅᴀɪʟʏ
┃⛨ #ʀᴇɢᴀʟᴏ
┃⛨ #ᴍɪɴᴀʀ
┃⛨ #ʀᴏʙᴀʀxᴘ
┃⛨ #ʙᴜʏ - ʙᴜʏᴀʟʟ
┃⛨ #ʀᴜʟᴇᴛᴀ *<ᴄᴀɴᴛɪᴅᴀᴅ> <ᴄᴏʟᴏʀ>*
┃⛨ #ᴛʀᴀʙᴀᴊᴀʀ - ᴡᴏʀᴋ
┃⛨ #sʟᴏᴛ *<ᴀᴘᴜᴇsᴛᴀ>*
╰━≡
━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imgurl },
    caption: texto,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: packname,
        body: dev,
        thumbnailUrl: icono,
        mediaType: 1,
        renderLargerThumbnail: false,
        showAdAttribution: true,
        mediaUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
        sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
      }
    }
  }, { quoted: m });
};

handler.help = ['menurpg']
handler.tags = ['menus']
handler.command = ['menur', 'menurpg']

export default handler
