// ==========================================
// 1. FITUR OTOMATIS MEMBACA NAMA TAMU DARI URL (?to=Nama+Tamu)
// ==========================================
const parameterURL = new URLSearchParams(window.location.search);
const namaTamu = parameterURL.get('to');

if (namaTamu) {
    // Mengubah tanda "+" atau "%20" di link WhatsApp menjadi spasi normal
    document.getElementById('nama-tamu-di-cover').innerText = decodeURIComponent(namaTamu.replace(/\+/g, ' '));
}

// ==========================================
// 2. LOGIKA TOMBOL BUKA UNDANGAN & AUDIO
// ==========================================
document.getElementById('tombol-buka').addEventListener('click', function() {
    
    // Putar musik secara otomatis
    const lagu = document.getElementById('audio-wedding');
    lagu.play().catch(function(error) {
        console.log("Pemutaran musik otomatis tertahan keamanan browser, butuh interaksi pengguna.", error);
    });

    // Hilangkan halaman Cover depan (efek memudar)
    document.getElementById('cover-undangan').classList.add('fade-out');

    // Munculkan konten utama undangan
    document.getElementById('konten-utama').classList.remove('hidden');

    // Buka kunci scroll agar tamu bisa menggeser layar ke bawah
    document.body.style.overflow = 'auto';
});

// ==========================================
// 3. LOGIKA DETEKSI SCROLL UNTUK ELEMEN ANIMASI MUNCUL
// ==========================================
const pengintaiAnimasi = new IntersectionObserver((daftarElemen) => {
    daftarElemen.forEach((isiElemen) => {
        // Jika elemen sudah masuk ke area layar HP tamu sebanyak 10%
        if (isiElemen.isIntersecting) {
            isiElemen.target.classList.add('active'); // Memicu efek animasi CSS berjalan
        }
    });
}, {
    threshold: 0.1 // Kepekaan deteksi (0.1 = 10% elemen muncul di layar)
});

// Ambil semua bagian halaman yang dipasangi kelas 'reveal'
const semuaBagianUndangan = document.querySelectorAll('.reveal');

// Daftarkan semua bagian halaman tersebut ke radar pengintai
semuaBagianUndangan.forEach((bagian) => {
    pengintaiAnimasi.observe(bagian);
});