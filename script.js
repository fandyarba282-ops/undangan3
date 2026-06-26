// ==========================================
// 1. FITUR OTOMATIS MEMBACA NAMA TAMU DARI URL (?to=Nama+Tamu)
// ==========================================
const parameterURL = new URLSearchParams(window.location.search);
const namaTamu = parameterURL.get('to');

if (namaTamu) {
    // Mengubah tanda "+" atau "%20" menjadi spasi normal
    document.getElementById('nama-tamu-di-cover').innerText = decodeURIComponent(namaTamu.replace(/\+/g, ' '));
}

// VARIABEL BANTUAN UNTUK MEMORI MUSIK
let waktuPutarTerakhir = 0;
const namaFileMusik = 'musik.mp3'; // Pastikan nama file musik Anda sesuai

// ==========================================
// 2. LOGIKA TOMBOL BUKA UNDANGAN & AUDIO
// ==========================================
document.getElementById('tombol-buka').addEventListener('click', function() {
    const lagu = document.getElementById('audio-wedding');
    lagu.play().catch(function(error) {
        console.log("Pemutaran musik otomatis tertahan keamanan browser.", error);
    });

    document.getElementById('cover-undangan').classList.add('fade-out');
    document.getElementById('konten-utama').classList.remove('hidden');
    document.body.style.overflow = 'auto'; // Buka kunci scroll
});

// ==========================================
// 3. LOGIKA DETEKSI SCROLL UNTUK ELEMEN ANIMASI MUNCUL
// ==========================================
const pengintaiAnimasi = new IntersectionObserver((daftarElemen) => {
    daftarElemen.forEach((isiElemen) => {
        if (isiElemen.isIntersecting) {
            isiElemen.target.classList.add('active'); 
        }
    });
}, {
    threshold: 0.1 
});

const semuaBagianUndangan = document.querySelectorAll('.reveal');
semuaBagianUndangan.forEach((bagian) => {
    pengintaiAnimasi.observe(bagian);
});


// ==========================================
// 4. PERBAIKAN TOTAL: LENYAPKAN POP-UP NOTIFIKASI MUSIK DI HP
// ==========================================
document.addEventListener('visibilitychange', function() {
    const lagu = document.getElementById('audio-wedding');
    const kontenUtama = document.getElementById('konten-utama');
    const sudahBukaUndangan = !kontenUtama.classList.contains('hidden');

    // JIKA TAMU KELUAR DARI WEB (MINIMIZE / PINDAH TAB / KUNCI HP)
    if (document.hidden) {
        // Musik hanya diproses jika statusnya sedang berputar
        if (sudahBukaUndangan && !lagu.paused) {
            waktuPutarTerakhir = lagu.currentTime; // 1. Catat detik terakhir musik berjalan
            lagu.src = '';                         // 2. Hapus sumber musik (INI YANG BIKIN POP-UP DI HP LENYAP!)
            lagu.load();                           // 3. Reset sistem audio browser
        }
    } 
    // JIKA TAMU KEMBALI MASUK KE WEBSITE UNDANGAN
    else {
        // Musik otomatis menyala lagi jika sebelumnya undangan sudah dibuka
        if (sudahBukaUndangan && waktuPutarTerakhir > 0) {
            lagu.src = namaFileMusik;              // 1. Pasang kembali file musiknya
            lagu.load();                           // 2. Muat ulang filenya ke browser
            lagu.currentTime = waktuPutarTerakhir; // 3. Lompat kembali ke detik terakhir tadi
            lagu.play().catch(function(error) {
                console.log("Musik otomatis tertahan saat kembali ke tab:", error);
            });
        }
    }
});