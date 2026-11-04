import React, { useState, useEffect, useRef } from 'react';

// Enum 11 Halaman Game
const PAGES = {
    PAGE_1_COVER: 1,
    PAGE_2_HUB: 2,
    PAGE_3_ZONA_1: 3,
    PAGE_4_GAMEOVER: 4,
    PAGE_5_ZONA_1_SUCCESS: 5,
    PAGE_6_ZONA_2: 6,
    PAGE_7_ZONA_2_SUCCESS: 7,
    PAGE_8_ZONA_3: 8,
    PAGE_9_ZONA_3_SUCCESS: 9,
    PAGE_10_ZONA_4: 10,
    PAGE_11_VICTORY: 11
};

const ZONE_TIME_LIMIT = 45; // 45 Detik per zona

// =========================================================================
// DATA POOLS: KASUS BERAGAM DENGAN NILAI PENDIDIKAN BERKARAKTER
// =========================================================================
const ZONE_CASES = {
    zone1: [
        {
            id: 'z1_c1',
            title: 'Hadiah Saldo E-Wallet Palsu',
            sender: '+62 821-9988-7711 (Kontak Asing)',
            platform: 'WhatsApp',
            message: 'Selamat! Kamu menang saldo E-Wallet Rp500.000 dari Telkomsel. Klaim di http://bit.(ly)/hadiah-klaim-2026',
            options: [
                {
                    label: 'Klik Tautan Hadiah',
                    isCorrect: false,
                    fallout: {
                        headline: 'AKUN TERPERETAS & SALDO TERKURAS!',
                        impact: 'Tautan bit.ly mencuri token autentikasi akunmu. Peretas menguras saldo e-wallet dan mengakses daftar kontak ponselmu.',
                        moralLesson: 'Nilai Integritas: Jangan mudah tergiur oleh iming-iming uang instan tanpa kerja keras dan sumber yang dapat dipertanggungjawabkan.'
                    }
                },
                {
                    label: 'Laporkan & Blokir Nomor',
                    isCorrect: true
                }
            ],
            infoEdu: 'Ciri Phishing: Menggunakan domain pendek (bit./ly), iming-iming instan, dan berasal dari nomor pribadi.',
            hint: 'Perhatikan alamat tautan pendek yang disamarkan dan kejanggalan nomor pribadi yang mengaku mewakili perusahaan resmi.',
            characterBadge: {
                name: 'Integritas & Kewaspadaan',
                icon: 'fa-shield-halved',
                desc: 'Mampu menolak iming-iming instan dan cermat mendeteksi penipuan siber.'
            },
            reflection: 'Mengapa rasa serakah sering dimanfaatkan penipu siber? Bagaimana integritas menjagamu dari jebakan dunia digital?'
        },
        {
            id: 'z1_c2',
            title: 'Undangan Lomba Berformat File APK',
            sender: '+62 858-4455-9900 (Panitia Palsu)',
            platform: 'WhatsApp',
            message: 'Halo! Sekolahmu terpilih menjadi finalis Olimpiade Sains Pelajar 2026. Unduh surat resmi & petunjuk teknis lomba: Undangan_Resmi_Olimpiade.apk',
            options: [
                {
                    label: 'Unduh & Pasang File APK',
                    isCorrect: false,
                    fallout: {
                        headline: 'SPYWARE MALWARE MENYUSUP!',
                        impact: 'Aplikasi berbahaya tersebut menyadap seluruh SMS perbankan, OTP, serta kamera ponsel secara diam-diam.',
                        moralLesson: 'Nilai Kehati-hatian: Instansi pendidikan resmi selalu menggunakan dokumen PDF/portal web resmi, bukan file instalasi aplikasi (.apk).'
                    }
                },
                {
                    label: 'Hapus File & Laporkan ke Guru Pembina',
                    isCorrect: true
                }
            ],
            infoEdu: 'Waspada Ekstensi File: Lembaga resmi tidak pernah membagikan surat edaran dalam format aplikasi instalasi (.apk).',
            hint: 'Surat edaran atau pengumuman seharusnya berbentuk dokumen (.pdf), bukan berkas installer aplikasi Android (.apk).',
            characterBadge: {
                name: 'Integritas & Kewaspadaan',
                icon: 'fa-shield-halved',
                desc: 'Cermat memeriksa integritas format file dan tidak ceroboh memasang aplikasi asing.'
            },
            reflection: 'Bagaimana kehati-hatian dalam menerima file digital mencerminkan tanggung jawab kita terhadap keamanan perangkat keluarga?'
        },
        {
            id: 'z1_c3',
            title: 'Bantuan Kuota Kemendikbud Tiruan',
            sender: 'Pesan Berantai WhatsApp',
            platform: 'WhatsApp Siaran',
            message: 'PROGRAM SUBSIDI SISWA 2026: Dapatkan kuota gratis 50GB Kemendikbud! Daftarkan nomor HP dan password Google Belajarmu di http://kemendikbud-subsidi.xyz',
            options: [
                {
                    label: 'Buka Web & Isi Data Akun Google',
                    isCorrect: false,
                    fallout: {
                        headline: 'KREDENSIAL AKUN BELAJAR DICURI!',
                        impact: 'Data akun Google Belajar siswa disusupi. Tugas, berkas ujian, dan kontak guru di Google Drive tersandera peretas.',
                        moralLesson: 'Nilai Kritis: Domain pemerintah Indonesia selalu berakhiran resmi .go.id, bukan domain asing seperti .xyz.'
                    }
                },
                {
                    label: 'Abaikan & Cek Pengumuman Resmi Sekolah',
                    isCorrect: true
                }
            ],
            infoEdu: 'Ciri Situs Palsu: Situs resmi kementerian selalu menggunakan ekstensi domain .go.id, bukan domain umum/murahan (.xyz, .top, .online).',
            hint: 'Situs resmi pemerintah Indonesia wajib menggunakan domain resmi .go.id. Verifikasi pengumuman melalui wali kelas.',
            characterBadge: {
                name: 'Integritas & Kewaspadaan',
                icon: 'fa-shield-halved',
                desc: 'Mengutamakan verifikasi ke sumber resmi sebelum mempercayai informasi bantuan.'
            },
            reflection: 'Mengapa seorang pelajar berkarakter harus selalu mengonfirmasi informasi bantuan sebelum membagikannya?'
        }
    ],

    zone2: [
        {
            id: 'z2_c1',
            title: 'Ketahanan Racikan Kata Sandi Instagram',
            platform: 'Instagram Security Center',
            message: 'Peretas mencoba meretas akun Instagram-mu. Pilih racikan kata sandi yang paling aman:',
            options: [
                {
                    label: 'budi12345',
                    isCorrect: false,
                    fallout: {
                        headline: 'KATA SANDI JEBOL VIA BRUTE FORCE!',
                        impact: 'Kata sandi lemah berhasil ditebak dalam waktu kurang dari 1 detik oleh bot peretas menggunakan teknik kamus data (dictionary attack).',
                        moralLesson: 'Nilai Disiplin & Tanggung Jawab: Jangan menggunakan nama panggilan atau urutan angka berurutan yang mudah ditebak untuk mengamankan identitas digitalmu.'
                    }
                },
                {
                    label: 'K3t1k#Aman2026!',
                    isCorrect: true
                }
            ],
            infoEdu: 'Password kuat minimal 12 karakter, kombinasi huruf besar-kecil, angka, dan simbol. Aktifkan 2FA agar ada verifikasi OTP!',
            hint: 'Kata sandi yang kuat menggabungkan huruf besar, huruf kecil, angka, dan simbol khusus dengan panjang minimal 12 karakter.',
            characterBadge: {
                name: 'Disiplin & Tanggung Jawab',
                icon: 'fa-key',
                desc: 'Disiplin menjaga pintu gerbang akses digital dengan standar keamanan tinggi.'
            },
            reflection: 'Menjaga kata sandi adalah bentuk tanggung jawab diri. Mengapa kita tidak boleh menyepelekan keamanan akun pribadi?'
        },
        {
            id: 'z2_c2',
            title: 'Praktik Penggunaan Satu Password untuk Semua Akun',
            platform: 'Audit Keamanan Akun Siswa',
            message: 'Kamu memiliki akun Instagram, Mobile Legends, Email Sekolah, dan Toko Online. Bagaimana strategi kata sandi terbaikmu?',
            options: [
                {
                    label: 'Pakai 1 kata sandi yang sama di semua akun agar tidak lupa',
                    isCorrect: false,
                    fallout: {
                        headline: 'EFEK DOMINO: SEMUA AKUN DIBOBOL!',
                        impact: 'Ketika satu situs bocor datanya (data breach), peretas menggunakan kombinasi email & sandi tersebut untuk membobol seluruh akun media sosial dan perbankanmu.',
                        moralLesson: 'Nilai Tanggung Jawab Digital: Memisahkan kata sandi antarakun adalah langkah preventif mencegah kerugian menyeluruh.'
                    }
                },
                {
                    label: 'Gunakan kata sandi unik & berbeda untuk tiap akun + aktifkan 2FA',
                    isCorrect: true
                }
            ],
            infoEdu: 'Hindari Credential Stuffing: Jika satu layanan bocor, peretas akan mencoba kata sandi yang sama di semua platform lain yang kamu miliki.',
            hint: 'Jangan menyamakan kata sandi akun penting dengan akun game atau forum hiburan.',
            characterBadge: {
                name: 'Disiplin & Tanggung Jawab',
                icon: 'fa-key',
                desc: 'Menerapkan manajemen sandi unik dan mengaktifkan proteksi ganda.'
            },
            reflection: 'Bagaimana keteraturan dan ketelitian dalam mengelola akun mencerminkan kepribadian yang tertib?'
        }
    ],

    zone3: [
        {
            id: 'z3_c1',
            title: 'Oversharing KTP & Kartu Pelajar di Media Sosial',
            platform: 'InstaStory Publik',
            message: 'Temanmu mengunggah foto Kartu Pelajar dan KTP di InstaStory secara publik. Apa risikonya?',
            options: [
                {
                    label: 'Bahaya! NIK & data pribadi bisa disalahgunakan untuk pinjol ilegal',
                    isCorrect: true
                },
                {
                    label: 'Aman saja, kan cuma untuk konten seru-seruan',
                    isCorrect: false,
                    fallout: {
                        headline: 'IDENTITAS DICURI SIKLUS PINJOL ILEGAL!',
                        impact: 'Sindikat kejahatan siber menggunakan NIK, tanggal lahir, dan foto KTP temanmu untuk mengajukan pinjaman online ilegal. Kontak keluarga diteror penagih utang.',
                        moralLesson: 'Nilai Kepedulian & Empati: Identitas pribadi adalah data sakral. Kita wajib saling mengingatkan teman untuk tidak oversharing demi keselamatan bersama.'
                    }
                }
            ],
            infoEdu: 'Lindungi NIK & Identitas: Nomor Induk Kependudukan (NIK), foto KTP, dan Kartu Pelajar tidak boleh disebarkan secara terbuka karena merupakan kunci verifikasi perbankan.',
            hint: 'Pikirkan data apa saja yang tercantum di KTP: NIK, nama lengkap, tanggal lahir, dan alamat. Data tersebut bernilai tinggi bagi sindikat penipu.',
            characterBadge: {
                name: 'Empati & Menjaga Privasi',
                icon: 'fa-user-shield',
                desc: 'Peduli terhadap keamanan data pribadi diri sendiri dan melindungi teman sebaya.'
            },
            reflection: 'Mengapa menjaga data pribadi bukan hanya urusan diri sendiri, tetapi juga melindungi ketenteraman keluarga dan teman?'
        },
        {
            id: 'z3_c2',
            title: 'Pamer Tiket Konser dengan Barcode Terbuka',
            platform: 'Postingan Feed Instagram',
            message: 'Temanmu sangat gembira berhasil membeli tiket konser musik dan memamerkan fotonya ke medsos dengan barcode & nomor booking jelas terlihat. Sikapmu?',
            options: [
                {
                    label: 'Ingatkan teman untuk menghapus foto atau menyensor kode barcode',
                    isCorrect: true
                },
                {
                    label: 'Biarkan saja dan ikut memberi tanda suka (like) agar terlihat keren',
                    isCorrect: false,
                    fallout: {
                        headline: 'TIKET DIGANDAKAN & DIBATALKAN!',
                        impact: 'Orang asing di internet menyalin barcode tiket tersebut dan masuk ke arena konser lebih awal. Temanmu ditolak di pintu masuk karena tiket sudah hangus terpakai.',
                        moralLesson: 'Nilai Sahabat Sejati & Kepedulian: Sahabat yang baik berani menegur dan mengingatkan kekeliruan temannya demi kebaikan.'
                    }
                }
            ],
            infoEdu: 'Bahaya Barcode/QR Code: Kode batang pada tiket konser, tiket pesawat, atau bukti reservasi memuat kode otentikasi unik yang dapat digandakan orang lain.',
            hint: 'Barcode dan nomor reservasi (PNR) berisi data rahasia pemegang tiket yang mudah diduplikasi jika dipajang di ruang publik.',
            characterBadge: {
                name: 'Empati & Menjaga Privasi',
                icon: 'fa-user-shield',
                desc: 'Berani bertindak proaktif menegur teman demi melindunginya dari tindak kriminal.'
            },
            reflection: 'Apakah keinginan untuk pamer di media sosial sebanding dengan risiko kehilangan keamanan data kita?'
        }
    ],

    zone4: [
        {
            id: 'z4_c1',
            title: 'Pesan Berantai Hoaks Kebocoran Gas Sekolah',
            platform: 'Grup WhatsApp Kelas',
            message: 'Ada pesan berantai di grup kelas: "Besok sekolah diliburkan karena kebocoran gas, sebar ke 10 grup!". Tindakanmu?',
            options: [
                {
                    label: 'Cek kebenaran di grup resmi/tanya wali kelas sebelum sebar',
                    isCorrect: true
                },
                {
                    label: 'Langsung sebar ke grup lain agar cepat tahu',
                    isCorrect: false,
                    fallout: {
                        headline: 'KEPANIKAN MASSAL & NAMA SEKOLAH TERCEMAR!',
                        impact: 'Berita bohong menyebar ke grup orang tua murid. Ratusan wali murid panik mendatangi sekolah, mengganggu ketertiban umum dan mencoreng reputasi sekolah.',
                        moralLesson: 'Nilai Kebijaksanaan & Kejujuran: Saring sebelum membagikan (sharing). Menahan diri dari menyebarkan kabar yang belum tentu benar adalah wujud kecerdasan emosional.'
                    }
                }
            ],
            infoEdu: 'Saring Sebelum Sharing: Ciri khas hoaks adalah kalimat provokatif, desakan untuk menyebarkan ke grup lain, dan ketiadaan konfirmasi dari otoritas resmi sekolah.',
            hint: 'Informasi libur sekolah atau keadaan darurat hanya dikeluarkan secara sah oleh Kepala Sekolah atau Wali Kelas melalui kanal komunikasi resmi.',
            characterBadge: {
                name: 'Kebijaksanaan & Kejujuran',
                icon: 'fa-brain',
                desc: 'Bijak menyaring informasi dan berpegang pada fakta valid sebelum menyebarkan berita.'
            },
            reflection: 'Bagaimana kebiasaan mengonfirmasi fakta membentuk diri kita menjadi pribadi yang jujur dan dapat dipercaya?'
        },
        {
            id: 'z4_c2',
            title: 'Video Deepfake AI Suara Kepala Sekolah',
            platform: 'Media Sosial Sekolah',
            message: 'Beredar rekaman suara mirip Kepala Sekolah yang meminta setiap siswa mentransfer uang kas darurat sebesar Rp100.000 ke nomor rekening pribadi. Tindakanmu?',
            options: [
                {
                    label: 'Segera konfirmasi ke wali kelas dan pihak sekolah sebelum bertindak',
                    isCorrect: true
                },
                {
                    label: 'Langsung transfer dan ajak teman-teman lain ikut mengirimkan uang',
                    isCorrect: false,
                    fallout: {
                        headline: 'KERUGIAN FINANSIAL SISWA MASSIF!',
                        impact: 'Rekaman tersebut merupakan hasil tiruan suara kecerdasan buatan (AI Voice Cloning). Uang siswa masuk ke rekening penipu dan tidak bisa dikembalikan.',
                        moralLesson: 'Nilai Berpikir Kritis di Era AI: Jangan mudah percaya pada audio atau video manipulatif tanpa dokumen administrasi sekolah yang bertanda tangan resmi.'
                    }
                }
            ],
            infoEdu: 'Waspada Deepfake AI: Teknologi kecerdasan buatan kini dapat meniru suara dan wajah seseorang secara sangat meyakinkan untuk memeras uang.',
            hint: 'Pungutan resmi sekolah selalu melalui surat edaran berkop dinas dengan rekening institusi, tidak pernah melalui nomor rekening perorangan secara mendadak.',
            characterBadge: {
                name: 'Kebijaksanaan & Kejujuran',
                icon: 'fa-brain',
                desc: 'Kritis menghadapi ancaman manipulasi teknologi kecerdasan buatan (AI) generasi baru.'
            },
            reflection: 'Di era kemajuan AI saat ini, mengapa integritas moral dan daya nalar kritis menjadi benteng utama perlindungan kita?'
        }
    ]
};

