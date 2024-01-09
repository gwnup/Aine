const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

// Array apikey langsung dalam kode
const apikey = [
  'tYs42efi',
  'Gv6IRh5V',
  'ItAuK9hk',
  'kyKZasyv',
  'Rh7Xj4JA',
  '2KOD4PvO',
  'hTKfNgSo',
];

// Fungsi untuk mendapatkan kunci acak dari array apikey
function getRandomApiKey() {
  return apikey[Math.floor(Math.random() * apikey.length)];
}

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    // Mengambil kunci acak
    const randomApiKey = getRandomApiKey();

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      const apiUrl = `https://api.botcahx.eu.org/api/tools/remini?url=${out}&apikey=${randomApiKey}`;
      const api = await fetch(apiUrl);
      const image = await api.json();
      const url = image.url;

      // Menampilkan loading
      const loadd = [
        '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
        '《████▒▒▒▒▒▒▒▒▒》30%',
        '《███████▒▒▒▒▒▒》50%',
        '《██████████▒▒▒》70%',
        '《█████████████》100%',
        '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...',
      ];

      const { key } = await conn.sendMessage(m.chat, { text: '_Loading_' });

      for (let i = 0; i < loadd.length; i++) {
        await conn.sendMessage(m.chat, { text: loadd[i], edit: key });
      }

      // Mengirim gambar
      conn.sendFile(m.chat, url, null, null, m);
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`Identifikasi gagal. Silakan coba lagi.`);
  }
}

handler.help = ['remini'];
handler.tags = ['tools'];
handler.command = ['remini'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
