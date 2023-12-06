/*
Made by Aine
*/

const axios = require('axios')
let handler = async(m, { conn, text }) => {

  await m.reply('Searching...')
	let res = await fetch(`https://api.botcahx.live/api/story/cerpen?type=kehidupan&apikey=Gv6IRh5V`)
let data = await res.json()
let json = data.result
let cerita = json.cerita
m.reply(m.chat, cerita, m)
	
}
handler.help = ['cerpen']
handler.tags = ['internet']
handler.command = /^cerpen$/i
handler.limit = true

module.exports = handler