export default function App() {
    const [currentPage, setCurrentPage] = useState(PAGES.PAGE_1_COVER);
    const [agentName, setAgentName] = useState('');
    const [agentSchool, setAgentSchool] = useState('');

    // --- VALIDASI NAMA UNIK ---
    const [nameCheckStatus, setNameCheckStatus] = useState(null); // null | 'checking' | 'available' | 'taken'
    const [nameCheckMessage, setNameCheckMessage] = useState('');
    const nameCheckTimer = useRef(null);

    // --- LEADERBOARD STATE ---
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardList, setLeaderboardList] = useState([]);
    const [leaderboardLoading, setLeaderboardLoading] = useState(false);

    // --- LEADERBOARD ADMIN / PENGELOLA STATE ---
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [adminPinInput, setAdminPinInput] = useState('');
    const [showAdminPinPrompt, setShowAdminPinPrompt] = useState(false);
    const [adminPinError, setAdminPinError] = useState('');

    // --- ZONA STATUS & KELENGKAPAN (COMPLETED ZONES) ---
    const [unlockedZones, setUnlockedZones] = useState({
        zone1: true,   // Default Unlocked
        zone2: false,  // Kode: 404
        zone3: false,  // Kode: 999
        zone4: false   // Kode: 2FA2026
    });

    const [completedZones, setCompletedZones] = useState({
        zone1: false,
        zone2: false,
        zone3: false,
        zone4: false
    });

    const [zoneScores, setZoneScores] = useState({
        zone1: null,
        zone2: null,
        zone3: null,
        zone4: null
    });

    // Pilihan Indeks Kasus per Zona (Random / Terpilih)
    const [selectedCases, setSelectedCases] = useState({
        zone1: 0,
        zone2: 0,
        zone3: 0,
        zone4: 0
    });

    // Sistem Skor & Waktu
    const [totalScore, setTotalScore] = useState(0);
    const [totalTimeUsed, setTotalTimeUsed] = useState(0);
    const [timeLeft, setTimeLeft] = useState(ZONE_TIME_LIMIT);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // Sistem Integritas Perisai / 3 Nyawa
    const [shieldHp, setShieldHp] = useState(3);
    const [isCriticalFailure, setIsCriticalFailure] = useState(false);

    // Modal State
    const [activeModal, setActiveModal] = useState(null); // 'info_edu', 'hint_consultant', 'passcode_prompt', 'zone_completed_notice'
    const [completedNoticeData, setCompletedNoticeData] = useState(null);
    const [passcodeTargetZone, setPasscodeTargetZone] = useState(null);
    const [passcodeInput, setPasscodeInput] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    // Layar Fallout / Dampak Realistis
    const [falloutData, setFalloutData] = useState(null);

    // Koleksi Lencana Karakter yang Berhasil Diklaim
    const [earnedBadges, setEarnedBadges] = useState([]);

    // Deteksi jika seluruh 4 zona telah berhasil diselesaikan
    const allZonesCompleted = completedZones.zone1 && completedZones.zone2 && completedZones.zone3 && completedZones.zone4;

    // -----------------------------------------------------------------
    // VALIDASI NAMA UNIK: cek ke backend /api/check-name
    // -----------------------------------------------------------------
    const checkNameUniqueness = async (name) => {
        if (!name || name.trim().length < 2) {
            setNameCheckStatus(null);
            setNameCheckMessage('');
            return;
        }
        setNameCheckStatus('checking');
        try {
            const res = await fetch(`/api/check-name?name=${encodeURIComponent(name.trim())}`);
            const data = await res.json();
            setNameCheckStatus(data.available ? 'available' : 'taken');
            setNameCheckMessage(data.message);
        } catch {
            setNameCheckStatus(null);
            setNameCheckMessage('');
        }
    };

    // -----------------------------------------------------------------
    // EFFECT: TIMER HITUNG MUNDUR 45 DETIK
    // -----------------------------------------------------------------
    useEffect(() => {
        let timer = null;
        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (isTimerActive && timeLeft === 0) {
            setIsTimerActive(false);
            // Waktu habis memicu kegagalan analisa
            handleTimeoutFailure();
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isTimerActive, timeLeft]);

    // Helper untuk mendeteksi halaman simulasi zona aktif
    const getCurrentZoneKey = () => {
        if (currentPage === PAGES.PAGE_3_ZONA_1) return 'zone1';
        if (currentPage === PAGES.PAGE_6_ZONA_2) return 'zone2';
        if (currentPage === PAGES.PAGE_8_ZONA_3) return 'zone3';
        if (currentPage === PAGES.PAGE_10_ZONA_4) return 'zone4';
        return null;
    };

    // Mulai / Hentikan Timer saat berpindah halaman
    useEffect(() => {
        const zoneKey = getCurrentZoneKey();
        if (zoneKey) {
            // Jika zona belum selesai, aktifkan timer 45 detik
            if (!completedZones[zoneKey]) {
                setTimeLeft(ZONE_TIME_LIMIT);
                setIsTimerActive(true);
            } else {
                setIsTimerActive(false);
            }
        } else {
            setIsTimerActive(false);
        }
    }, [currentPage]);

    // Timeout Failure Handler
    const handleTimeoutFailure = () => {
        const zoneKey = getCurrentZoneKey();
        const returnPage = currentPage;
        handleWrongChoice({
            headline: 'WAKTU ANALISIS HABIS (TIMEOUT)!',
            impact: 'Waktu 45 detik terlampaui tanpa aksi nyata. Keterlambatan respon memungkinkan peretas BlackByte membobol sistem pertahanan sekolah.',
            moralLesson: 'Nilai Ketepatan & Kecepatan: Ancaman siber bergerak cepat. Pelajar tanggap harus mampu berpikir kritis namun tegas mengambil tindakan.'
        }, returnPage);
    };

    // -----------------------------------------------------------------
    // LEADERBOARD FETCH & SUBMIT
    // -----------------------------------------------------------------
    const fetchLeaderboard = async () => {
        setLeaderboardLoading(true);
        try {
            const res = await fetch('/api/leaderboard');
            const data = await res.json();
            if (data.leaderboard) {
                setLeaderboardList(data.leaderboard);
            }
        } catch (err) {
            console.warn('Gagal fetch leaderboard, menggunakan cache lokal jika ada');
        } finally {
            setLeaderboardLoading(false);
        }
    };

    const openLeaderboard = () => {
        fetchLeaderboard();
        setShowLeaderboard(true);
    };

    const handleVerifyAdminPin = () => {
        if (adminPinInput.trim() === 'guru2026') {
            setIsAdminMode(true);
            setShowAdminPinPrompt(false);
            setAdminPinError('');
        } else {
            setAdminPinError('PIN Pengajar salah! (Default: guru2026)');
        }
    };

    const handleDeleteLeaderboardEntry = async (entry) => {
        if (!window.confirm(`Hapus agen "${entry.username}" dari daftar Leaderboard?`)) return;
        try {
            const res = await fetch(`/api/leaderboard/${encodeURIComponent(entry.id || entry.username)}?pin=${encodeURIComponent(adminPinInput || 'guru2026')}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: adminPinInput || 'guru2026' })
            });
            const data = await res.json();
            if (data.success) {
                fetchLeaderboard();
            } else {
                alert(data.error || 'Gagal menghapus data.');
            }
        } catch {
            alert('Terjadi kesalahan saat menghapus data.');
        }
    };

    const handleResetAllLeaderboard = async () => {
        if (!window.confirm('PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA data leaderboard? Tindakan ini tidak dapat dibatalkan.')) return;
        try {
            const res = await fetch('/api/leaderboard/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: adminPinInput || 'guru2026' })
            });
            const data = await res.json();
            if (data.success) {
                fetchLeaderboard();
            } else {
                alert(data.error || 'Gagal mereset leaderboard.');
            }
        } catch {
            alert('Terjadi kesalahan saat mereset data.');
        }
    };

    const submitScoreToLeaderboard = async (finalScore, finalTime) => {
        try {
            await fetch('/api/leaderboard/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: agentName,
                    school: agentSchool,
                    totalScore: finalScore,
                    timeTakenSeconds: finalTime,
                    badges: earnedBadges.map(b => b.name)
                })
            });
            fetchLeaderboard();
        } catch (err) {
            console.warn('Gagal submit skor ke leaderboard:', err);
        }
    };

    // -----------------------------------------------------------------
    // GAMEPLAY FLOW & ZONA HANDLERS
    // -----------------------------------------------------------------
    const randomizeCases = () => {
        setSelectedCases({
            zone1: Math.floor(Math.random() * ZONE_CASES.zone1.length),
            zone2: Math.floor(Math.random() * ZONE_CASES.zone2.length),
            zone3: Math.floor(Math.random() * ZONE_CASES.zone3.length),
            zone4: Math.floor(Math.random() * ZONE_CASES.zone4.length)
        });
        setShieldHp(3);
        setIsCriticalFailure(false);
        setEarnedBadges([]);
        setTotalScore(0);
        setTotalTimeUsed(0);
        setCompletedZones({ zone1: false, zone2: false, zone3: false, zone4: false });
        setZoneScores({ zone1: null, zone2: null, zone3: null, zone4: null });
    };

    const handleResetToHome = () => {
        setUnlockedZones({ zone1: true, zone2: false, zone3: false, zone4: false });
        randomizeCases();
        setCurrentPage(PAGES.PAGE_1_COVER);
    };

    const handleVerifyPasscode = (zoneKey, code, targetPage) => {
        const passcodes = {
            zone2: '404',
            zone3: '999',
            zone4: '2FA2026'
        };

        const trimmedCode = code.trim();
        if (passcodes[zoneKey] && trimmedCode.toUpperCase() === passcodes[zoneKey].toUpperCase()) {
            setUnlockedZones(prev => ({ ...prev, [zoneKey]: true }));
            setPasscodeError('');
            setActiveModal(null);
            setPasscodeInput('');
            setCurrentPage(targetPage);
        } else {
            setPasscodeError('Kode salah! Periksa kembali petunjuk sandi dari misi sebelumnya.');
        }
    };

    // KETENTUAN 3: KETIKA USER MENGKLIK ZONA DI PETA MISI
    const handleZoneClick = (zoneKey, targetPage, zoneTitle) => {
        // Jika zona telah selesai diselesaikan -> TAMPILKAN POP UP & CEGAH MASUK
        if (completedZones[zoneKey]) {
            const scoreData = zoneScores[zoneKey] || { score: 1000, timeUsed: 20 };
            const nextPasscodeMap = {
                zone1: { nextZone: 'Zona 2: Password Vault', code: '404' },
                zone2: { nextZone: 'Zona 3: Social Privacy', code: '999' },
                zone3: { nextZone: 'Zona 4: Hoax Lab', code: '2FA2026' },
                zone4: null
            };
            setCompletedNoticeData({
                title: zoneTitle,
                score: scoreData.score,
                timeUsed: scoreData.timeUsed,
                nextPasscode: nextPasscodeMap[zoneKey]
            });
            setActiveModal('zone_completed_notice');
            return;
        }

        // Jika zona sudah terbuka aksesnya
        if (unlockedZones[zoneKey]) {
            setCurrentPage(targetPage);
        } else {
            // Jika masih terkunci, minta kode password
            setPasscodeTargetZone({ zoneKey, targetPage });
            setPasscodeInput('');
            setPasscodeError('');
            setActiveModal('passcode_prompt');
        }
    };

    // Handler Keputusan Salah
    const handleWrongChoice = (fallout, returnPage) => {
        setIsTimerActive(false);

        if (shieldHp <= 0) {
            setIsCriticalFailure(true);
            setFalloutData({
                headline: 'MISI GAGAL TOTAL: PERTAHANAN SEKOLAH JEBOL!',
                impact: 'Seluruh 3 lapisan perisai keamananmu telah habis dan kesalahan berikutnya membuat peretas BlackByte berhasil mengambil alih server sekolah secara penuh. Jaringan sekolah terkunci total.',
                moralLesson: 'Nilai Kedisiplinan & Konsistensi: Dalam keamanan siber, kelengahan berulang tanpa evaluasi akan berakibat fatal. Kamu harus mengatur ulang strategi dari awal.',
                returnPage: PAGES.PAGE_1_COVER
            });
        } else {
            setIsCriticalFailure(false);
            setShieldHp(prev => prev - 1);
            setFalloutData({
                ...fallout,
                returnPage
            });
        }
        setCurrentPage(PAGES.PAGE_4_GAMEOVER);
    };

    // Handler Sukses Menyelesaikan Zona
    const handleZoneSuccess = (zoneKey, successPage) => {
        setIsTimerActive(false);

        // KETENTUAN 1: SISTEM POIN & HITUNG WAKTU
        // Semakin sedikit waktu yang digunakan (banyak sisa waktu), semakin banyak poin didapat
        const timeSpent = Math.max(1, ZONE_TIME_LIMIT - timeLeft);
        const speedBonus = timeLeft * 30; // 30 poin per sisa detik
        const earnedScore = 1000 + speedBonus; // Base 1000 + Speed Bonus

        const newTotalScore = totalScore + earnedScore;
        const newTotalTime = totalTimeUsed + timeSpent;

        setTotalScore(newTotalScore);
        setTotalTimeUsed(newTotalTime);

        // Catat skor dan tandai zona SELESAI (COMPLETED)
        setZoneScores(prev => ({
            ...prev,
            [zoneKey]: { score: earnedScore, timeUsed: timeSpent }
        }));
        setCompletedZones(prev => ({
            ...prev,
            [zoneKey]: true
        }));

        // Tambahkan Lencana Karakter
        const currentCase = ZONE_CASES[zoneKey][selectedCases[zoneKey]];
        if (currentCase.characterBadge) {
            setEarnedBadges(prev => {
                if (!prev.find(b => b.name === currentCase.characterBadge.name)) {
                    return [...prev, currentCase.characterBadge];
                }
                return prev;
            });
        }

        // Jika ini Zona 4 (selesai seluruh misi), otomatis kirim ke leaderboard
        if (zoneKey === 'zone4') {
            submitScoreToLeaderboard(newTotalScore, newTotalTime);
        }

        setCurrentPage(successPage);
    };

    const currentCaseZ1 = ZONE_CASES.zone1[selectedCases.zone1];
    const currentCaseZ2 = ZONE_CASES.zone2[selectedCases.zone2];
    const currentCaseZ3 = ZONE_CASES.zone3[selectedCases.zone3];
    const currentCaseZ4 = ZONE_CASES.zone4[selectedCases.zone4];

    return (
        <div className="min-h-screen text-slate-100 flex flex-col font-sans select-none bg-slate-950 w-full overflow-x-hidden">
            {/* Top Navigation Bar */}
            <header className="border-b border-cyan-900/60 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-600/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
                        <i className="fa-solid fa-shield-halved text-base sm:text-xl"></i>
                    </div>
                    <div>
                        <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-cyan-300 uppercase leading-none sm:leading-tight">
                            CyberShield Mission
                        </h1>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block">Pendidikan Berkarakter: Gen-Z Cyber Guardian</p>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                    {/* Skor Realtime */}
                    <div className="bg-slate-900/90 border border-cyan-500/30 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1.5 text-xs">
                        <i className="fa-solid fa-coins text-amber-400 text-[11px] sm:text-xs"></i>
                        <span className="font-mono font-bold text-amber-300 text-[11px] sm:text-xs">{totalScore.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 hidden md:inline">PTS</span>
                    </div>

                    {/* Indikator Perisai Integritas / Nyawa */}
                    <div className="bg-slate-900/90 border border-slate-800 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-xs" title="Integritas Perisai Keamanan">
                        {[1, 2, 3].map((heart) => (
                            <i
                                key={heart}
                                className={`fa-solid fa-shield text-[10px] sm:text-xs transition-colors duration-300 ${heart <= shieldHp ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]' : 'text-slate-700'
                                    }`}
                            ></i>
                        ))}
                    </div>

                    {/* Tombol Leaderboard */}
                    <button
                        onClick={openLeaderboard}
                        className="text-xs bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center gap-1 transition shadow hover:shadow-amber-500/20"
                        title="Papan Peringkat"
                    >
                        <i className="fa-solid fa-trophy text-amber-400 text-xs"></i>
                        <span className="hidden md:inline font-semibold text-xs">Peringkat</span>
                    </button>

                    {/* Navigasi Peta Misi */}
                    {currentPage !== PAGES.PAGE_1_COVER && (
                        <button
                            onClick={() => setCurrentPage(PAGES.PAGE_2_HUB)}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg flex items-center gap-1 transition shadow hover:shadow-cyan-500/20"
                            title="Kembali ke Peta Misi"
                        >
                            <i className="fa-solid fa-map-location-dot text-xs"></i>
                            <span className="hidden sm:inline text-xs">Peta</span>
                        </button>
                    )}

                    {/* Status Identitas Agen (Disembunyikan di layar mobile kecil agar navbar tidak meluap ke kanan) */}
                    <div className="hidden sm:flex bg-slate-900 border border-slate-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="font-mono text-cyan-400 font-semibold max-w-[80px] truncate">{agentName || 'Agent'}</span>
                    </div>

                    {/* Tombol Pintas Kembali ke Sertifikat jika Seluruh Zona Selesai */}
                    {allZonesCompleted && currentPage !== PAGES.PAGE_11_VICTORY && (
                        <button
                            onClick={() => setCurrentPage(PAGES.PAGE_11_VICTORY)}
                            className="text-xs bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 transition shadow shadow-amber-500/20 animate-pulse"
                            title="Buka Kembali Sertifikat Guardian"
                        >
                            <i className="fa-solid fa-award text-xs"></i>
                            <span className="hidden sm:inline text-xs">Sertifikat</span>
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col items-center justify-center px-3.5 py-4 sm:p-6 max-w-4xl w-full mx-auto">

                {/* ========================================================
                    HALAMAN 1: COVER & PRE-TEST
                ======================================================== */}
                {currentPage === PAGES.PAGE_1_COVER && (
                    <div className="w-full max-w-2xl bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden animate-fadeIn">
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="text-center mb-4 sm:mb-6">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3 animate-pulse">
                                <i className="fa-solid fa-triangle-exclamation"></i> Darurat Keamanan Siber Sekolah
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 mb-1.5 sm:mb-2 leading-snug">
                                CyberShield Mission: Gen-Z Cyber Guardian
                            </h2>
                            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                                "Sistem sekolah diretas! Isi formulir registrasi agen untuk memulai misi."
                            </p>
                        </div>

                        {/* Card Formulir Registrasi Siswa */}
                        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 sm:p-5 mb-4 sm:mb-6">
                            <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b border-slate-800 gap-2">
                                <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider truncate">
                                    <i className="fa-solid fa-clipboard-check shrink-0"></i>
                                    <span className="truncate">Form Registrasi Agen & Pre-Test Karakter</span>
                                </div>
                                <span className="text-[10px] sm:text-[11px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded shrink-0">
                                    Wajib
                                </span>
                            </div>

                            <div className="space-y-3.5 sm:space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Nama Lengkap Siswa / Alias Agen
                                    </label>
                                    <div className="relative">
                                        <i className="fa-solid fa-user-shield absolute left-3 top-3 text-slate-500 text-xs"></i>
                                        <input
                                            type="text"
                                            value={agentName}
                                            onChange={(e) => {
                                                setAgentName(e.target.value);
                                                clearTimeout(nameCheckTimer.current);
                                                nameCheckTimer.current = setTimeout(() => checkNameUniqueness(e.target.value), 600);
                                            }}
                                            placeholder="Contoh: Arya Guardian"
                                            className={`w-full bg-slate-900 border rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm text-cyan-200 focus:outline-none focus:ring-1 transition ${nameCheckStatus === 'taken'
                                                    ? 'border-red-500 focus:border-red-400 focus:ring-red-400'
                                                    : nameCheckStatus === 'available'
                                                        ? 'border-emerald-500 focus:border-emerald-400 focus:ring-emerald-400'
                                                        : 'border-slate-700 focus:border-cyan-400 focus:ring-cyan-400'
                                                }`}
                                        />
                                    </div>
                                    {/* Indikator Keunikan Nama */}
                                    {nameCheckStatus === 'checking' && (
                                        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
                                            <i className="fa-solid fa-spinner animate-spin text-cyan-400"></i>
                                            Memeriksa ketersediaan nama...
                                        </p>
                                    )}
                                    {nameCheckStatus === 'available' && (
                                        <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1.5">
                                            <i className="fa-solid fa-circle-check"></i>
                                            {nameCheckMessage}
                                        </p>
                                    )}
                                    {nameCheckStatus === 'taken' && (
                                        <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1.5">
                                            <i className="fa-solid fa-circle-xmark"></i>
                                            {nameCheckMessage}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        Kelas & Nama Sekolah
                                    </label>
                                    <div className="relative">
                                        <i className="fa-solid fa-school absolute left-3 top-3 text-slate-500 text-xs"></i>
                                        <input
                                            type="text"
                                            value={agentSchool}
                                            onChange={(e) => setAgentSchool(e.target.value)}
                                            placeholder="Contoh: Kelas 11 SMA Negeri 1"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm text-cyan-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                                        />
                                    </div>
                                </div>

                                {/* Petunjuk Simulasi Edukatif & Poin */}
                                <div className="mt-3 p-3 sm:p-3.5 bg-cyan-950/30 border border-dashed border-cyan-700/40 rounded-lg">
                                    <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold mb-1.5">
                                        <i className="fa-solid fa-stopwatch text-amber-400"></i>
                                        <span>Aturan Sistem Poin & Timer 45 Detik:</span>
                                    </div>
                                    <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                                        <li>Tiap zona memiliki <strong className="text-amber-300">Timer 45 Detik</strong>.</li>
                                        <li><strong className="text-emerald-300">Semakin cepat selesai</strong>, semakin banyak bonus poin yang diraih!</li>
                                        <li>Setiap zona yang telah berhasil diselesaikan akan terkunci permanen (*Completed*).</li>
                                        <li>Raih skor setinggi mungkin untuk bersaing di <strong className="text-cyan-300">Papan Peringkat (Leaderboard)</strong>!</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Interaktif Mulai */}
                        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                            <button
                                onClick={() => {
                                    randomizeCases();
                                    setCurrentPage(PAGES.PAGE_2_HUB);
                                }}
                                disabled={!agentName.trim() || nameCheckStatus === 'taken' || nameCheckStatus === 'checking'}
                                className={`flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transform active:scale-[0.99] transition duration-200 text-xs sm:text-sm ${(!agentName.trim() || nameCheckStatus === 'taken' || nameCheckStatus === 'checking')
                                        ? 'opacity-40 cursor-not-allowed'
                                        : ''
                                    }`}
                            >
                                <span>MULAI MISI SEKARANG</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>

                            <button
                                onClick={openLeaderboard}
                                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-bold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                            >
                                <i className="fa-solid fa-trophy"></i>
                                <span>Leaderboard</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 2: MAIN HUB / MISSION MAP
                ======================================================== */}
                {currentPage === PAGES.PAGE_2_HUB && (
                    <div className="w-full max-w-3xl animate-fadeIn">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 mb-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                                    Terminal Komando Utama
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                                PETA MISI: SEKTOR KEAMANAN
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">
                                Tuntaskan seluruh 4 zona untuk memperoleh kode dekripsi dan mengamankan integritas sekolah.
                            </p>
                        </div>

                        {/* BANNER OPSIONAL: KEMBALI KE SERTIFIKAT JIKA SELURUH ZONA TELAH SELESAI */}
                        {allZonesCompleted && (
                            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-emerald-950/40 border-2 border-amber-400/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-fadeIn">
                                <div className="flex items-center gap-3.5 text-center sm:text-left">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 shrink-0">
                                        <i className="fa-solid fa-award"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-extrabold text-amber-300 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                                            <span>SELURUH ZONA BERHASIL DIAMANKAN!</span>
                                            <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
                                        </h4>
                                        <p className="text-xs text-slate-300 mt-0.5">
                                            Sekolah telah aman dari BlackByte. Kamu dapat membuka kembali Sertifikat Gelar Master Cyber Guardian kapan saja.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setCurrentPage(PAGES.PAGE_11_VICTORY)}
                                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black px-5 py-3 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap shadow-amber-500/25 cursor-pointer"
                                >
                                    <i className="fa-solid fa-certificate text-sm"></i>
                                    <span>KEMBALI KE SERTIFIKAT</span>
                                </button>
                            </div>
                        )}

                        {/* Grid 4 Peta Zona */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {/* ZONA 1 */}
                            <div
                                onClick={() => handleZoneClick('zone1', PAGES.PAGE_3_ZONA_1, 'Zona 1: Phishing Zone')}
                                className={`group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${completedZones.zone1
                                        ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                                        : unlockedZones.zone1
                                            ? 'bg-slate-900/90 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                            : 'bg-slate-950/80 border-slate-800 opacity-60'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-transform ${completedZones.zone1
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                            : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105'
                                        }`}>
                                        <i className={completedZones.zone1 ? "fa-solid fa-circle-check" : "fa-solid fa-envelope-open-text"}></i>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${completedZones.zone1
                                            ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300'
                                            : 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
                                        }`}>
                                        {completedZones.zone1 ? 'STATUS: COMPLETED ✓' : 'STATUS: UNLOCKED'}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                                    <span>Zona 1: Phishing Zone</span>
                                    {zoneScores.zone1 && (
                                        <span className="text-xs text-amber-400 font-mono">+{zoneScores.zone1.score} pts</span>
                                    )}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Deteksi modus manipulasi pesan, iming-iming hadiah instan, dan tautan berbahaya.
                                </p>
                                {/* Reveal kode zona 2 jika zona 1 sudah selesai */}
                                {completedZones.zone1 && (
                                    <div className="mt-3 px-3 py-2 bg-cyan-950/50 border border-cyan-500/40 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                            <i className="fa-solid fa-key text-cyan-400 text-xs"></i>
                                            <span>Kode Zona 2:</span>
                                        </div>
                                        <span className="font-mono font-black text-cyan-300 text-sm tracking-widest">404</span>
                                    </div>
                                )}
                                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                                    <span className={completedZones.zone1 ? "text-emerald-400" : "text-cyan-400"}>
                                        {completedZones.zone1 ? 'Sektor Terlindungi' : 'Masuk Simulasi (45s)'}
                                    </span>
                                    <i className={`fa-solid ${completedZones.zone1 ? 'fa-lock text-emerald-400' : 'fa-chevron-right text-cyan-400 group-hover:translate-x-1'} transition-transform`}></i>
                                </div>
                            </div>

                            {/* ZONA 2 */}
                            <div
                                onClick={() => handleZoneClick('zone2', PAGES.PAGE_6_ZONA_2, 'Zona 2: Password Vault')}
                                className={`group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${completedZones.zone2
                                        ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                                        : unlockedZones.zone2
                                            ? 'bg-slate-900/90 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-transform ${completedZones.zone2
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                            : unlockedZones.zone2
                                                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105'
                                                : 'bg-slate-800/50 border border-slate-700 text-slate-500'
                                        }`}>
                                        <i className={completedZones.zone2 ? "fa-solid fa-circle-check" : unlockedZones.zone2 ? "fa-solid fa-lock-open" : "fa-solid fa-lock"}></i>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${completedZones.zone2
                                            ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300'
                                            : unlockedZones.zone2
                                                ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
                                                : 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
                                        }`}>
                                        {completedZones.zone2 ? 'STATUS: COMPLETED ✓' : unlockedZones.zone2 ? 'STATUS: UNLOCKED' : 'STATUS: LOCKED 🔒'}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                                    <span>Zona 2: Password Vault</span>
                                    {zoneScores.zone2 && (
                                        <span className="text-xs text-amber-400 font-mono">+{zoneScores.zone2.score} pts</span>
                                    )}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Kekuatan racikan kata sandi akun Instagram dan autentikasi dua faktor (2FA).
                                </p>
                                {/* Reveal kode zona 3 jika zona 2 sudah selesai */}
                                {completedZones.zone2 && (
                                    <div className="mt-3 px-3 py-2 bg-cyan-950/50 border border-cyan-500/40 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                            <i className="fa-solid fa-key text-cyan-400 text-xs"></i>
                                            <span>Kode Zona 3:</span>
                                        </div>
                                        <span className="font-mono font-black text-cyan-300 text-sm tracking-widest">999</span>
                                    </div>
                                )}
                                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 font-semibold">
                                    <span className={completedZones.zone2 ? "text-emerald-400" : ""}>
                                        {completedZones.zone2 ? 'Sektor Terlindungi' : unlockedZones.zone2 ? 'Masuk Simulasi (45s)' : 'Masukkan Kode Rahasia'}
                                    </span>
                                    <i className={`fa-solid ${completedZones.zone2 ? 'fa-lock text-emerald-400' : 'fa-key'}`}></i>
                                </div>
                            </div>

                            {/* ZONA 3 */}
                            <div
                                onClick={() => handleZoneClick('zone3', PAGES.PAGE_8_ZONA_3, 'Zona 3: Social Privacy')}
                                className={`group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${completedZones.zone3
                                        ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                                        : unlockedZones.zone3
                                            ? 'bg-slate-900/90 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-transform ${completedZones.zone3
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                            : unlockedZones.zone3
                                                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105'
                                                : 'bg-slate-800/50 border border-slate-700 text-slate-500'
                                        }`}>
                                        <i className={completedZones.zone3 ? "fa-solid fa-circle-check" : unlockedZones.zone3 ? "fa-solid fa-id-card" : "fa-solid fa-lock"}></i>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${completedZones.zone3
                                            ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300'
                                            : unlockedZones.zone3
                                                ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
                                                : 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
                                        }`}>
                                        {completedZones.zone3 ? 'STATUS: COMPLETED ✓' : unlockedZones.zone3 ? 'STATUS: UNLOCKED' : 'STATUS: LOCKED 🔒'}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                                    <span>Zona 3: Social Privacy</span>
                                    {zoneScores.zone3 && (
                                        <span className="text-xs text-amber-400 font-mono">+{zoneScores.zone3.score} pts</span>
                                    )}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Bahaya oversharing data pribadi (NIK, KTP, tiket) di platform media sosial.
                                </p>
                                {/* Reveal kode zona 4 jika zona 3 sudah selesai */}
                                {completedZones.zone3 && (
                                    <div className="mt-3 px-3 py-2 bg-cyan-950/50 border border-cyan-500/40 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                            <i className="fa-solid fa-key text-cyan-400 text-xs"></i>
                                            <span>Kode Zona 4:</span>
                                        </div>
                                        <span className="font-mono font-black text-cyan-300 text-sm tracking-widest">2FA2026</span>
                                    </div>
                                )}
                                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 font-semibold">
                                    <span className={completedZones.zone3 ? "text-emerald-400" : ""}>
                                        {completedZones.zone3 ? 'Sektor Terlindungi' : unlockedZones.zone3 ? 'Masuk Simulasi (45s)' : 'Masukkan Kode Rahasia'}
                                    </span>
                                    <i className={`fa-solid ${completedZones.zone3 ? 'fa-lock text-emerald-400' : 'fa-key'}`}></i>
                                </div>
                            </div>

                            {/* ZONA 4 */}
                            <div
                                onClick={() => handleZoneClick('zone4', PAGES.PAGE_10_ZONA_4, 'Zona 4: Hoax Lab')}
                                className={`group p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${completedZones.zone4
                                        ? 'bg-emerald-950/30 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                                        : unlockedZones.zone4
                                            ? 'bg-slate-900/90 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-transform ${completedZones.zone4
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                            : unlockedZones.zone4
                                                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105'
                                                : 'bg-slate-800/50 border border-slate-700 text-slate-500'
                                        }`}>
                                        <i className={completedZones.zone4 ? "fa-solid fa-circle-check" : unlockedZones.zone4 ? "fa-solid fa-flask-vial" : "fa-solid fa-lock"}></i>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${completedZones.zone4
                                            ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300'
                                            : unlockedZones.zone4
                                                ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400'
                                                : 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
                                        }`}>
                                        {completedZones.zone4 ? 'STATUS: COMPLETED ✓' : unlockedZones.zone4 ? 'STATUS: UNLOCKED' : 'STATUS: LOCKED 🔒'}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                                    <span>Zona 4: Hoax Lab</span>
                                    {zoneScores.zone4 && (
                                        <span className="text-xs text-amber-400 font-mono">+{zoneScores.zone4.score} pts</span>
                                    )}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                    Benteng literasi digital menyaring hoaks pesan berantai & manipulasi AI siber sekolah.
                                </p>
                                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 font-semibold">
                                    <span className={completedZones.zone4 ? "text-emerald-400" : ""}>
                                        {completedZones.zone4 ? 'Sektor Terlindungi' : unlockedZones.zone4 ? 'Masuk Simulasi (45s)' : 'Masukkan Kode Rahasia'}
                                    </span>
                                    <i className={`fa-solid ${completedZones.zone4 ? 'fa-lock text-emerald-400' : 'fa-key'}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 3: ZONA 1 - SIMULASI PHISHING
                ======================================================== */}
                {currentPage === PAGES.PAGE_3_ZONA_1 && (
                    <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md animate-fadeIn">
                        {/* Header Zona & Timer 45 Detik */}
                        <div className="border-b border-slate-800 pb-3 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded">
                                        ZONA 1
                                    </span>
                                    <h3 className="font-bold text-white text-base">Simulasi Phishing</h3>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setActiveModal('hint_consultant')}
                                        className="flex items-center gap-1.5 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 px-2.5 py-1 rounded-lg transition"
                                        title="Konsultasi Guru TIK"
                                    >
                                        <i className="fa-solid fa-chalkboard-user text-indigo-400"></i>
                                        <span className="hidden sm:inline">Tanya Guru</span>
                                    </button>

                                    <button
                                        onClick={() => setActiveModal('info_edu')}
                                        className="flex items-center gap-1.5 text-xs bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg transition"
                                        title="Lihat Petunjuk Edukasi"
                                    >
                                        <i className="fa-solid fa-circle-info text-cyan-400"></i>
                                        <span>Info</span>
                                    </button>
                                </div>
                            </div>

                            {/* BAR TIMER & POIN ESTIMASI */}
                            <ZoneTimerBar timeLeft={timeLeft} timeLimit={ZONE_TIME_LIMIT} />
                        </div>

                        {/* Narasi Kasus & Mockup Interaktif */}
                        <div className="mb-6">
                            <p className="text-xs text-slate-400 mb-3 font-medium">
                                <i className="fa-solid fa-comment-dots mr-1.5 text-cyan-400"></i>
                                Narasi Kasus: Kamu menerima pesan dari nomor tak dikenal:
                            </p>

                            <div className="bg-[#0b141a] border border-[#202c33] rounded-xl p-4 shadow-inner">
                                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-2.5 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                                        <i className="fa-brands fa-whatsapp text-base"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-200">{currentCaseZ1.sender}</p>
                                        <p className="text-[10px] text-slate-400">{currentCaseZ1.title}</p>
                                    </div>
                                </div>

                                <div className="bg-[#202c33] text-slate-100 rounded-lg p-3 text-sm leading-relaxed max-w-[95%] border-l-4 border-amber-500">
                                    <p className="text-slate-200 text-xs sm:text-sm font-medium">
                                        "{currentCaseZ1.message}"
                                    </p>
                                    <span className="block text-right text-[10px] text-slate-400 mt-1.5">14:02 ✓✓</span>
                                </div>
                            </div>
                        </div>

                        {/* Pilihan Tombol Interaktif */}
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                Tentukan Tindakanmu Segera:
                            </p>

                            {currentCaseZ1.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (option.isCorrect) {
                                            handleZoneSuccess('zone1', PAGES.PAGE_5_ZONA_1_SUCCESS);
                                        } else {
                                            handleWrongChoice(option.fallout, PAGES.PAGE_3_ZONA_1);
                                        }
                                    }}
                                    className={`w-full text-left p-3.5 rounded-xl border text-slate-200 transition group flex items-center justify-between ${option.isCorrect
                                            ? 'bg-slate-800/70 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/50'
                                            : 'bg-slate-800/70 hover:bg-red-950/40 border-slate-700 hover:border-red-500/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${idx === 0
                                                ? 'bg-slate-700 group-hover:bg-red-500/20 group-hover:text-red-400'
                                                : 'bg-slate-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                                            }`}>
                                            {idx === 0 ? 'A' : 'B'}
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium">
                                            {option.label}
                                        </span>
                                    </div>
                                    <i className={`fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 transition-opacity ${option.isCorrect ? 'text-emerald-400' : 'text-red-400'
                                        }`}></i>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 4: GAME OVER & FALLOUT SIMULATOR REALISTIS
                ======================================================== */}
                {currentPage === PAGES.PAGE_4_GAMEOVER && (
                    <div className="w-full max-w-lg bg-slate-900/95 border border-red-500/50 rounded-2xl p-4 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.25)] animate-shake">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-14 h-14 rounded-full bg-red-500/10 border-2 border-red-500/50 text-red-500 flex items-center justify-center text-2xl">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-red-400 tracking-wide uppercase text-center mb-2">
                            {falloutData?.headline || 'AKUN TERPERETAS!'}
                        </h2>

                        <p className="text-xs text-slate-400 text-center uppercase tracking-widest font-mono mb-4">
                            [SIMULASI DAMPAK NYATA INSIDEN SIBER]
                        </p>

                        {/* Kotak Rincian Dampak Realistis */}
                        <div className="bg-red-950/30 border border-red-900/60 rounded-xl p-4 mb-4 text-xs leading-relaxed text-slate-200">
                            <p className="font-semibold text-red-300 mb-1">
                                <i className="fa-solid fa-radiation mr-1.5 text-red-400"></i>
                                Dampak Langsung di Dunia Nyata:
                            </p>
                            <p className="text-slate-300">
                                {falloutData?.impact || 'Tautan tersebut mencuri data login-mu.'}
                            </p>
                        </div>

                        {/* Kotak Nilai Pendidikan Berkarakter */}
                        <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-4 mb-6 text-xs text-cyan-200 leading-relaxed">
                            <p className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                                <i className="fa-solid fa-graduation-cap"></i>
                                Refleksi Karakter Siswa:
                            </p>
                            <p className="text-slate-300 italic">
                                {falloutData?.moralLesson || 'Selalu utamakan integritas dan kehati-hatian dalam setiap keputusan digital.'}
                            </p>
                        </div>

                        {/* Status Perisai Nyawa & Peringatan Fatal */}
                        <div className="mb-6">
                            {isCriticalFailure ? (
                                <div className="p-3.5 bg-red-950/70 border-2 border-red-500 rounded-xl text-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                                    <p className="text-red-400 font-black text-sm uppercase tracking-wider mb-1 flex items-center justify-center gap-2">
                                        <i className="fa-solid fa-skull"></i>
                                        SISTEM PERTAHANAN RUNTUH
                                    </p>
                                    <p className="text-xs text-slate-300">
                                        Perisai 0/3 habis dan kesalahan berikutnya berakibat fatal. Seluruh sektor terkunci kembali dan misi harus diulang dari awal!
                                    </p>
                                </div>
                            ) : shieldHp === 0 ? (
                                <div className="p-3 bg-amber-950/50 border border-amber-500/70 rounded-xl text-amber-300 text-xs font-semibold text-center animate-pulse">
                                    <i className="fa-solid fa-triangle-exclamation mr-1.5 text-amber-400"></i>
                                    PERINGATAN KRITIS: 3 Perisai Keamanan Telah Habis (0/3)! Kesalahan berikutnya akan menggagalkan seluruh misi dan kamu harus mengulang dari awal (Home)!
                                </div>
                            ) : (
                                <div className="text-center text-xs text-slate-400">
                                    Sisa Perisai Keamanan: <span className="font-bold text-cyan-400">{shieldHp} dari 3 Token</span>
                                </div>
                            )}
                        </div>

                        {/* Tombol Aksi */}
                        {isCriticalFailure ? (
                            <button
                                onClick={handleResetToHome}
                                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2 tracking-wide"
                            >
                                <i className="fa-solid fa-house-chimney"></i>
                                <span>KEMBALI KE HOME (ULANG DARI AWAL)</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentPage(falloutData?.returnPage || PAGES.PAGE_3_ZONA_1)}
                                className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                            >
                                <i className="fa-solid fa-rotate-left"></i>
                                <span>COBA LAGI</span>
                            </button>
                        )}
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 5: ZONA 1 SUKSES & REFLEKSI INTEGRITAS
                ======================================================== */}
                {currentPage === PAGES.PAGE_5_ZONA_1_SUCCESS && (
                    <div className="w-full max-w-md bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-7 text-center shadow-2xl backdrop-blur-md animate-fadeIn">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                            MISI ZONA 1 BERHASIL!
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            Kamu menggagalkan serangan Phishing.
                        </p>

                        {/* Poin Didapatkan */}
                        {zoneScores.zone1 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
                                <i className="fa-solid fa-bolt text-yellow-400"></i>
                                +{zoneScores.zone1.score} Poin Didapatkan ({zoneScores.zone1.timeUsed}s)
                            </div>
                        )}

                        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 mb-4 text-left flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Lencana Diraih: Integritas</p>
                                <p className="text-[11px] text-slate-400">Menolak iming-iming instan dan cermat memverifikasi sumber.</p>
                            </div>
                        </div>

                        {/* Clue Box Kunci Zona 2 */}
                        <div className="bg-slate-950 border border-cyan-500/40 rounded-xl p-4 mb-6 shadow-inner">
                            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                                Petunjuk Kunci Zona 2:
                            </p>
                            <p className="text-xs text-slate-300">
                                Kode rahasia pembuka Zona 2 adalah:
                            </p>
                            <div className="text-2xl font-mono font-black text-cyan-400 tracking-widest mt-1">
                                404
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setUnlockedZones(prev => ({ ...prev, zone2: true }));
                                setCurrentPage(PAGES.PAGE_6_ZONA_2);
                            }}
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>LANJUT KE ZONA 2</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 6: ZONA 2 - PASSWORD VAULT
                ======================================================== */}
                {currentPage === PAGES.PAGE_6_ZONA_2 && (
                    <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md animate-fadeIn">
                        {!unlockedZones.zone2 ? (
                            <PasscodePromptView
                                zoneTitle="Zona 2: Password Vault"
                                requiredCode="404"
                                onUnlocked={() => setUnlockedZones(prev => ({ ...prev, zone2: true }))}
                            />
                        ) : (
                            <>
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded">
                                                ZONA 2
                                            </span>
                                            <h3 className="font-bold text-white text-base">Password Vault</h3>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setActiveModal('hint_consultant')}
                                                className="flex items-center gap-1.5 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 px-2.5 py-1 rounded-lg transition"
                                                title="Konsultasi Guru TIK"
                                            >
                                                <i className="fa-solid fa-chalkboard-user text-indigo-400"></i>
                                                <span className="hidden sm:inline">Tanya Guru</span>
                                            </button>

                                            <button
                                                onClick={() => setActiveModal('info_edu')}
                                                className="flex items-center gap-1.5 text-xs bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg transition"
                                                title="Pelajari Standar Keamanan Sandi"
                                            >
                                                <i className="fa-solid fa-lock text-cyan-400"></i>
                                                <span>Gembok 2FA</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Timer Bar */}
                                    <ZoneTimerBar timeLeft={timeLeft} timeLimit={ZONE_TIME_LIMIT} />
                                </div>

                                <div className="mb-6">
                                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-4">
                                        <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold mb-2">
                                            <i className="fa-brands fa-instagram text-base"></i>
                                            <span>{currentCaseZ2.platform}</span>
                                        </div>
                                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                            "{currentCaseZ2.message}"
                                        </p>
                                    </div>
                                </div>

                                {/* Pilihan Tombol Interaktif */}
                                <div className="space-y-3">
                                    {currentCaseZ2.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                if (option.isCorrect) {
                                                    handleZoneSuccess('zone2', PAGES.PAGE_7_ZONA_2_SUCCESS);
                                                } else {
                                                    handleWrongChoice(option.fallout, PAGES.PAGE_6_ZONA_2);
                                                }
                                            }}
                                            className={`w-full text-left p-3.5 rounded-xl border text-slate-200 transition group flex items-center justify-between ${option.isCorrect
                                                    ? 'bg-slate-800/70 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/50'
                                                    : 'bg-slate-800/70 hover:bg-red-950/40 border-slate-700 hover:border-red-500/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center font-mono ${idx === 0
                                                        ? 'bg-slate-700 group-hover:bg-red-500/20 group-hover:text-red-400'
                                                        : 'bg-slate-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                                                    }`}>
                                                    {idx === 0 ? 'A' : 'B'}
                                                </span>
                                                <span className="text-xs sm:text-sm font-mono font-medium">
                                                    {option.label}
                                                </span>
                                            </div>
                                            <i className={`fa-solid ${option.isCorrect ? 'fa-shield-halved text-emerald-400' : 'fa-arrow-right text-red-400'} text-xs opacity-0 group-hover:opacity-100 transition-opacity`}></i>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 7: ZONA 2 SUKSES & REFLEKSI TANGGUNG JAWAB
                ======================================================== */}
                {currentPage === PAGES.PAGE_7_ZONA_2_SUCCESS && (
                    <div className="w-full max-w-md bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-7 text-center shadow-2xl backdrop-blur-md animate-fadeIn">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                            PASSWORD TERPROTEKSI!
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            Akses keamananmu meningkat.
                        </p>

                        {zoneScores.zone2 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
                                <i className="fa-solid fa-bolt text-yellow-400"></i>
                                +{zoneScores.zone2.score} Poin Didapatkan ({zoneScores.zone2.timeUsed}s)
                            </div>
                        )}

                        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 mb-4 text-left flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                                <i className="fa-solid fa-key"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Lencana Diraih: Tanggung Jawab</p>
                                <p className="text-[11px] text-slate-400">Disiplin menjaga kredensial kata sandi dan mengaktifkan 2FA.</p>
                            </div>
                        </div>

                        {/* Clue Box Kunci Zona 3 */}
                        <div className="bg-slate-950 border border-cyan-500/40 rounded-xl p-4 mb-6 shadow-inner">
                            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                                Petunjuk Kunci Zona 3:
                            </p>
                            <p className="text-xs text-slate-300">
                                Kode rahasia pembuka Zona 3 adalah:
                            </p>
                            <div className="text-2xl font-mono font-black text-cyan-400 tracking-widest mt-1">
                                999
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setUnlockedZones(prev => ({ ...prev, zone3: true }));
                                setCurrentPage(PAGES.PAGE_8_ZONA_3);
                            }}
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>LANJUT KE ZONA 3</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 8: ZONA 3 - SOCIAL PRIVACY
                ======================================================== */}
                {currentPage === PAGES.PAGE_8_ZONA_3 && (
                    <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md animate-fadeIn">
                        {!unlockedZones.zone3 ? (
                            <PasscodePromptView
                                zoneTitle="Zona 3: Social Privacy"
                                requiredCode="999"
                                onUnlocked={() => setUnlockedZones(prev => ({ ...prev, zone3: true }))}
                            />
                        ) : (
                            <>
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded">
                                                ZONA 3
                                            </span>
                                            <h3 className="font-bold text-white text-base">Social Privacy</h3>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setActiveModal('hint_consultant')}
                                                className="flex items-center gap-1.5 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 px-2.5 py-1 rounded-lg transition"
                                                title="Konsultasi Guru TIK"
                                            >
                                                <i className="fa-solid fa-chalkboard-user text-indigo-400"></i>
                                                <span className="hidden sm:inline">Tanya Guru</span>
                                            </button>

                                            <button
                                                onClick={() => setActiveModal('info_edu')}
                                                className="flex items-center gap-1.5 text-xs bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg transition"
                                                title="Info Privasi Data"
                                            >
                                                <i className="fa-solid fa-id-card text-cyan-400"></i>
                                                <span>Info</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Timer Bar */}
                                    <ZoneTimerBar timeLeft={timeLeft} timeLimit={ZONE_TIME_LIMIT} />
                                </div>

                                <div className="mb-6">
                                    <div className="bg-gradient-to-br from-purple-900/40 via-slate-900 to-pink-950/40 border border-purple-500/30 rounded-xl p-4 mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                                                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-[10px]">
                                                    📸
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">temansekelas_hits</p>
                                                <p className="text-[10px] text-slate-400">InstaStory • 12m lalu</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-950/80 border border-slate-700/50 rounded-lg p-3 text-center my-2">
                                            <i className="fa-solid fa-id-card text-3xl text-purple-400 mb-2"></i>
                                            <p className="text-xs text-amber-300 font-mono">
                                                [FOTO PUBLIK: KTP & KARTU PELAJAR JELAS TERBACA]
                                            </p>
                                            <p className="text-[11px] text-slate-400 italic mt-1">
                                                "Akhirnya dapet KTP baru gaes! Rayain yuk!"
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                        "{currentCaseZ3.message}"
                                    </p>
                                </div>

                                {/* Pilihan Tombol Interaktif */}
                                <div className="space-y-3">
                                    {currentCaseZ3.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                if (option.isCorrect) {
                                                    handleZoneSuccess('zone3', PAGES.PAGE_9_ZONA_3_SUCCESS);
                                                } else {
                                                    handleWrongChoice(option.fallout, PAGES.PAGE_8_ZONA_3);
                                                }
                                            }}
                                            className={`w-full text-left p-3.5 rounded-xl border text-slate-200 transition group flex items-start gap-3 ${option.isCorrect
                                                    ? 'bg-slate-800/70 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/50'
                                                    : 'bg-slate-800/70 hover:bg-red-950/40 border-slate-700 hover:border-red-500/50'
                                                }`}
                                        >
                                            <span className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold flex items-center justify-center ${idx === 0
                                                    ? 'bg-slate-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                                                    : 'bg-slate-700 group-hover:bg-red-500/20 group-hover:text-red-400'
                                                }`}>
                                                {idx === 0 ? 'A' : 'B'}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium leading-relaxed">
                                                {option.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 9: ZONA 3 SUKSES & REFLEKSI EMPATI
                ======================================================== */}
                {currentPage === PAGES.PAGE_9_ZONA_3_SUCCESS && (
                    <div className="w-full max-w-md bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-7 text-center shadow-2xl backdrop-blur-md animate-fadeIn">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                            <i className="fa-solid fa-user-shield"></i>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                            PRIVASI TERJAGA!
                        </h2>
                        <p className="text-sm text-slate-300 mb-3">
                            Data pribadi sekolah aman.
                        </p>

                        {zoneScores.zone3 && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
                                <i className="fa-solid fa-bolt text-yellow-400"></i>
                                +{zoneScores.zone3.score} Poin Didapatkan ({zoneScores.zone3.timeUsed}s)
                            </div>
                        )}

                        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 mb-4 text-left flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                                <i className="fa-solid fa-heart-shield text-emerald-400"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Lencana Diraih: Empati & Privasi</p>
                                <p className="text-[11px] text-slate-400">Peduli melindungi data pribadi diri dan mengingatkan teman sebaya.</p>
                            </div>
                        </div>

                        {/* Clue Box Kunci Zona 4 */}
                        <div className="bg-slate-950 border border-cyan-500/40 rounded-xl p-4 mb-6 shadow-inner">
                            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">
                                Petunjuk Kunci Zona 4:
                            </p>
                            <p className="text-xs text-slate-300">
                                Kode rahasia pembuka Zona 4 adalah:
                            </p>
                            <div className="text-2xl font-mono font-black text-cyan-400 tracking-widest mt-1">
                                2FA2026
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setUnlockedZones(prev => ({ ...prev, zone4: true }));
                                setCurrentPage(PAGES.PAGE_10_ZONA_4);
                            }}
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>MASUK ZONA FINAL</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 10: ZONA 4 - HOAX LAB
                ======================================================== */}
                {currentPage === PAGES.PAGE_10_ZONA_4 && (
                    <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md animate-fadeIn">
                        {!unlockedZones.zone4 ? (
                            <PasscodePromptView
                                zoneTitle="Zona 4: Hoax Lab"
                                requiredCode="2FA2026"
                                onUnlocked={() => setUnlockedZones(prev => ({ ...prev, zone4: true }))}
                            />
                        ) : (
                            <>
                                <div className="border-b border-slate-800 pb-3 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2.5 py-1 rounded">
                                                ZONA 4 FINAL
                                            </span>
                                            <h3 className="font-bold text-white text-base">Hoax Lab</h3>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setActiveModal('hint_consultant')}
                                                className="flex items-center gap-1.5 text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/50 px-2.5 py-1 rounded-lg transition"
                                                title="Konsultasi Guru TIK"
                                            >
                                                <i className="fa-solid fa-chalkboard-user text-indigo-400"></i>
                                                <span className="hidden sm:inline">Tanya Guru</span>
                                            </button>

                                            <button
                                                onClick={() => setActiveModal('info_edu')}
                                                className="flex items-center gap-1.5 text-xs bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/50 px-2.5 py-1 rounded-lg transition"
                                                title="Info Deteksi Hoaks"
                                            >
                                                <i className="fa-solid fa-brain text-cyan-400"></i>
                                                <span>Info</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Timer Bar */}
                                    <ZoneTimerBar timeLeft={timeLeft} timeLimit={ZONE_TIME_LIMIT} />
                                </div>

                                <div className="mb-6">
                                    <div className="bg-[#0b141a] border border-[#202c33] rounded-xl p-4 shadow-inner mb-4">
                                        <div className="flex items-center gap-2 text-slate-300 text-xs font-bold border-b border-slate-800 pb-2 mb-2">
                                            <i className="fa-solid fa-users text-cyan-400"></i>
                                            <span>{currentCaseZ4.platform}</span>
                                        </div>
                                        <div className="bg-[#202c33] text-slate-200 rounded-lg p-3 text-xs leading-relaxed border-l-4 border-red-500">
                                            <p className="font-bold text-red-400 mb-1">
                                                🚨 FORWARDED MANY TIMES / PESAN BERANTAI:
                                            </p>
                                            <p className="text-slate-200">
                                                "{currentCaseZ4.message}"
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                        "Ada pesan berantai di grup kelas: 'Besok sekolah diliburkan karena kebocoran gas, sebar ke 10 grup!'. Tindakanmu?"
                                    </p>
                                </div>

                                {/* Pilihan Tombol Interaktif */}
                                <div className="space-y-3">
                                    {currentCaseZ4.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                if (option.isCorrect) {
                                                    handleZoneSuccess('zone4', PAGES.PAGE_11_VICTORY);
                                                } else {
                                                    handleWrongChoice(option.fallout, PAGES.PAGE_10_ZONA_4);
                                                }
                                            }}
                                            className={`w-full text-left p-3.5 rounded-xl border text-slate-200 transition group flex items-start gap-3 ${option.isCorrect
                                                    ? 'bg-slate-800/70 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/50'
                                                    : 'bg-slate-800/70 hover:bg-red-950/40 border-slate-700 hover:border-red-500/50'
                                                }`}
                                        >
                                            <span className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold flex items-center justify-center ${idx === 0
                                                    ? 'bg-slate-700 group-hover:bg-emerald-500/20 group-hover:text-emerald-400'
                                                    : 'bg-slate-700 group-hover:bg-red-500/20 group-hover:text-red-400'
                                                }`}>
                                                {idx === 0 ? 'A' : 'B'}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium leading-relaxed">
                                                {option.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ========================================================
                    HALAMAN 11: VICTORY & POST-TEST
                ======================================================== */}
                {currentPage === PAGES.PAGE_11_VICTORY && (
                    <div className="w-full max-w-3xl bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md animate-fadeIn">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 flex items-center justify-center mx-auto mb-4 text-4xl shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                                <i className="fa-solid fa-award"></i>
                            </div>

                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-800/80 mb-3">
                                Misi Sukses Penuh
                            </span>

                            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-300 mb-2">
                                SELAMAT AGEN! Kamu berhasil mengalahkan BlackByte dan mengamankan sekolah!
                            </h2>

                            <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
                                "Isi evaluasi akhir ini untuk mengklaim gelar 'Master Cyber Guardian'."
                            </p>
                        </div>

                        {/* Rangkuman Skor Akhir */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-3 text-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Skor Agen</p>
                                <p className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-0.5">{totalScore.toLocaleString()} PTS</p>
                            </div>
                            <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-3 text-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Waktu Selesai</p>
                                <p className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-0.5">{totalTimeUsed} Detik</p>
                            </div>
                            <div className="col-span-2 sm:col-span-1 bg-slate-950/80 border border-cyan-500/30 rounded-xl p-3 text-center">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Sisa Perisai</p>
                                <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">{shieldHp} / 3 Perisai</p>
                            </div>
                        </div>

                        {/* PANEL PENGHARGAAN GELAR CYBER GUARDIAN */}
                        <div className="bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-cyan-500/60 rounded-2xl p-3.5 sm:p-8 mb-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none text-9xl">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>

                            <div className="border border-cyan-500/30 rounded-xl p-3.5 sm:p-5 text-center relative z-10 bg-slate-950/60 backdrop-blur-sm">
                                <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
                                    SERTIFIKAT KOMPETENSI KEAMANAN SIBER & PENDIDIKAN BERKARAKTER
                                </p>
                                <h3 className="text-lg sm:text-2xl font-serif font-black text-amber-300 tracking-wider uppercase mb-1">
                                    MASTER CYBER GUARDIAN
                                </h3>
                                <p className="text-xs text-slate-400 mb-4">Diberikan secara terhormat kepada:</p>

                                <div className="text-xl sm:text-3xl font-extrabold text-white tracking-wide underline decoration-cyan-500 decoration-2 underline-offset-8 mb-2 break-words">
                                    {agentName || 'Agen Pelajar Teladan'}
                                </div>
                                <p className="text-xs text-cyan-300 font-medium mb-6">
                                    {agentSchool || 'Pelajar Sekolah Menengah Atas (SMA)'}
                                </p>

                                <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
                                    Telah berhasil menuntaskan seluruh 4 zona pertahanan siber sekolah, menunjukkan ketangguhan karakter moral, serta menjunjung tinggi nilai <span className="text-emerald-400 font-bold">Integritas</span>, <span className="text-cyan-400 font-bold">Tanggung Jawab</span>, <span className="text-purple-400 font-bold">Empati Privasi</span>, dan <span className="text-amber-400 font-bold">Kebijaksanaan Digital</span>.
                                </p>

                                {/* 4 Lencana Karakter */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800">
                                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-center">
                                        <i className="fa-solid fa-shield-halved text-emerald-400 text-base sm:text-lg mb-1"></i>
                                        <p className="text-[10px] font-bold text-white">Integritas</p>
                                        <p className="text-[9px] text-slate-400">Anti-Phishing</p>
                                    </div>
                                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-center">
                                        <i className="fa-solid fa-key text-cyan-400 text-base sm:text-lg mb-1"></i>
                                        <p className="text-[10px] font-bold text-white">Tanggung Jawab</p>
                                        <p className="text-[9px] text-slate-400">Password & 2FA</p>
                                    </div>
                                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-900/90 border border-purple-500/30 text-center">
                                        <i className="fa-solid fa-user-shield text-purple-400 text-base sm:text-lg mb-1"></i>
                                        <p className="text-[10px] font-bold text-white">Empati Privasi</p>
                                        <p className="text-[9px] text-slate-400">Lindungi Data</p>
                                    </div>
                                    <div className="p-2 sm:p-2.5 rounded-lg bg-slate-900/90 border border-amber-500/30 text-center">
                                        <i className="fa-solid fa-brain text-amber-400 text-base sm:text-lg mb-1"></i>
                                        <p className="text-[10px] font-bold text-white">Kebijaksanaan</p>
                                        <p className="text-[9px] text-slate-400">Saring Hoaks</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={openLeaderboard}
                                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                            >
                                <i className="fa-solid fa-trophy"></i>
                                <span>Lihat Peringkat Leaderboard</span>
                            </button>

                            <button
                                onClick={() => setCurrentPage(PAGES.PAGE_2_HUB)}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-600/40 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/20"
                            >
                                <i className="fa-solid fa-map-location-dot"></i>
                                <span>Tinjau Peta Misi</span>
                            </button>

                            <button
                                onClick={handleResetToHome}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 transform active:scale-95"
                            >
                                <i className="fa-solid fa-arrow-rotate-right"></i>
                                <span>Mainkan Misi Baru</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* ========================================================
                MODAL POP-UP: ZONA SUDAH SELESAI (KETENTUAN 3)
            ======================================================== */}
            {activeModal === 'zone_completed_notice' && completedNoticeData && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
                    <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-[0_0_40px_rgba(16,185,129,0.3)] text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>

                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full inline-block mb-2">
                            SEKTOR SUDAH DIAMANKAN
                        </span>

                        <h3 className="text-xl font-extrabold text-white mb-2">
                            {completedNoticeData.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                            Kamu telah berhasil menyelesaikan misi pada zona ini dan sistem sekolah di sektor ini sudah terlindungi sepenuhnya dari peretas BlackByte. <strong className="text-emerald-300">Kamu tidak bisa mengulang zona ini lagi.</strong>
                        </p>

                        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3 mb-4 flex justify-around text-xs">
                            <div>
                                <span className="text-slate-400 block text-[10px]">Skor Diperoleh</span>
                                <span className="font-mono font-bold text-amber-300 text-sm">+{completedNoticeData.score} pts</span>
                            </div>
                            <div className="border-r border-slate-800"></div>
                            <div>
                                <span className="text-slate-400 block text-[10px]">Waktu Penyelesaian</span>
                                <span className="font-mono font-bold text-cyan-300 text-sm">{completedNoticeData.timeUsed} detik</span>
                            </div>
                        </div>

                        {/* Kode sandi zona berikutnya jika ada */}
                        {completedNoticeData.nextPasscode && (
                            <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl p-3 mb-5 flex items-center justify-between text-left">
                                <div>
                                    <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">
                                        Kode Akses {completedNoticeData.nextPasscode.nextZone}
                                    </span>
                                    <span className="text-[11px] text-slate-300">Gunakan kode ini untuk membuka kunci:</span>
                                </div>
                                <span className="font-mono font-black text-cyan-300 text-base tracking-widest px-2.5 py-1 bg-cyan-900/50 rounded-lg border border-cyan-500/30">
                                    {completedNoticeData.nextPasscode.code}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={() => setActiveModal(null)}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold py-3 rounded-xl transition text-sm shadow-lg shadow-emerald-500/20"
                        >
                            LANJUTKAN MISI KE ZONA LAIN
                        </button>
                    </div>
                </div>
            )}



            {/* ========================================================
                MODAL LEADERBOARD (PAPAN PERINGKAT)
            ======================================================== */}
            {showLeaderboard && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
                    <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-4 sm:p-6 max-w-xl w-full shadow-2xl relative max-h-[90vh] flex flex-col">
                        <button
                            onClick={() => setShowLeaderboard(false)}
                            className="absolute right-4 top-4 text-slate-400 hover:text-white transition p-1"
                        >
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>

                        <div className="text-center pb-4 border-b border-slate-800">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto mb-2 text-xl">
                                <i className="fa-solid fa-trophy"></i>
                            </div>
                            <h3 className="text-lg font-black text-amber-300 uppercase tracking-wider">
                                LEADERBOARD CYBER GUARDIAN
                            </h3>
                            <p className="text-xs text-slate-400">
                                Agen tercepat dan tertangguh mempertahankan sistem sekolah.
                            </p>

                            {/* Banner Mode Pengajar Jika Aktif */}
                            {isAdminMode && (
                                <div className="mt-3 px-3 py-2 bg-red-950/40 border border-red-500/50 rounded-lg flex items-center justify-between text-xs animate-fadeIn">
                                    <span className="text-red-300 font-bold flex items-center gap-1.5">
                                        <i className="fa-solid fa-user-gear text-red-400"></i>
                                        <span>Mode Guru Aktif (Akses Hapus)</span>
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleResetAllLeaderboard}
                                            className="text-[11px] bg-red-800 hover:bg-red-700 text-white px-2.5 py-1 rounded transition font-bold"
                                            title="Kosongkan Semua Data"
                                        >
                                            Reset Semua
                                        </button>
                                        <button
                                            onClick={() => setIsAdminMode(false)}
                                            className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition"
                                        >
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* List Leaderboard */}
                        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1 custom-scrollbar">
                            {leaderboardLoading ? (
                                <div className="text-center py-8 text-slate-400 text-xs">
                                    <i className="fa-solid fa-spinner animate-spin text-xl mb-2 text-cyan-400 block"></i>
                                    Memuat data peringkat...
                                </div>
                            ) : leaderboardList.length === 0 ? (
                                <div className="text-center py-8 text-slate-400 text-xs">
                                    Belum ada catatan skor. Jadilah yang pertama menuntaskan misi!
                                </div>
                            ) : (
                                leaderboardList.map((entry, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded-xl border flex items-center justify-between transition ${idx === 0
                                                ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                                                : idx === 1
                                                    ? 'bg-slate-800/80 border-slate-400/40'
                                                    : idx === 2
                                                        ? 'bg-amber-950/20 border-amber-700/40'
                                                        : 'bg-slate-950/60 border-slate-800'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Badge Rank */}
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${idx === 0
                                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                                                    : idx === 1
                                                        ? 'bg-slate-300 text-slate-950'
                                                        : idx === 2
                                                            ? 'bg-amber-700 text-amber-100'
                                                            : 'bg-slate-800 text-slate-400 font-mono'
                                                }`}>
                                                {idx === 0 ? <i className="fa-solid fa-crown text-slate-950"></i> : `#${idx + 1}`}
                                            </div>

                                            <div>
                                                <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                                                    <span>{entry.username}</span>
                                                    {entry.username === agentName && (
                                                        <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-1.5 rounded">Kamu</span>
                                                    )}
                                                </p>
                                                <p className="text-[11px] text-slate-400">{entry.school || 'SMA Pelajar'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="font-mono font-black text-amber-300 text-xs sm:text-sm">
                                                    {entry.totalScore.toLocaleString()} PTS
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-mono">
                                                    <i className="fa-regular fa-clock mr-1"></i>
                                                    {entry.timeTakenSeconds}s
                                                </p>
                                            </div>

                                            {/* Tombol Hapus Satuan Khusus Mode Pengajar */}
                                            {isAdminMode && (
                                                <button
                                                    onClick={() => handleDeleteLeaderboardEntry(entry)}
                                                    className="w-7 h-7 rounded-lg bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-400 hover:text-red-300 flex items-center justify-center transition text-xs shrink-0 cursor-pointer"
                                                    title={`Hapus agen ${entry.username}`}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                            <span>Sistem Poin: Base 1000 + (Sisa Detik × 30)</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={fetchLeaderboard}
                                    className="text-cyan-400 hover:underline flex items-center gap-1"
                                >
                                    <i className="fa-solid fa-rotate text-[10px]"></i> Refresh
                                </button>

                                {!isAdminMode && (
                                    <button
                                        onClick={() => {
                                            setShowAdminPinPrompt(true);
                                            setAdminPinInput('');
                                            setAdminPinError('');
                                        }}
                                        className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1 text-[11px] cursor-pointer"
                                        title="Kelola data sebagai Pengajar"
                                    >
                                        <i className="fa-solid fa-lock text-[10px]"></i>
                                        <span>Guru</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Prompt Input PIN Guru / Pengajar */}
                        {showAdminPinPrompt && (
                            <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center z-20 text-center animate-fadeIn">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xl mb-3">
                                    <i className="fa-solid fa-key"></i>
                                </div>
                                <h4 className="text-base font-bold text-white mb-1">Akses Pengajar / Guru</h4>
                                <p className="text-xs text-slate-400 max-w-xs mb-4">
                                    Masukkan PIN Pengajar untuk mengelola & menghapus data peringkat:
                                </p>
                                <input
                                    type="password"
                                    value={adminPinInput}
                                    onChange={(e) => {
                                        setAdminPinInput(e.target.value);
                                        setAdminPinError('');
                                    }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleVerifyAdminPin()}
                                    placeholder="PIN (Default: guru2026)"
                                    className="w-56 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-center text-sm text-cyan-200 focus:outline-none focus:border-cyan-400 mb-2"
                                    autoFocus
                                />
                                {adminPinError && (
                                    <p className="text-xs text-red-400 mb-3">{adminPinError}</p>
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowAdminPinPrompt(false)}
                                        className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs hover:bg-slate-700 transition"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleVerifyAdminPin}
                                        className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition"
                                    >
                                        Masuk Mode Guru
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL EDUKASI RESMI
            ======================================================== */}
            {activeModal === 'info_edu' && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
                    <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                                <i className="fa-solid fa-circle-info text-base"></i>
                                <span>Modul Edukasi Keamanan Siber</span>
                            </div>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="text-slate-400 hover:text-white transition text-sm p-1"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl mb-5">
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                                {currentPage === PAGES.PAGE_3_ZONA_1 && currentCaseZ1.infoEdu}
                                {currentPage === PAGES.PAGE_6_ZONA_2 && currentCaseZ2.infoEdu}
                                {currentPage === PAGES.PAGE_8_ZONA_3 && currentCaseZ3.infoEdu}
                                {currentPage === PAGES.PAGE_10_ZONA_4 && currentCaseZ4.infoEdu}
                            </p>
                        </div>

                        <button
                            onClick={() => setActiveModal(null)}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL KONSULTASI GURU TIK (HINT LIFELINE)
            ======================================================== */}
            {activeModal === 'hint_consultant' && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
                    <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                                <i className="fa-solid fa-chalkboard-user text-base"></i>
                                <span>Bimbingan Guru TIK & Nilai Karakter</span>
                            </div>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="text-slate-400 hover:text-white transition text-sm p-1"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="bg-indigo-950/30 border border-indigo-800/40 p-4 rounded-xl mb-5">
                            <p className="text-xs font-semibold text-indigo-300 mb-1">
                                <i className="fa-solid fa-lightbulb text-yellow-400 mr-1.5"></i>
                                Petunjuk Berpikir Kritis:
                            </p>
                            <p className="text-xs text-slate-200 leading-relaxed">
                                {currentPage === PAGES.PAGE_3_ZONA_1 && currentCaseZ1.hint}
                                {currentPage === PAGES.PAGE_6_ZONA_2 && currentCaseZ2.hint}
                                {currentPage === PAGES.PAGE_8_ZONA_3 && currentCaseZ3.hint}
                                {currentPage === PAGES.PAGE_10_ZONA_4 && currentCaseZ4.hint}
                            </p>
                        </div>

                        <button
                            onClick={() => setActiveModal(null)}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition text-sm"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL PROMPT PASSCODE PETA MISI
            ======================================================== */}
            {activeModal === 'passcode_prompt' && passcodeTargetZone && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
                    <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                                <i className="fa-solid fa-key text-base"></i>
                                <span>Dekripsi Kode Akses Sektor</span>
                            </div>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="text-slate-400 hover:text-white transition text-sm p-1"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <p className="text-xs text-slate-300 mb-4">
                            Zona ini terkunci. Masukkan kode sandi yang kamu peroleh dari keberhasilan misi sebelumnya:
                        </p>

                        <div className="mb-4">
                            <input
                                type="text"
                                value={passcodeInput}
                                onChange={(e) => {
                                    setPasscodeInput(e.target.value);
                                    setPasscodeError('');
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleVerifyPasscode(
                                            passcodeTargetZone.zoneKey,
                                            passcodeInput,
                                            passcodeTargetZone.targetPage
                                        );
                                    }
                                }}
                                placeholder="Masukkan kode sandi..."
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center font-mono text-cyan-300 text-lg uppercase tracking-wider focus:outline-none focus:border-cyan-400"
                                autoFocus
                            />
                            {passcodeError && (
                                <p className="text-xs text-red-400 mt-2 text-center font-medium">
                                    <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                                    {passcodeError}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl transition text-sm"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleVerifyPasscode(
                                    passcodeTargetZone.zoneKey,
                                    passcodeInput,
                                    passcodeTargetZone.targetPage
                                )}
                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm shadow-md"
                            >
                                Buka Kunci
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-komponen Bar Timer 45 Detik & Estimasi Poin
function ZoneTimerBar({ timeLeft, timeLimit }) {
    const percentage = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));
    const potentialScore = 1000 + (timeLeft * 30);

    return (
        <div className="mt-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-mono">
                    <i className={`fa-solid fa-clock text-xs ${timeLeft <= 10 ? 'text-red-400 animate-spin' : timeLeft <= 20 ? 'text-amber-400' : 'text-cyan-400'
                        }`}></i>
                    <span className="text-slate-400 text-[11px]">Waktu Analisis:</span>
                    <span className={`font-black text-sm ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : timeLeft <= 20 ? 'text-amber-400' : 'text-cyan-300'
                        }`}>
                        {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Potensi Skor:</span>
                    <span className="font-mono font-bold text-amber-300 text-xs">
                        +{potentialScore} pts
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 rounded-full ${timeLeft <= 10
                            ? 'bg-gradient-to-r from-red-500 to-rose-600'
                            : timeLeft <= 20
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                                : 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                        }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}

// Sub-komponen Tampilan Input Passcode jika Halaman Terkunci
function PasscodePromptView({ zoneTitle, requiredCode, onUnlocked }) {
    const [inputCode, setInputCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleCheck = () => {
        if (inputCode.trim().toUpperCase() === requiredCode.toUpperCase()) {
            onUnlocked();
        } else {
            setErrorMsg(`Kode salah! Butuh kode sandi yang tepat.`);
        }
    };

    return (
        <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3 text-2xl">
                <i className="fa-solid fa-lock"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{zoneTitle} Terkunci</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Masukkan kode rahasia dari misi sebelumnya untuk membuka sektor ini.
            </p>

            <div className="max-w-xs mx-auto mb-4">
                <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => {
                        setInputCode(e.target.value);
                        setErrorMsg('');
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheck();
                    }}
                    placeholder={`Kode (misal: ${requiredCode})`}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center font-mono text-cyan-300 text-lg uppercase tracking-wider focus:outline-none focus:border-cyan-400"
                />
                {errorMsg && (
                    <p className="text-xs text-red-400 mt-2 font-medium">
                        <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                        {errorMsg}
                    </p>
                )}
            </div>

            <button
                onClick={handleCheck}
                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 px-6 rounded-xl transition text-sm shadow-md"
            >
                Buka Kunci Zona
            </button>
        </div>
    );
}
