const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
const yts = require('yt-search')
var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Judulnya?`
  m.reply(`wait`)
  let search = await yts(text)
  let vid = search.videos[Math.floor(Math.random() * search.videos.length)]
  if (!search) throw 'Tidak Ditemukan'
  let { title, thumbnail, timestamp, views, ago, url } = vid

  let captvid = `╭──── 〔 Y O U T U B E 〕
• Judul: ${title}

• Durasi: ${timestamp}

• Views: ${views}

• Upload: ${ago}

• Link: ${url}

• Note: Untuk Video Ketik .ytv Masukan Link Atas

• Contoh: .ytv ${url}
╰────────⬣`
conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid }, m)
const yt = await await youtubedlv2(url).catch(async _ => await youtubedl(url)).catch(async _ => await youtubedlv3(url))
const link = await yt.audio['128kbps'].download()
  let doc = { 
  audio: 
  { 
    url: link 
}, 
mimetype: 'audio/mp4', fileName: `${title}`, contextInfo: { externalAdReply: { showAdAttribution: true,
mediaType:  2,
mediaUrl: url,
title: title,
body: wm,
sourceUrl: url,
thumbnail: await(await conn.getFile(thumbnail)).data
      }
    }
  }

  return conn.sendMessage(m.chat, doc, { quoted: m })
}
handler.help = ['play', 'play2'].map(v => v + ' <search>')
handler.tags = ['downloader']
handler.command = /^play2?$/i
handler.premium = false
handler.group = true

handler.exp = 0
handler.limit = true

module.exports = handler