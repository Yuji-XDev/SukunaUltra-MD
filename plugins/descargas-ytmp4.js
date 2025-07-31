import axios from 'axios'
import FormData from 'form-data'
import WebSocket from 'ws'
import cheerio from 'cheerio'
import crypto from 'crypto'
import yts from "yt-search"
import fs from 'fs'
import { get } from 'https'
import { createWriteStream } from 'fs'
import { promisify } from 'util'
const unlink = promisify(fs.unlink)

let handler = async (m, { conn, text, args }) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/(?:v|e(?:mbed)?)\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    if (!text || !youtubeRegex.test(text)) {
        return conn.reply(m.chat, `🌱 Uso correcto : ytmp4 https://youtube.com/watch?v=DLh9mnfZvc0`, m)
    }

    try {
        m.react('⏳')
        const search = await yts(args[0])
        const video = search.videos[0]
        if (!video || !video.url) return conn.reply(m.chat, `No se encontró el video.`, m)
        const isDoc = /doc$/.test(text)
        const cap = `
\`\`\`
⊜─⌈ 📻 ◜YouTube MP4◞ 📻 ⌋─⊜

≡ 🎵 Título : ${video.title}
≡ 📺 Canal : ${video.author.name}
≡ ⏳ Duración : ${video.timestamp}
≡ 👀 Vistas : ${video.views.toLocaleString()}
≡ 📅 Publicado : ${video.ago}
≡ 🔗 Enlace : ${video.url}
≡ 🌳 Calidad : ${args[1] || "360"}
\`\`\`
  ${footer}
`
        if (isDoc) m.reply(cap)
        const vid = await ytmp4(video.url, args[1] || "360")
        const path = `/tmp/${Date.now()}.mp4`
        await new Promise((resolve, reject) => {
            const file = createWriteStream(path)
            get(vid.dl_url, (res) => {
                res.pipe(file)
                file.on('finish', () => file.close(resolve))
                file.on('error', reject)
            }).on('error', reject)
        })
const stats = fs.statSync(path)
const sizeB = stats.size
const sizeMB = sizeB / (1024 * 1024)
const fDoc = sizeMB > 80
await conn.sendFile(m.chat, path, `${video.title}.mp4`, (isDoc || fDoc) ? "" : cap, m, null, {
    asDocument: isDoc || fDoc,
    mimetype: "video/mp4"
})
        await unlink(path)
        m.react('✅')
    } catch (error) {
        console.error(error)
        return conn.reply(m.chat, `Error al descargar el video.\n\n${error.message}`, m)
    }
}

handler.command = ["ytv", "ytmp4", "ytmp4doc"]
handler.help = ["ytmp4"]
handler.tags = ["download"]
export default handler

async function ytmp4(url, quality) {
  const base_url = 'https://amp4.cc'
  const headers = { Accept: 'application/json', 'User-Agent': 'Postify/1.0.0' }
  const cookies = {}

  const parse_cookies = (set_cookie_headers) => {
    if (set_cookie_headers) {
      set_cookie_headers.forEach((cookie) => {
        const [key_value] = cookie.split(';')
        const [key, value] = key_value.split('=')
        cookies[key] = value
      })
    }
  }

  const get_cookie_string = () =>
    Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')

  const client_get = async (url) => {
    const res = await axios.get(url, {
      headers: { ...headers, Cookie: get_cookie_string() }
    })
    parse_cookies(res.headers['set-cookie'])
    return res
  }

  const client_post = async (url, data, custom_headers = {}) => {
    const res = await axios.post(url, data, {
      headers: { ...headers, Cookie: get_cookie_string(), ...custom_headers }
    })
    parse_cookies(res.headers['set-cookie'])
    return res
  }

  const yt_regex = /^((?:https?:)?\/\/)?((?:www|m|music)\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?([a-zA-Z0-9_-]{11})/

  const hash_challenge = async (salt, number, algorithm) =>
    crypto.createHash(algorithm.toLowerCase()).update(salt + number).digest('hex')

  const verify_challenge = async (challenge_data, salt, algorithm, max_number) => {
    for (let i = 0; i <= max_number; i++) {
      if (await hash_challenge(salt, i, algorithm) === challenge_data) {
        return { number: i, took: Date.now() }
      }
    }
    throw new Error('Captcha verification failed')
  }

  const solve_captcha = async (challenge) => {
    const { algorithm, challenge: challenge_data, salt, maxnumber, signature } = challenge
    const solution = await verify_challenge(challenge_data, salt, algorithm, maxnumber)
    return Buffer.from(
      JSON.stringify({
        algorithm,
        challenge: challenge_data,
        number: solution.number,
        salt,
        signature,
        took: solution.took
      })
    ).toString('base64')
  }

  const connect_ws = async (id) => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`wss://amp4.cc/ws`, ['json'], {
        headers: { ...headers, Origin: `https://amp4.cc` },
        rejectUnauthorized: false
      })

      let file_info = {}
      let timeout_id = setTimeout(() => {
        ws.close()
      }, 30000)

      ws.on('open', () => ws.send(id))
      ws.on('message', (data) => {
        const res = JSON.parse(data)
        if (res.event === 'query' || res.event === 'queue') {
          file_info = {
            thumbnail: res.thumbnail,
            title: res.title,
            duration: res.duration,
            uploader: res.uploader
          }
        } else if (res.event === 'file' && res.done) {
          clearTimeout(timeout_id)
          ws.close()
          resolve({ ...file_info, ...res })
        }
      })
      ws.on('error', () => clearTimeout(timeout_id))
    })
  }

  try {
    const link_match = url.match(yt_regex)
    if (!link_match) throw new Error('Invalid YouTube URL')
    const fixed_url = `https://youtu.be/${link_match[3]}`
    const page_data = await client_get(`${base_url}/`)
    const $ = cheerio.load(page_data.data)
    const csrf_token = $('meta[name="csrf-token"]').attr('content')

    if (!isNaN(quality)) quality = `${quality}p`

    const form = new FormData()
    form.append('url', fixed_url)
    form.append('format', 'mp4')
    form.append('quality', quality)
    form.append('service', 'youtube')
    form.append('_token', csrf_token)

    const captcha_data = await client_get(`${base_url}/captcha`)
    if (captcha_data.data) {
      const solved_captcha = await solve_captcha(captcha_data.data)
      form.append('altcha', solved_captcha)
    }

    const res = await client_post(`${base_url}/convertVideo`, form, form.getHeaders())
    const ws = await connect_ws(res.data.message)
    const dlink = `${base_url}/dl/${ws.worker}/${res.data.message}/${encodeURIComponent(ws.file)}`

    return {
      title: ws.title || '-',
      uploader: ws.uploader,
      duration: ws.duration,
      quality,
      type: 'video',
      format: 'mp4',
      thumbnail: ws.thumbnail || `https://i.ytimg.com/vi/${link_match[3]}/maxresdefault.jpg`,
      dl_url: dlink
    }
  } catch (err) {
    throw Error(err.message)
  }
}


