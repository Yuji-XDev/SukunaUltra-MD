import axios from 'axios';
import FormData from 'form-data';
import cheerio from 'cheerio';

const modelos = {
  glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
  narutotext: 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html',
  dragonball: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
  neonlight: 'https://en.ephoto360.com/neon-light-text-effect-online-882.html',
  pubglogo: 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html',
  harrypotter: 'https://en.ephoto360.com/create-harry-potter-text-effect-online-853.html',
  marvel: 'https://en.ephoto360.com/create-marvel-studios-logo-style-text-effect-online-710.html',
  pixelglitch: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
  amongustext: 'https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html',
  writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
  typographytext: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
  neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
  flag3dtext: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
  deletingtext: 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
  blackpinkstyle: 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
  glowingtext: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
  underwatertext: 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html',
  logomaker: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
  cartoonstyle: 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html',
  papercutstyle: 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
  watercolortext: 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html',
  effectclouds: 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html',
  blackpinklogo: 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
  gradienttext: 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
  summerbeach: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html',
  luxurygold: 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
  multicoloredneon: 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html',
  sandsummer: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html',
  galaxywallpaper: 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html',
  style: 'https://en.ephoto360.com/1917-style-text-effect-523.html',
  makingneon: 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html',
  royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html',
  freecreate: 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html',
  galaxystyle: 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html',
  rainytext: 'https://en.ephoto360.com/foggy-rainy-text-effect-75.html',
  graffititext: 'https://en.ephoto360.com/graffiti-color-199.html',
  equalizertext: 'https://en.ephoto360.com/music-equalizer-text-effect-259.html',
  angeltxt: 'https://en.ephoto360.com/angel-wing-effect-329.html',
  starlight: 'https://en.ephoto360.com/stars-night-online-1-85.html',
  steel: 'https://en.ephoto360.com/steel-text-effect-online-843.html',
  neoncity: 'https://en.ephoto360.com/neon-city-text-effect-online-803.html',
  cloudsky: 'https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html',
  matrix: 'https://en.ephoto360.com/matrix-text-effect-154.html',
  minion: 'https://en.ephoto360.com/create-minions-text-effect-online-858.html',
  firetext: 'https://en.ephoto360.com/create-awesome-fire-text-effect-online-877.html',
  icecold: 'https://en.ephoto360.com/create-ice-cold-text-effect-online-870.html',
  rainbowtext: 'https://en.ephoto360.com/create-rainbow-shine-text-effect-online-874.html',
  sandwriting: 'https://en.ephoto360.com/write-in-wet-sand-text-effect-online-878.html'
};

async function ephoto(url, text) {
  const getPage = await axios.get(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64)...',
    }
  });

  const $ = cheerio.load(getPage.data);
  const token = $('input[name=token]').val();
  const buildServer = $('input[name=build_server]').val();
  const buildServerId = $('input[name=build_server_id]').val();

  if (!token || !buildServer || !buildServerId) return null;

  const form = new FormData();
  form.append('text[]', text);
  form.append('token', token);
  form.append('build_server', buildServer);
  form.append('build_server_id', buildServerId);

  const submit = await axios({
    url,
    method: 'POST',
    data: form,
    headers: {
      'Accept': '*/*',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64)...',
      'cookie': getPage.headers['set-cookie']?.join(' '),
      ...form.getHeaders()
    }
  });

  const $2 = cheerio.load(submit.data);
  const jsonResult = JSON.parse($2('#form_value_input').val() || '{}');
  if (!jsonResult || !jsonResult.image) return null;

  jsonResult.text[] = jsonResult.image;
  delete jsonResult.image;

  const result = await axios.post('https://en.ephoto360.com/effect/create-image', new URLSearchParams(jsonResult), {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0 Win64 x64)...',
      'cookie': getPage.headers['set-cookie'].join(' ')
    }
  });

  if (!result.data || !result.data.image) return null;
  return buildServer + result.data.image;
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `*❗ Ingresa un texto*\n*Ejemplo:* ${usedPrefix + command} TuTexto`, m, fake);

  m.reply('*⏳ Creando tu logo, espera...*');
  const url = modelos[command.toLowerCase()];
  if (!url) return m.reply(`*❗ Modelo de texto no encontrado:* ${command}`);

  try {
    const result = await ephoto(url, text);
    if (!result) throw new Error('No se pudo generar la imagen. Puede que el efecto cambió o la web está protegida.');
    await conn.sendMessage(m.chat, { image: { url: result } }, { quoted: m });
  } catch (e) {
    console.error('Error ephoto:', e);
    await m.reply(`❌ Error generando el logo. Puede que el efecto ya no esté disponible o la web esté protegida.\n*Detalles:* ${e.message || e}`);
  }
};

handler.help = Object.keys(modelos);
handler.tags = ['ephoto'];
handler.command = handler.help;

export default handler;