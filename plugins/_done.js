const fs = require('fs');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const petik = '```';

// Use moment-timezone to get the current time in the 'Asia/Jakarta' timezone
const waktu = moment().tz('Asia/Jakarta');

const tampilTanggal = waktu.format('dddd DD MMMM YYYY');
const tampilWaktu = 'Jam : ' + waktu.format('HH:mm:ss');
let tampilHari = '';

// Determine the time of day
if (waktu.hours() >= 0 && waktu.hours() < 3) {
  tampilHari = 'Malam';
} else if (waktu.hours() < 12) {
  tampilHari = 'Pagi';
} else if (waktu.hours() < 18) {
  tampilHari = 'Siang';
} else {
  tampilHari = 'Sore';
}

const handler = async (m, { conn, usedPrefix: _p, args, command, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  if (!who) throw 'Reply pesannya';
  m.reply(`「 TRANSAKSI BERHASIL」
${petik}
📆 TANGGAL : ${tampilTanggal}
⌚ JAM     : ${tampilWaktu} WIB
✨ STATUS  : Berhasil

Pesanan @${m.quoted.sender.split('@')[0]} Berhasil!${petik}`);
}

handler.help = ['d <reply cht nya>'];
handler.tags = ['store'];
handler.customPrefix = /^(done|d)$/i;
handler.group = true;
handler.admin = true;
handler.command = new RegExp;

module.exports = handler;
