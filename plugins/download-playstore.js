import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {

    if (!args[0]) {
        console.log('Argumento vacío, enviando mensaje de ayuda');
        return conn.reply(m.chat, `*${xdownload} Ingresa un enlace de descarga de la PlayStore.*\n*> *\`Ejemplo:\`* ${prefix}playstore https://play.google.com/store/apps/details?id=com.whatsapp`, m);
    }

    m.react('⌛');

    const url = args[0];

    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m);
    }

    console.log(`ID de paquete: ${packageName}`);

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `*❌ No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m);
    }

    const h = info.title;
    console.log(`Título de la aplicación: ${h}\nID de la aplicación: ${info.appId}`);

    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
    m.react('✅️');

    conn.reply(m.chat, `*🚀 Se esta enviando \`${h}\` Aguarde un momento*`, m);
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['descargas'];
handler.command = /^(playstore)$/i;
export default handler;
