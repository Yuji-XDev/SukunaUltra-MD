export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
if (m.chat === '120363401008003732@newsletter') return !0
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`🌴 𝒉𝒐𝒍𝒂 @${m.sender.split`@`[0]}, 𝒎𝒊 𝒄𝒓𝒆𝒂𝒅𝒐𝒓 𝒂 𝒅𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂𝒅𝒐 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒆𝒏 𝒍𝒐𝒔 𝒄𝒉𝒂𝒕𝒔 𝒑𝒓𝒊𝒗𝒂𝒅𝒐𝒔 𝒆𝒍 𝒄𝒖𝒂𝒍 𝒔𝒆𝒓𝒂𝒔 𝒃𝒍𝒐𝒒𝒖𝒆𝒂𝒅𝒐, 𝒔𝒊 𝒒𝒖𝒊𝒆𝒓𝒆 𝒖𝒔𝒂𝒓 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒅𝒆𝒍 𝒃𝒐𝒕 𝒕𝒆 𝒆𝒏𝒗𝒊𝒕𝒐 𝒂 𝒒𝒖𝒆 𝒕𝒆 𝒖𝒏𝒂𝒔 𝒂𝒍 𝒈𝒓𝒖𝒑𝒐 𝒑𝒓𝒊𝒏𝒄𝒊𝒑𝒂𝒍 𝒅𝒆𝒍 𝒃𝒐𝒕.\n\n${gp1}`, false, {mentions: [m.sender]});
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