/*import fetch from "node-fetch";
import axios from 'axios';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `🌾 *Ingresa un link de YouTub'e*`, m, rcanal);
    }

    m.react('⏱️');

    let videoInfo, urlYt;

    const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(text);

    if (isYoutubeUrl) {
      const id = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^\s&]+)/)?.[1];
      if (!id) return m.reply(`⚠️ No se pudo extraer el ID del video.`);

      const result = await yts({ videoId: id });
      videoInfo = result;
      urlYt = text;
    } else {
      const search = await yts(text);
      if (!search?.videos?.length) {
        return conn.reply(m.chat, `⚠️ No se encontraron resultados para: *${text}*`, m);
      }
      videoInfo = search.videos[0];
      urlYt = videoInfo.url;
    }

    const {
      title = 'Sin título',
      timestamp = 'Desconocido',
      author = {},
      views = 0,
      ago = 'Desconocido',
      url = urlYt,
      thumbnail
    } = videoInfo;

    const canal = author.name || 'Desconocido';
    const vistas = views.toLocaleString('es-PE');

    const { data } = await axios.get(`https://dark-core-api.vercel.app/api/download/YTMP4?key=api&url=${url}`);
    if (!data?.status || !data?.data?.dl) {
      throw new Error("No se pudo obtener el enlace de descarga.");
    }

    const videoUrl = data.data.dl;
    const size = await getSize(videoUrl);
    const sizeStr = size ? await formatSize(size) : 'Desconocido';

    const textoInfo =
      ` ⬣ *🎲  \`YOUTUBE - MP4\` 🇦🇱* ⬣\n\n` +
      `> 📌 *𝑻𝒊𝒕𝒖𝒍𝒐:* ${title}\n` +
      `> ⏱️ *𝑫𝒖𝒓𝒂𝒄𝒊𝒐𝒏:* ${timestamp}\n` +
      `> 🧑‍🏫 *𝑪𝒂𝒏𝒂𝒍:* ${canal}\n` +
      `> 👁️ *𝑽𝒊𝒔𝒕𝒂𝒔:* ${vistas}\n` +
      `> 🗓️ *𝑷𝒖𝒃𝒍𝒊𝒄𝒂𝒅𝒐:* ${ago}\n` +
      `> 💾 *𝑻𝒂𝒎𝒂𝒏̃𝒐:* ${sizeStr}\n` +
      `> 🔗 *𝑳𝒊𝒏𝒌:* ${url}\n\n` +
      ` *➭ 𝑬𝒍 𝒗𝒊𝒅𝒆𝒐 𝒔𝒆 𝒆𝒔𝒕𝒂 𝒆𝒏𝒗𝒊𝒂𝒏𝒅𝒐, 𝑬𝒔𝒑𝒆𝒓𝒆 𝒖𝒏 𝒎𝒐𝒎𝒆𝒏𝒕𝒊𝒕𝒐 𝒐𝒏𝒊𝒄𝒉𝒂𝒏~ 🌸*`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: textoInfo,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401008003732@newsletter',
          newsletterName: '=͟͟͞𝑆𝑢𝑘𝑢𝑛𝑎 𝑈𝑙𝑡𝑟𝑎 • 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⌺',
          serverMessageId: -1
        }
      }
    }, { quoted: m });

    const videoBuffer = await fetch(videoUrl).then(res => res.buffer());
    await conn.sendFile(m.chat, videoBuffer, `${title}.mp4`, '\n🖍️ 𝑨𝒒𝒖𝒊 𝒕𝒊𝒆𝒏𝒆𝒔 𝒕𝒖 𝒗𝒊𝒅𝒆𝒐, 𝒐𝒏𝒊𝒄𝒉𝒂𝒏~ 🌸', fkontak);

    m.react('✅');

  } catch (e) {
    console.error(e);
    m.reply(`❌ Error inesperado:\n${e.message}`);
  }
};

handler.help = ['ytmp4 <link o nombre>'];
handler.command = ['ytmp4'];
handler.tags = ['descargas'];

export default handler;

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const response = await axios.head(url);
    return response.headers['content-length']
      ? parseInt(response.headers['content-length'], 10)
      : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}*/