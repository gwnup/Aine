const moment = require('moment-timezone');
const handler = m => m;

handler.before = async function (m) {
    if (m.chat.endsWith('broadcast') || m.key.remoteJid.endsWith('broadcast')) return;
    if (m.fromMe) return;
    if (m.isGroup) return;

    const user = global.db.data.users[m.sender];
    const { banned } = db.data.users[m.chat];
    const username = conn.getName(m.sender);

    if (new Date() - user.pc < 86400000) return; // setiap 24 jam sekali

    const waktuSapaan = ucapan();

    const pesan = banned
        ? `Hai ${waktuSapaan} *${username.replace(/@.+/, '')}*,
Kamu *Terbanned* Kak 
Hubungi: wa.me/${owner[0]}`
        : `Hai ${waktuSapaan} *${username.replace(/@.+/, '')}*, 

Salam Sejahtera,

Terima kasih telah menghubungi layanan kami. Kami siap membantu Anda dengan pertanyaan atau permintaan apa pun. Silakan berikan kami informasi lebih lanjut atau sampaikan pesan Anda, dan kami akan dengan senang hati memberikan bantuan terbaik kami.

*Jika Ingin Sewa Bot Silahkan Ketik #sewa*

Terima kasih atas kepercayaan Anda kepada kami.

Salam Hormat,
*${global.namaowner}*`;

    await this.reply(m.chat, pesan.trim(), m);
    user.pc = new Date() * 1;
};

module.exports = handler;

function ucapan() {
    const hour_now = moment.tz('Asia/Jakarta').format('HH');
    let ucapanWaktu = 'Pagi kak';

    if (hour_now >= '03' && hour_now <= '10') {
        ucapanWaktu = 'Pagi kak';
    } else if (hour_now >= '10' && hour_now <= '15') {
        ucapanWaktu = 'Siang kak';
    } else if (hour_now >= '15' && hour_now <= '17') {
        ucapanWaktu = 'Sore kak';
    } else if (hour_now >= '17' && hour_now <= '18') {
        ucapanWaktu = 'Selamat Petang kak';
    } else if (hour_now >= '18' && hour_now <= '23') {
        ucapanWaktu = 'Malam kak';
    } else {
        ucapanWaktu = 'Selamat Malam!';
    }

    return ucapanWaktu;
}
