const { Aki } = require('aki-api');
const fs = require('fs');

const handler = async (m, { conn, usedPrefix, command, args, isPrems }) => {
    conn.akinator = conn.akinator ? conn.akinator : {};

    switch (args[0]) {
        case 'end':
            if (!(m.sender in conn.akinator)) return m.reply('Kamu tidak sedang dalam sesi Akinator');
            delete conn.akinator[m.sender];
            m.reply('Berhasil keluar dari sesi Akinator.');
            break;

        case 'start':
            if (m.sender in conn.akinator) return conn.reply(m.chat, 'Kamu masih berada dalam sesi Akinator', m);
            conn.akinator[m.sender] = new Aki({ region: 'id' });
            await conn.akinator[m.sender].start();

            let { question } = conn.akinator[m.sender];
            let txt = `🎮 *Akinator Game* 🎮\n\n@${m.sender.split('@')[0]}\n${question}\n\n`;
            txt += '🎮 _*Jawab dengan:*_\n';
            txt += `_*Ya* - ${usedPrefix}answer 0_\n`;
            txt += `_*Tidak* - ${usedPrefix}answer 1_\n`;
            txt += `_*Tidak Tahu* - ${usedPrefix}answer 2_\n`;
            txt += `_*Mungkin* - ${usedPrefix}answer 3_\n`;
            txt += `_*Mungkin Tidak* - ${usedPrefix}answer 4_\n\n`;
            txt += `Ketik *${usedPrefix + command} end* untuk keluar dari sesi Akinator`;

            conn.akinator[m.sender].chat = await conn.reply(m.chat, txt, m, { mentions: [m.sender] });
            conn.akinator[m.sender].waktu = setTimeout(() => {
                conn.reply(m.chat, `Waktu memilih Akinator habis.`, conn.akinator[m.sender].chat);
                delete conn.akinator[m.sender];
            }, 60000);
            break;

        default:
            let cap = 'Akinator adalah permainan yang mencoba menebak pikiran pemain melalui serangkaian pertanyaan.\n\n';
            cap += '🎮 _*Cara Bermain:*_\n';
            cap += `${usedPrefix + command} start ~ Mulai permainan\n`;
            cap += `${usedPrefix + command} end ~ Keluar dari permainan\n`;
            cap += `${usedPrefix}answer ~ Jawab pertanyaan`;
            return conn.reply(m.chat, cap, m.sender in conn.akinator ? 'Kamu masih dalam sesi Akinator' : '', '', fs.readFileSync('./media/akinator.jpg'), '', m);
    }
};

handler.help = ['akinator'];
handler.tags = ['game', 'premium'];
handler.command = /^(akinator)$/i;
handler.limit = true;
handler.premium = true
module.exports = handler;
