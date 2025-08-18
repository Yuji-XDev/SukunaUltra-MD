import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("baileys")).default;

let handler = async (message, { conn, text }) => {
    if (!text) return conn.sendMessage(message.chat, { text: '[❗] ¿Qué quieres buscar en TikTok?' }, { quoted: message });
    
    try {
        const processingMsg = await conn.sendMessage(message.chat, { text: '*[🔍] Buscando en TikTok, espere...*' }, { quoted: message });
        let response = await tiktokSearch(text);
        if (!response.status) throw new Error(response.resultado);
        let searchResults = response.resultado;
        if (searchResults.length === 0) throw new Error('*[❗] No se encontraron videos válidos de tiktok.*');
        let selectedResults = getRandomElements(searchResults, Math.min(searchResults.length, 10));
        
        const BATCH_SIZE = 2;
        const RETRY_ATTEMPTS = 2;
        let videoMessages = [];
        let successfulCount = 0;
        for (let i = 0; i < selectedResults.length; i += BATCH_SIZE) {
            const batch = selectedResults.slice(i, i + BATCH_SIZE);
            for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
                try {
                    const batchMessages = await Promise.all(batch.map(result => createVideoMessage(result.videoUrl, conn) ));
                    videoMessages.push(...batchMessages);
                    successfulCount += batchMessages.length;
                    break; 
                } catch (batchError) {
                    if (attempt === RETRY_ATTEMPTS) {
                        console.error(`Error procesando lote ${i/BATCH_SIZE + 1}:`, batchError);
                    }
                }
            }
        }
        const validVideos = videoMessages.filter(Boolean);
        if (validVideos.length === 0) throw new Error('*[❗] No se pudieron cargar los videos.*');
        const results = validVideos.map((videoMessage, index) => ({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text: '' }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: `*❧ By ${global.wm}*`.trim() }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: selectedResults[index].description || "Video de TikTok",
                hasMediaAttachment: true,
                videoMessage: videoMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
        }));
        
        const responseMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ 
                            text: `*< TIKTOK SEARCH >*\n\n📌 *Texto buscado:* ${text}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ 
                            cards: results 
                        })
                    })
                }
            }
        }, { quoted: message });

        await conn.sendMessage(message.chat, { delete: processingMsg.key });
        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });
        
    } catch (error) {
        await conn.sendMessage(message.chat, { 
            text: `❌ Error: ${error.message}` 
