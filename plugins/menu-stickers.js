let handler = async (m, { conn }) => {
  let imgurl = 'https://files.catbox.moe/nmseef.png';
  const Menu = `⊹🎄 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒑𝒂𝒓𝒂 𝒍𝒂 𝒄𝒓𝒆𝒂𝒄𝒊𝒐𝒏 𝒚 𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒍𝒊𝒛𝒂𝒄𝒊𝒐𝒏 𝒅𝒆 𝒔𝒕𝒊𝒄𝒌𝒆𝒓𝒔 🌴⊹

യ ׄ🍄˚ #ʙʀᴀᴛ *<ᴛᴇxᴛᴏ>*
> ✦ ᴄᴏɴᴠɪᴇʀᴛᴇ ᴜɴ ᴛᴇxᴛᴏ ᴀ sᴛɪᴄᴋᴇʀ.

യ ׄ🏞️˚ #ʙʀᴀᴛᴠɪᴅ *<ᴛᴇxᴛᴏ>*
> ✦ ɴᴏsᴇ ᴘᴀ ǫ sɪʀᴠᴇ ᴇsᴛᴏ xᴅ.

യ ׄ👾˚ #ᴇᴍᴏᴊɪᴍɪx *<ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>*
> ✦ ᴄʀᴇᴀ ᴜɴ sᴏʟᴏ ᴇᴍᴏᴊɪ ᴄᴏɴ ᴅᴏs.

യ ׄ☄️˚ #ᴘғᴘ *@ᴜsᴇʀ*
> ✦ ᴏʙᴛᴇɴ ʟᴀ ɪᴍᴀɢᴇɴ ᴅᴇ ᴜɴ ᴜsᴜᴀʀɪᴏ.

യ ׄ⛩️˚ #ǫᴄ
> ✦ ᴄʀᴇᴀ ᴜɴ sᴛɪᴄᴋᴇʀ ᴘᴇʀsᴏɴᴀʟɪᴢᴀᴅᴏ.

യ ׄ🌥️˚ #sᴇᴛᴍᴇᴛᴀ
> ✦ ᴘᴇʀsᴏɴᴀʟɪᴢᴀ ʟᴏs ɴᴏᴍʙʀᴇs ᴅᴇ ʟᴏs sᴛɪᴄᴋᴇʀs ǫᴜᴇ ᴀɢᴀ ᴇʟ ʙᴏᴛ.
 
യ ׄ🐛˚ #s ---- #sᴛɪᴄᴋᴇʀ
> ✦ ᴄᴏɴᴠɪᴇʀᴛᴇ ᴜɴᴀ ɪᴍᴀɢᴇɴ ᴀ sᴛɪᴄᴋᴇʀ.

യ ׄ💥˚ #ᴛᴏɪᴍɢ *(ʀᴇᴘʟʏ)*
> ✦ ᴄᴏɴᴠɪᴇʀᴛᴇ ᴜɴ sᴛɪᴄᴋᴇʀ ᴀ ɪᴍᴀɢᴇɴ.

യ ׄ👻˚ #ᴡᴍ
> ✦ ᴘᴇʀsᴏɴᴀʟɪᴢᴀ ʟᴏᴀ ɴᴏᴍʙʀᴇs ᴅᴇ ʟᴏs sᴛɪᴄᴋᴇʀs ǫᴜᴇ ʀᴇsᴘᴏɴᴅᴀs.

യ ׄ🌚˚ #ᴀᴛᴛᴘ
> ✦ ᴄʀᴇᴀ ᴜɴ sᴛɪᴄᴋᴇʀ.

> ${dev}
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imgurl },
    caption: Menu,
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

handler.help = ['menusticker']
handler.tags = ['menus']
handler.command = ['menusticker', 'stickersmenu']

export default handler
