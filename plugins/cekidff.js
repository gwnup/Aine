/**let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `uhm.. id nya mana?\n\ncontoh:\n${usedPrefix + command} 1906651269`
  let res = await fetch(global.API('xteam', '/search/freefire', { id: args[0] }, 'APIKEY'))
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.status) throw json
  m.reply(json.result.name)
}
handler.help = ['epep'].map(v => v + ' <id>')
handler.tags = ['store']
handler.command = /^(freefire|epep)$/i

module.exports = handler**/

let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `uhm.. id nya mana?\n\ncontoh:\n${usedPrefix + command} 1906651269`
  let res = await fetch `https://danzzapi.xyz/api/stalker/nickff?id=${args}[0]&apikey=danzz`
  if (!res.ok) throw eror
  let json = await res.json()
  if (!json.status) throw json
  m.reply(json.result.nickname)
}
handler.help = ['epep'].map(v => v + ' <id>')
handler.tags = ['store']
handler.command = /^(freefire|epep)$/i

module.exports = handler