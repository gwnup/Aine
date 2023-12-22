let handler = async m => {
    const titik = '```';
    m.reply(`*Pricelist Harga Panel⚡RIFQII STORE* :
*_SUDAH TERSEDIA PM2_*
${titik}Otomatis bot auto restart jika mati${titik}

⚡PAKET R1
1GB RAM/1GB Disk/35% CPU
Rp 2.500/1 BULAN
⚡PAKET R2
2GB RAM/2GB Disk/65% CPU
Rp5.000,00/1 BULAN
⚡PAKET R3
3GB RAM/3GB Disk/95% CPU
Rp7.500,00/1 BULAN
⚡PAKET R4
4GB RAM/4GB Disk/125% CPU
Rp10.000,00/1 BULAN
⚡PAKET R5
5GB RAM/5GB Disk/155% CPU
Rp12.500,00/1 BULAN
⚡PAKET R6
6GB RAM/6GB Disk/175% CPU
Rp15.000.00/1 BULAN
⚡PAKET VIP
UNLIMITED RAM/UNLIMITED DISK/UNLIMITED CPU
Rp10.000.00/1 BULAN
*( PROMO! )*
⚡PAKET ADMIN
BISA CREATE PANEL SEPUASNYA
Rp15.000.00/1 BULAN
*( PROMO! )*
---------------------------------------------

*KEUNTUNGAN*
- Tidak boros kuota & memori
- Bisa run 24 JAM
- Website di close bot tetap jalan

Minat? Chat: wa.me/6283852843517?text=buy+panel
LINK GRUP: https://bit.ly/LinkGcBot

*_📍BERGARANSI FULL 30 HARI_*`.trim());
};

handler.help = ['panel'];
handler.tags = ['info'];
handler.command = /^panel$/i;

module.exports = handler;
