let handler = m => m;

handler.before = async function (m) {
    if (!m) return;

    let users = global.db.data.users || {};
    let chats = global.db.data.chats || {};

    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chats[m.chat]?.isBanned) return;

    // Ensure that this.spam is defined
    this.spam = this.spam || {};

    if (!(m.sender in this.spam)) {
        this.spam[m.sender] = {
            count: 0,
            lastspam: 0
        };
    }

    // Check if the text starts with ., #, or /
    if (!/^(\.|#|\/)/.test(m.text)) return;

    this.spam[m.sender].count++;

    if (this.spam[m.sender].count >= 2 && Date.now() - this.spam[m.sender].lastspam <= 4000) {
        if (users[m.sender]) {
            users[m.sender].banned = true;
            users[m.sender].lastBanned = Date.now() + 5000; // Ban user for 5 seconds
        }

        m.reply('*乂 Spam Command Terdeteksi!*\n\nSilakan Tunggu 5 Detik Untuk Menggunakan Command Kembali');

        this.spam[m.sender].count = 0;
    }

    if (users[m.sender]?.banned && Date.now() > users[m.sender].lastBanned) {
        users[m.sender].banned = false; // Reset ban status after 5 seconds
    }

    this.spam[m.sender].lastspam = Date.now();
};

module.exports = handler;
