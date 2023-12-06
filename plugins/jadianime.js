const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

let handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
      conn.reply(m.chat, `Tunggu sebentar...`, m);

      const img = await q.download?.();
      if (!img) throw new Error('Gagal mengunduh gambar.');

      const out = await uploadImage(img);
      if (!out) throw new Error('Gagal mengunggah gambar.');
let old = new Date()
      const apiURL = `https://api.betabotz.org/api/maker/jadianime?url=${out}&apikey=B3O7WfgJ`;
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error('Gagal mengambil respons dari API.');

      const convert = await response.buffer();
      const buff = await fetch(JSON.parse(convert.toString()).result).then(res => res.buffer());

      conn.sendMessage(m.chat, {
        image: buff,
        caption: `🍟 *Fetching*: ${((new Date() - old) * 1)} ms`
      }, {
        quoted: m
      });
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`[ ! ] Terjadi kesalahan dalam proses.`);
  }
};


handler.help = ['jadianime'];
handler.tags = ['fun'];
handler.command = /^(jadianime)$/i;

module.exports = handler;


