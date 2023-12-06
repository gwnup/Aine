let handler = async (m, { conn, text }) => {
  var number = isNaN(text) ? text.split`@`[1] : text;

  const format = num => {
    const n = String(num),
      p = n.indexOf('.');
    return n.replace(
      /\d(?=(?:\d{3})+(?:\.|$))/g,
      (m, i) => (p < 0 || i < p ? `${m},` : m)
    );
  };

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `Eh, kasih nomor atau tag target dong! 😅`, m);
  }

  if (isNaN(number)) {
    return conn.reply(m.chat, `Nomornya nggak valid nih, coba yang bener dong! 😕`, m);
  }

  if (number.length > 15) {
    return conn.reply(m.chat, `Eh, nomor terlalu panjang tuh! 🤔 Cek lagi deh!`, m);
  }

  try {
    var user = text
      ? number + '@s.whatsapp.net'
      : m.quoted.sender || number + '@s.whatsapp.net';
  } catch (e) {
  } finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    let participants = m.isGroup ? groupMetadata.participants : [];
    let users = m.isGroup ? participants.find(u => u.jid == user) : {};

    if (!user) {
      return conn.reply(
        m.chat,
        `Waduh, nomor atau target nggak ketemu nih. Udah keluar grup atau gimana? 🤔`,
        m
      );
    }

    if (user === m.sender) {
      return conn.reply(m.chat, `Nggak bisa, bro! Kamu kan nggak bisa punya bestie sama diri sendiri! 😂`, m);
    }

    if (user === conn.user.jid) {
      return conn.reply(m.chat, `Yaelah, masa bestie sama bot? Kreatif banget! 😜`, m);
    }

    if (global.db.data.users[user].pasangan !== m.sender) {
      conn.reply(
        m.chat,
        `Eits, @${
          user.split('@')[0]
        } lagi nggak nembak kamu nih. Sabar ya, tungguin dulu! 😉`,
        m,
        {
          contextInfo: {
            mentionedJid: [user],
          },
        }
      );
    } else {
      global.db.data.users[m.sender].pasangan = user;
      conn.reply(
        m.chat,
        `Selamat, bro! Kamu resmi punya bestie sama @${
          user.split('@')[0]
        }! 🥳 Semoga langgeng dan bahagia selalu ya! 😊`,
        m,
        {
          contextInfo: {
            mentionedJid: [m.sender, user],
          },
        }
      );
    }
  }
};

handler.help = ['terimabf *@tag*'];
handler.tags = ['bestfriend'];
handler.command = /^(terimabf)$/i;
handler.group = true;
handler.limit = true;
handler.fail = null;
module.exports = handler;
