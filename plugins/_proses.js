let fs = require('fs');
let fetch = require('node-fetch');
let moment = require('moment-timezone');
let petik = '```';

// Use moment-timezone to get the current time in your desired timezone
let waktu = moment().tz('Asia/Jakarta');

var tampilTanggal = waktu.format('dddd DD MMMM YYYY');
var tampilWaktu = 'Jam : ' + waktu.format('HH:mm:ss');
var tampilHari = '';

if (waktu.hours() >= 0 && waktu.hours() < 3) {
  tampilHari = 'Malam';
} else if (waktu.hours() < 12) {
  tampilHari = 'Pagi';
} else if (waktu.hours() < 18) {
  tampilHari = 'Siang';
} else {
  tampilHari = 'Sore';
}

let handler = async (m, { conn, usedPrefix: _p, args, command, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  if (!who) throw 'Reply pesannya';
  m.reply(`「 TRANSAKSI PENDING」
${petik}
📆 TANGGAL : ${tampilTanggal}
⌚ JAM     : ${tampilWaktu} WIB
✨ STATUS  : Pending

Pesanan @${m.quoted.sender.split('@')[0]} sedang diproses!${petik}`);
};

handler.help = ['p <reply cht nya>'];
handler.tags = ['store'];
handler.customPrefix = /^(proses|p)$/i;
handler.group = true;
handler.admin = true;
handler.command = new RegExp;

module.exports = handler;
