/**let fetch = require("node-fetch")
let handler = async (m, { conn }) => {
  let res = await fetch(global.API('https://some-random-api.ml', '/meme'))
  await m.reply(global.wait)
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if (!json.image) throw 'Err!'
  conn.sendFile(m.chat, json.image, 'meme.png', json.caption, m)
}

handler.help = ['meme']
handler.tags = ['random']
handler.register = false
handler.command = /^(meme)$/i
handler.limit = false
handler.group = true

module.exports = handler**/

let fetch = require("node-fetch")
let handler = async (m, { conn, text }) => {
let putra = await fetch('https://raw.githubusercontent.com/HasamiAini/wabot_takagisan/main/whatsapp%20bot%20takagisan/whatsapp%20bot%20takagisan/lib/memeindo.json')
let json = await putra.json();
let url = json[Math.floor(Math.random() * json.length)]
await conn.sendFile(m.chat, url.image, 'file.jpg', wm, m)
}
handler.help = ['meme']
handler.tags = ['random']
handler.register = false
handler.command = /^(meme)$/i
handler.limit = false
handler.group = true
module.exports = handler