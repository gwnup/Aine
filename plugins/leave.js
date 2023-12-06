let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner, groupMetadata }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    await conn.delay(1000)
    let res = await conn.groupleave(code)
    m.reply(`Berhasil Keluar grup ${res}`)//
}
//handler.help = ['join <chat.whatsapp.com>']
//handler.tags = ['premium']


handler.help = ['leavel <link group>']
handler.tags = ['owner']
handler.command = /^leavel$/i
handler.owner = true
module.exports = handler