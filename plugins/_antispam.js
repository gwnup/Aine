let handler = m => m;

handler.before = async function (m) {
    if (!m) return;

    let users = global.db.data.users || {};
    let chats = global.db.data.chats || {};

    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chats[m.chat]?.isBanned) return;
    if (!m.text.startsWith('.') && !m.text.startsWith('#') && !m.text.startsWith('!') && !m.text.startsWith('/') && !m.text.startsWith('\/')) return;
    if (users[m.sender]?.banned) return;

    this.spam = this.spam || {};

    if (!(m.sender in this.spam)) {
        this.spam[m.sender] = {
            count: 0,
            lastspam: 0
        };
    }

    this.spam[m.sender].count++;

    if (this.spam[m.sender].count >= 2 && Date.now() - this.spam[m.sender].lastspam <= 4000) {
        if (users[m.sender]) {
            users[m.sender].banned = true;
        }

        m.reply('*乂 Spam Command Terdeteksi!*\n\nSilakan Tunggu 5 Detik Untuk Menggunakan Command Kembali');

        let detik = 5000;
        let now = Date.now();

        if (now < users[m.sender]?.lastBanned) users[m.sender].lastBanned = now + detik;
        else users[m.sender].lastBanned += detik;

        this.spam[m.sender].count = 0;
    }

    this.spam[m.sender].lastspam = Date.now();
};

module.exports = handler;
