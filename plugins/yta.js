let yts = require('yt-search')
let ytdl = require('ytdl-core')

let handler = async (m, { conn, args }) => {
	if (ytdl.validateURL(args[0])) {
		let id = await ytdl.getVideoID(args[0]), vid = await yts({ videoId: id })
		let { thumbnail, title, description: desc, timestamp, views, uploadDate, ago, author: { name }} = vid
		await m.reply('Sedang diproses...')
		let caption = `*Title:* ${title}\n*Channel:* ${name}\n*Duration:* ${timestamp}\n*Upload Date:* ${uploadDate}\n*Views:* ${views}\n*Description:*\n${desc}`
		let repl = await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) ? 'document' : 'audio']: { url: `https://popcat.xyz/download?url=`+args[0]+`&filter=audio&filename=temp` }, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
		await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: repl })
    
    }
  else throw `Invalid URL`
}

handler.help = ['mp3'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
module.exports = handler