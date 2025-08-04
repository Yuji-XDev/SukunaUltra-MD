let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `🌾 *Uso correcto:* ${usedPrefix}${command} <enlace de canal/grupo/comunidad>`, m);
    }

    const channelRegex = /https:\/\/whatsapp\.com\/channel\/([0-9A-Za-z]+)/i;
    const groupRegex = /(https:\/\/chat\.whatsapp\.com\/)([0-9A-Za-z]{22})/i;
    const communityRegex = /https:\/\/whatsapp\.com\/community\/([0-9A-Za-z]+)/i;

    let matchChannel = text.match(channelRegex);
    let matchGroup = text.match(groupRegex);
    let matchCommunity = text.match(communityRegex);

    if (matchChannel) {
        const channelCode = matchChannel[1];
        try {
            const node = await conn.query({
                tag: "iq",
                attrs: {
                    type: "get",
                    xmlns: "w:newsletter",
                    to: `newsletter.${channelCode}@newsletter.whatsapp.net`,
                },
                content: [{ tag: "newsletter", attrs: {}, content: null }],
            });

            if (!node || !node.content || !node.content[0] || !node.content[0].attrs) {
                throw new Error("METADATA no encontrada");
            }

            const meta = node.content[0].attrs;
            const creationDate = new Date(Number(meta.creation || 0));
            const formattedDate = creationDate.toLocaleDateString("es-ES", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            let responseText = `
*╭┈┈┈「 🌿 Información del Canal 🌿 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${meta.name || 'No disponible'}
*┆ 🆔 ID:* ${channelCode}
*┆ 🗓️ Creado:* ${formattedDate}
*┆ 👤 Creador:* ${meta.creator ? `@${meta.creator.split('@')[0]}` : 'Desconocido'}
*┆ 🔗 Enlace:* https://whatsapp.com/channel/${channelCode}
*┆ ✅ Verificado:* ${meta.verified === "true" ? "Sí" : "No"}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
            `.trim();

            await conn.reply(m.chat, responseText, m, {
                mentions: meta.creator ? [meta.creator] : [],
            });
            m.react("✅");

        } catch (error) {
            console.error("Error al obtener información del canal:", error);
            await conn.reply(m.chat, `*Error al procesar la solicitud del canal:* No se pudo obtener la información. Detalle: ${error.message}`, m);
        }

    } else if (matchGroup) {
        const inviteCode = matchGroup[2];
        try {
            const groupInfo = await conn.groupMetadata(inviteCode);

            let responseText = `
*╭┈┈┈「 💬 Información del Grupo 💬 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${groupInfo.subject || 'No disponible'}
*┆ 🆔 ID:* ${groupInfo.id || 'No disponible'}
*┆ 👥 Miembros:* ${groupInfo.size || 0}
*┆ 👑 Creador:* ${groupInfo.owner ? `@${groupInfo.owner.split('@')[0]}` : 'No disponible'}
*┆*
*┆ 📄 Descripción:* ${groupInfo.desc || "Sin descripción disponible."}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
            `.trim();

            await conn.reply(m.chat, responseText, m, {
                mentions: groupInfo.owner ? [groupInfo.owner] : [],
            });
            m.react("✅");

        } catch (error) {
            console.error("Error al obtener información del grupo:", error);
            await conn.reply(m.chat, `*Error al procesar la solicitud del grupo:* No se pudo obtener la información. Detalle: ${error.message}`, m);
        }

    } else if (matchCommunity) {
        const communityId = matchCommunity[1];
        try {
            const communityInfo = await conn.communityMetadata(communityId);

            let responseText = `
*╭┈┈┈「 🏘️ Información de la Comunidad 🏘️ 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${communityInfo.name || 'No disponible'}
*┆ 🆔 ID:* ${communityInfo.id || 'No disponible'}
*┆ 👥 Miembros:* ${communityInfo.members?.length || 0}
*┆ 📄 Descripción:* ${communityInfo.description || "Sin descripción disponible."}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
            `.trim();

            await conn.reply(m.chat, responseText, m);
            m.react("✅");

        } catch (error) {
            console.error("Error al obtener información de la comunidad:", error);
            await conn.reply(m.chat, `*Error al procesar la solicitud de la comunidad:* No se pudo obtener la información. Detalle: ${error.message}`, m);
        }

    } else {
        return conn.reply(m.chat, `*Enlace inválido:* Por favor, proporciona un enlace de WhatsApp válido para un canal, grupo o comunidad.`, m);
    }
};

handler.command = ["inspeccionar", "channelinfo", "canalinfo", "groupinfo", "comunidadinfo"];
handler.help = ["infocanal <link>", "infogrupo <link>", "infocomunidad <link>"];
handler.tags = ["tools"];

export default handler;