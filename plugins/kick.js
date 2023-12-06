/**let handler = async m => m.reply(`
Fitur Kick Di hapus karena nomor bot rawan terkena banned
`.trim()) 
handler.help = ['kick']
handler.tags = ['group']
handler.command = /^(kick)$/i

module.exports = handler**/

const { areJidsSameUser } = require('@adiwajshing/baileys');

const handler = async (m, { conn, participants, isOwner }) => {
    // if (!isOwner) return m.reply('Maaf Fitur Ini Sementara Tidak Dapat Digunakan')
    let usr = m.quoted ? [m.quoted.sender] : m.mentionedJid;
    let users = usr.filter(u => !areJidsSameUser(u, conn.user.id));
    let kickedUser = [];

    for (let user of users) {
        if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            kickedUser = kickedUser.concat(res);
            await delay(1 * 1000);
        }
    }

    m.reply(`Succes Removing.${kickedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: kickedUser });
};

handler.help = ['kick'].map(v => v + ' @user');
handler.tags = ['group']
handler.command = /^(kick)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));