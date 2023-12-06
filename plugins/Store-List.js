/**
 * Jangan Di Hapus!!
 * 
 * Buatan @FokusDotId (Fokus ID)
 * Github: https://github.com/fokusdotid
 * 
 * Ingin bikin fitur tapi tidak bisa coding?
 * hubungi: https://wa.me/6281320170984
 * 
 */

/**let handler = async (m, { conn, usedPrefix }) => {
	let store = global.db.data.chats[m.chat].store;
	if (!('store' in db.data.chats[m.chat])) store = []
	if (!store[0]) throw `Belum ada list store di grup ini.\nuntuk menambahkan ketik *${usedPrefix}addlist*`;
	let row = []
	for (let i of store) {
		if (i.id == m.chat) row.push({
			title: i.key,
			rowId: i.key
		})
	}
	let name = await conn.getName(m.chat) || ''
	let msg = {
		buttonText: 'LIST STORE',
		text: '\nberikut ini adalah daftar store yg ada di grup ini.',
		footer: wm,
		sections: [{
			title: name, rows: row,
		}]
	}
	conn.sendMessage(m.chat, msg, { quoted: m })
}
handler.help = ["liststore"]
handler.tags = ["store"]
handler.command = /^list(store)?$/i
handler.group = true

module.exports = handler**/



let handler = async (m, { conn, usedPrefix }) => {
    let store = global.db.data.chats[m.chat].store || [];
    
    if (!store[0]) {
        throw `Belum ada daftar toko di grup ini. Untuk menambahkan, ketik *${usedPrefix}addstore*`;
    }
    
    let row = store
        .filter(store => store.id == m.chat)
        .map(store => store.key)
        .join('\n');
    
    let groupName = await conn.getName(m.chat) || '';
    let timestamp = new Date().toLocaleString();
    
    let text = `Selamat Datang Di *${groupName}*\n\n📆 ${timestamp}\n\nUntuk Melihat List\nKetik *Tulisan* dibawah ini\n--------------------------------------\n${row}`;

    m.reply(text);
}

handler.help = ["liststore"];
handler.tags = ["store"];
handler.command = /^list(store)?$/i;
handler.group = true;

module.exports = handler;
