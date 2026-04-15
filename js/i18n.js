/* ============================================================
   i18n.js — bilingual toggle (Indonesian / English)
   Default: ID · Persistence: localStorage
   ============================================================ */

var translations = {

  /* ──────────────── INDONESIAN (default) ──────────────── */
  id: {
    'nav.about':         'Tentang Kami',
    'nav.capabilities':  'Kemampuan',
    'nav.projects':      'Proyek',
    'nav.contact':       'Kontak',

    'hero.eyebrow':      'Jakarta · Kontraktor Design-Build',
    'hero.headline':     'Bangun Sekali.<br>Bertahan Dua Puluh Tahun.',
    'hero.sub':          'PT. Indobangun Berjaya Konstruksi — kontraktor design-build terintegrasi penuh di Jakarta. Satu tim, satu visi, satu standar kualitas.',
    'hero.cta_primary':  'Lihat Proyek Kami',
    'hero.cta_secondary':'Hubungi Kami',

    'diff.eyebrow':      'Filosofi Kami',
    'diff.title':        'Perbedaan IBK',
    'diff.lead':         'Banyak kontraktor bisa membangun. Kami membangun untuk bertahan dua puluh tahun ke depan — dengan biaya kepemilikan yang lebih rendah, bukan hanya harga awal yang lebih murah.',
    'diff.card1_title':  'Design-Build Terintegrasi',
    'diff.card1_text':   'Arsitek, insinyur struktur, dan tim lapangan kami bekerja dalam satu atap. Tidak ada gap komunikasi. Tidak ada finger-pointing antar pihak. Hasilnya: jadwal lebih ketat, anggaran lebih terkontrol.',
    'diff.card2_title':  'Biaya Kepemilikan 20 Tahun',
    'diff.card2_text':   'Kami tidak hanya menghitung harga bangun. Kami menghitung biaya listrik, perawatan, dan renovasi selama dua dekade. Material yang sedikit lebih mahal di depan sering kali menghemat jauh lebih banyak di belakang.',
    'diff.card3_title':  'Transparansi Total',
    'diff.card3_text':   'Setiap keputusan material, setiap perubahan anggaran, setiap laporan progres — klien kami tahu sebelum kami bertindak. Kepercayaan dibangun dari data, bukan janji.',

    'cap.eyebrow':       'Apa yang Kami Kerjakan',
    'cap.title':         'Kemampuan Kami',
    'cap.item1':         'Desain Arsitektur',
    'cap.item2':         'Struktur &amp; Sipil',
    'cap.item3':         'MEP — Mekanikal, Elektrikal, Plumbing',
    'cap.item4':         'Interior &amp; Finishing',
    'cap.item5':         'Manajemen Proyek',
    'cap.item6':         'Konsultasi &amp; Estimasi Anggaran',
    'cap.item7':         'Pengawasan Konstruksi',
    'cap.item8':         'Perizinan &amp; Kepatuhan Regulasi',
    'cap.item9':         'Pemeliharaan Pasca-Bangun',

    'proj.eyebrow':        'Portofolio',
    'proj.title':          'Proyek Pilihan',
    'proj.badge_progress': 'Dalam Proses',
    'proj.badge_done':     'Selesai',
    'proj.lotus_type':     'Hunian Privat · PIK2, Tangerang',
    'proj.lotus_text':     'Hunian tiga lantai dengan sistem rumah pintar terintegrasi, atap hijau, dan struktur beton bertulang premium. Proyek andalan IBK yang sedang berjalan.',
    'proj.cta_follow':     'Ikuti Progresnya',
    'proj.villa_type':     'Hunian Privat · Semarang',
    'proj.villa_text':     'Villa tropis kontemporer dengan detail kayu jati dan sistem penghawaan alami. Selesai dalam 14 bulan.',
    'proj.ruko_type':      'Komersial · Bintaro, Tangerang Selatan',
    'proj.ruko_text':      'Deretan ruko tiga lantai dengan fasad modern dan sistem keamanan terintegrasi. Dibangun dalam 10 bulan.',
    'proj.office_type':    'Perkantoran · Tangerang',
    'proj.office_text':    'Fit-out kantor dua lantai dengan layout open-space, ruang rapat akustik, dan sistem pencahayaan cerdas.',
    'proj.bekasi_type':    'Hunian Privat · Bekasi',
    'proj.bekasi_text':    'Rumah keluarga dua lantai dengan taman dalam dan kolam renang. Diselesaikan tepat waktu dalam 12 bulan.',

    'phil.eyebrow':      'Standar Material',
    'phil.title':        'Filosofi Rekayasa Kami',
    'phil.lead':         'Kami tidak berkompromi pada material struktural. Setiap spesifikasi di bawah ini adalah standar minimum IBK — bukan upgrade berbayar.',
    'phil.th_component': 'Komponen',
    'phil.th_ibk':       'Standar IBK',
    'phil.th_market':    'Pasar Umum',
    'phil.th_impact':    'Dampak Jangka Panjang',
    'phil.row1_comp':    'Beton Struktural',
    'phil.row1_ibk':     'K-350 minimum',
    'phil.row1_market':  'K-225 – K-250',
    'phil.row1_impact':  'Ketahanan 2× lebih lama terhadap beban siklis',
    'phil.row2_comp':    'Baja Tulangan',
    'phil.row2_ibk':     'BJTD-40 SNI',
    'phil.row2_market':  'BJTP-24 atau non-SNI',
    'phil.row2_impact':  'Lebih tahan gempa, risiko keropos lebih rendah',
    'phil.row3_comp':    'Waterproofing',
    'phil.row3_ibk':     'Membran + crystalline',
    'phil.row3_market':  'Cat waterproof biasa',
    'phil.row3_impact':  'Garansi rembes 10 tahun vs. 1–2 tahun',
    'phil.row4_comp':    'Instalasi Listrik',
    'phil.row4_ibk':     'NYM 2.5mm², ELCB',
    'phil.row4_market':  'NYA 1.5mm², MCB standar',
    'phil.row4_impact':  'Keamanan kebakaran lebih tinggi, siap upgrade daya',
    'phil.row5_comp':    'Cat Eksterior',
    'phil.row5_ibk':     'Weathershield 10 tahun',
    'phil.row5_market':  'Cat eksterior biasa',
    'phil.row5_impact':  'Siklus cat ulang lebih jarang, biaya perawatan lebih hemat',

    'contact.eyebrow':       'Mulai Diskusi',
    'contact.title':         'Ceritakan Proyek Anda',
    'contact.sub':           'Tidak ada konsultasi yang terlalu awal. Kami senang berdiskusi — bahkan saat masih di tahap ide.',
    'contact.phone_label':   'Telepon / WhatsApp',
    'contact.email_label':   'Email',
    'contact.address_label': 'Kantor',
    'contact.address':       'Jakarta Selatan, DKI Jakarta',
    'contact.f_name':          'Nama Lengkap',
    'contact.f_name_ph':       'Budi Santoso',
    'contact.f_phone':         'Nomor WhatsApp',
    'contact.f_project_type':  'Jenis Proyek',
    'contact.f_project_ph':    'Pilih jenis proyek...',
    'contact.f_opt_residential':'Hunian Privat',
    'contact.f_opt_commercial': 'Komersial',
    'contact.f_opt_renovation': 'Renovasi',
    'contact.f_opt_interior':   'Interior &amp; Fit-out',
    'contact.f_opt_other':      'Lainnya',
    'contact.f_message':       'Ceritakan Proyeknya',
    'contact.f_message_ph':    'Lokasi, ukuran, anggaran estimasi, timeline...',
    'contact.f_submit':        'Kirim via WhatsApp',
    'contact.f_note':          'Pesan Anda akan dibuka di WhatsApp. Kami biasanya membalas dalam 1 hari kerja.',

    'footer.tagline':       'Kontraktor design-build terintegrasi penuh di Jakarta.',
    'footer.nav_title':     'Navigasi',
    'footer.contact_title': 'Kontak',
    'footer.copyright':     '© 2025 PT. Indobangun Berjaya Konstruksi. Seluruh hak cipta dilindungi.',

    'lotus.back':         'Kembali ke Beranda',
    'lotus.eyebrow':      'Proyek Unggulan · Sedang Berjalan',
    'lotus.headline':     'Rumah Lotus',
    'lotus.sub':          'Hunian tiga lantai di PIK2 — dibangun dengan standar material premium dan teknologi smart home terintegrasi.',
    'lotus.status':       'Konstruksi Berjalan',
    'lotus.stat1_label':  'Luas Bangunan',
    'lotus.stat1_unit':   'm²',
    'lotus.stat2_label':  'Jumlah Lantai',
    'lotus.stat2_unit':   'lantai',
    'lotus.stat3_label':  'Mulai Konstruksi',
    'lotus.stat4_label':  'Target Selesai',
    'lotus.tech_eyebrow': 'Teknologi Bangunan',
    'lotus.tech_title':   'Apa yang Membangun Rumah Lotus',
    'lotus.tech_lead':    'Dua belas sistem teknologi bangunan bekerja bersama — dari pondasi hingga atap hijau.',
    'lotus.tech1_title':  'Pondasi Tiang Pancang',
    'lotus.tech1_text':   'Pondasi bored pile diameter 40cm, kedalaman 12m. Dirancang untuk beban 3 lantai + kolam renang atap.',
    'lotus.tech2_title':  'Struktur Beton K-350',
    'lotus.tech2_text':   'Seluruh kolom dan balok menggunakan beton K-350. Mix design dikontrol oleh laboratorium independen per batch.',
    'lotus.tech3_title':  'Baja Tulangan BJTD-40',
    'lotus.tech3_text':   'Tulangan ulir SNI di seluruh elemen struktural. Lebih kuat 67% dibanding baja polos standar pasar.',
    'lotus.tech4_title':  'Waterproofing Crystalline',
    'lotus.tech4_text':   'Sistem waterproofing kristal pada basement dan lantai dasar. Self-healing — merapatkan retak mikro secara otomatis.',
    'lotus.tech5_title':  'Smart Home Terintegrasi',
    'lotus.tech5_text':   'Sistem otomasi KNX untuk pencahayaan, HVAC, tirai, dan keamanan. Dikontrol via app atau panel sentuh.',
    'lotus.tech6_title':  'HVAC Sistem VRV',
    'lotus.tech6_text':   'Variable refrigerant volume — efisiensi energi hingga 40% lebih tinggi dibanding AC split konvensional.',
    'lotus.tech7_title':  'Panel Surya 10 kWp',
    'lotus.tech7_text':   'Atap dilengkapi 24 panel surya 415Wp dengan inverter hybrid. Estimasi tagihan listrik turun 60–70%.',
    'lotus.tech8_title':  'Atap Hijau (Green Roof)',
    'lotus.tech8_text':   'Lapisan tanaman di dek rooftop — insulasi termal alami, mengurangi beban AC, dan menyerap air hujan.',
    'lotus.tech9_title':  'Instalasi Listrik NYM',
    'lotus.tech9_text':   'Semua kabel NYM 2.5mm² dengan conduit PVC. ELCB per zona. Kapasitas daya 23.000 VA.',
    'lotus.tech10_title': 'Sistem CCTV &amp; Akses',
    'lotus.tech10_text':  '16 kamera IP 4K dengan night vision. Akses pintu via fingerprint + kartu RFID + app.',
    'lotus.tech11_title': 'Plumbing Sistem Dua Jalur',
    'lotus.tech11_text':  'Pipa HDPE untuk air bersih, PVC AW untuk drainase. Instalasi tanpa sambungan di dalam dinding.',
    'lotus.tech12_title': 'Akustik Ruangan',
    'lotus.tech12_text':  'Dinding kamar tidur dengan rockwool insulasi 5cm + gypsum double layer. Reduksi suara 35–40 dB.',
    'lotus.cta_eyebrow':  'Ikuti Progresnya',
    'lotus.cta_title':    'Proyek Ini Masih Berjalan',
    'lotus.cta_sub':      'Update progres konstruksi tersedia untuk klien dan prospek serius. Hubungi kami untuk mendapatkan akses laporan bulanan.',
    'lotus.cta_primary':  'Diskusi via WhatsApp',
    'lotus.cta_secondary':'Kembali ke Beranda'
  },

  /* ──────────────────── ENGLISH ──────────────────── */
  en: {
    'nav.about':         'About',
    'nav.capabilities':  'Capabilities',
    'nav.projects':      'Projects',
    'nav.contact':       'Contact',

    'hero.eyebrow':      'Jakarta · Design-Build Contractor',
    'hero.headline':     'Build Once.<br>Last Twenty Years.',
    'hero.sub':          'PT. Indobangun Berjaya Konstruksi — a fully integrated design-build contractor in Jakarta. One team, one vision, one quality standard.',
    'hero.cta_primary':  'View Our Projects',
    'hero.cta_secondary':'Get in Touch',

    'diff.eyebrow':      'Our Philosophy',
    'diff.title':        'The IBK Difference',
    'diff.lead':         'Many contractors can build. We build to last twenty years — with lower lifetime ownership costs, not just a cheaper initial price.',
    'diff.card1_title':  'Fully Integrated Design-Build',
    'diff.card1_text':   'Our architects, structural engineers, and site team operate under one roof. No communication gaps. No finger-pointing between parties. The result: tighter schedules, better-controlled budgets.',
    'diff.card2_title':  '20-Year Ownership Cost',
    'diff.card2_text':   "We don't just calculate build costs. We calculate electricity, maintenance, and renovation costs over two decades. Materials that cost a little more upfront often save far more in the long run.",
    'diff.card3_title':  'Total Transparency',
    'diff.card3_text':   'Every material decision, every budget change, every progress report — our clients know before we act. Trust is built on data, not promises.',

    'cap.eyebrow':       'What We Do',
    'cap.title':         'Our Capabilities',
    'cap.item1':         'Architectural Design',
    'cap.item2':         'Structural &amp; Civil Engineering',
    'cap.item3':         'MEP — Mechanical, Electrical, Plumbing',
    'cap.item4':         'Interior Design &amp; Finishing',
    'cap.item5':         'Project Management',
    'cap.item6':         'Budget Consultation &amp; Estimation',
    'cap.item7':         'Construction Supervision',
    'cap.item8':         'Permitting &amp; Regulatory Compliance',
    'cap.item9':         'Post-Construction Maintenance',

    'proj.eyebrow':        'Portfolio',
    'proj.title':          'Selected Projects',
    'proj.badge_progress': 'In Progress',
    'proj.badge_done':     'Completed',
    'proj.lotus_type':     'Private Residence · PIK2, Tangerang',
    'proj.lotus_text':     "A three-storey home with integrated smart home system, green roof, and premium reinforced concrete structure. IBK's flagship ongoing project.",
    'proj.cta_follow':     'Follow the Build',
    'proj.villa_type':     'Private Residence · Semarang',
    'proj.villa_text':     'Contemporary tropical villa with teak wood details and natural ventilation. Completed in 14 months.',
    'proj.ruko_type':      'Commercial · Bintaro, South Tangerang',
    'proj.ruko_text':      'Three-storey shophouse row with modern facade and integrated security system. Built in 10 months.',
    'proj.office_type':    'Office · Tangerang',
    'proj.office_text':    'Two-floor office fit-out with open-space layout, acoustic meeting rooms, and smart lighting.',
    'proj.bekasi_type':    'Private Residence · Bekasi',
    'proj.bekasi_text':    'Two-storey family home with indoor garden and swimming pool. Delivered on time in 12 months.',

    'phil.eyebrow':      'Material Standards',
    'phil.title':        'Our Engineering Philosophy',
    'phil.lead':         "We do not compromise on structural materials. Every specification below is IBK's minimum standard — not a paid upgrade.",
    'phil.th_component': 'Component',
    'phil.th_ibk':       'IBK Standard',
    'phil.th_market':    'Market Typical',
    'phil.th_impact':    'Long-term Impact',
    'phil.row1_comp':    'Structural Concrete',
    'phil.row1_ibk':     'K-350 minimum',
    'phil.row1_market':  'K-225 – K-250',
    'phil.row1_impact':  '2× longer resistance to cyclic loading',
    'phil.row2_comp':    'Reinforcing Steel',
    'phil.row2_ibk':     'BJTD-40 SNI',
    'phil.row2_market':  'BJTP-24 or non-SNI',
    'phil.row2_impact':  'Better seismic resistance, lower corrosion risk',
    'phil.row3_comp':    'Waterproofing',
    'phil.row3_ibk':     'Membrane + crystalline',
    'phil.row3_market':  'Standard waterproof paint',
    'phil.row3_impact':  '10-year seepage warranty vs. 1–2 years',
    'phil.row4_comp':    'Electrical Installation',
    'phil.row4_ibk':     'NYM 2.5mm², ELCB',
    'phil.row4_market':  'NYA 1.5mm², standard MCB',
    'phil.row4_impact':  'Higher fire safety, ready for power upgrades',
    'phil.row5_comp':    'Exterior Paint',
    'phil.row5_ibk':     '10-year Weathershield',
    'phil.row5_market':  'Standard exterior paint',
    'phil.row5_impact':  'Less frequent repainting, lower maintenance cost',

    'contact.eyebrow':       'Start a Conversation',
    'contact.title':         'Tell Us About Your Project',
    'contact.sub':           "No consultation is too early. We're happy to talk — even when you're still at the idea stage.",
    'contact.phone_label':   'Phone / WhatsApp',
    'contact.email_label':   'Email',
    'contact.address_label': 'Office',
    'contact.address':       'South Jakarta, DKI Jakarta',
    'contact.f_name':          'Full Name',
    'contact.f_name_ph':       'John Smith',
    'contact.f_phone':         'WhatsApp Number',
    'contact.f_project_type':  'Project Type',
    'contact.f_project_ph':    'Select project type...',
    'contact.f_opt_residential':'Private Residence',
    'contact.f_opt_commercial': 'Commercial',
    'contact.f_opt_renovation': 'Renovation',
    'contact.f_opt_interior':   'Interior &amp; Fit-out',
    'contact.f_opt_other':      'Other',
    'contact.f_message':       'Tell Us About Your Project',
    'contact.f_message_ph':    'Location, size, estimated budget, timeline...',
    'contact.f_submit':        'Send via WhatsApp',
    'contact.f_note':          'Your message will open in WhatsApp. We typically reply within 1 business day.',

    'footer.tagline':       'Fully integrated design-build contractor in Jakarta.',
    'footer.nav_title':     'Navigation',
    'footer.contact_title': 'Contact',
    'footer.copyright':     '© 2025 PT. Indobangun Berjaya Konstruksi. All rights reserved.',

    'lotus.back':         'Back to Home',
    'lotus.eyebrow':      'Flagship Project · In Progress',
    'lotus.headline':     'Rumah Lotus',
    'lotus.sub':          'A three-storey residence in PIK2 — built to premium material standards with fully integrated smart home technology.',
    'lotus.status':       'Construction Underway',
    'lotus.stat1_label':  'Floor Area',
    'lotus.stat1_unit':   'm²',
    'lotus.stat2_label':  'Storeys',
    'lotus.stat2_unit':   'floors',
    'lotus.stat3_label':  'Construction Start',
    'lotus.stat4_label':  'Target Completion',
    'lotus.tech_eyebrow': 'Building Technology',
    'lotus.tech_title':   "What's Building Rumah Lotus",
    'lotus.tech_lead':    'Twelve building technology systems working in concert — from foundation to green roof.',
    'lotus.tech1_title':  'Bored Pile Foundation',
    'lotus.tech1_text':   '40cm diameter bored piles, 12m depth. Engineered for 3-storey load plus rooftop pool.',
    'lotus.tech2_title':  'K-350 Concrete Structure',
    'lotus.tech2_text':   'All columns and beams use K-350 concrete. Mix design verified by independent lab per batch.',
    'lotus.tech3_title':  'BJTD-40 Rebar',
    'lotus.tech3_text':   'SNI-certified deformed rebar throughout all structural elements. 67% stronger than market standard plain bar.',
    'lotus.tech4_title':  'Crystalline Waterproofing',
    'lotus.tech4_text':   'Crystal waterproofing system on basement and ground floor. Self-healing — automatically seals micro-cracks.',
    'lotus.tech5_title':  'Integrated Smart Home',
    'lotus.tech5_text':   'KNX automation for lighting, HVAC, curtains, and security. Controlled via app or touch panel.',
    'lotus.tech6_title':  'VRV HVAC System',
    'lotus.tech6_text':   'Variable refrigerant volume — up to 40% more energy efficient than conventional split-AC.',
    'lotus.tech7_title':  '10 kWp Solar Panels',
    'lotus.tech7_text':   'Roof fitted with 24× 415Wp panels and hybrid inverter. Estimated electricity bill reduction: 60–70%.',
    'lotus.tech8_title':  'Green Roof',
    'lotus.tech8_text':   'Plant layer on rooftop deck — natural thermal insulation, reduced AC load, rainwater absorption.',
    'lotus.tech9_title':  'NYM Electrical System',
    'lotus.tech9_text':   'All wiring NYM 2.5mm² with PVC conduit. ELCB per zone. Total capacity 23,000 VA.',
    'lotus.tech10_title': 'CCTV &amp; Access System',
    'lotus.tech10_text':  '16× 4K IP cameras with night vision. Door access via fingerprint + RFID card + app.',
    'lotus.tech11_title': 'Dual-Circuit Plumbing',
    'lotus.tech11_text':  'HDPE pipe for clean water, PVC AW for drainage. No concealed pipe joints inside walls.',
    'lotus.tech12_title': 'Room Acoustics',
    'lotus.tech12_text':  'Bedroom walls with 5cm rockwool insulation + double-layer gypsum. 35–40 dB sound reduction.',
    'lotus.cta_eyebrow':  'Follow the Build',
    'lotus.cta_title':    'This Project Is Still Running',
    'lotus.cta_sub':      'Construction progress updates are available for clients and serious prospects. Contact us for access to monthly reports.',
    'lotus.cta_primary':  'Chat on WhatsApp',
    'lotus.cta_secondary':'Back to Home'
  }
};

var DEFAULT_LANG = 'id';
var STORAGE_KEY  = 'ibk-lang';

function setLang(lang) {
  if (!translations[lang]) return;
  var t = translations[lang];

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  var idBtn = document.getElementById('lang-id');
  var enBtn = document.getElementById('lang-en');
  if (idBtn) idBtn.classList.toggle('active', lang === 'id');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');

  try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
}

function getLang() {
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'id' || stored === 'en') return stored;
  } catch (_) {}
  return DEFAULT_LANG;
}

function toggleLang() {
  setLang(getLang() === 'id' ? 'en' : 'id');
}

function initI18n() {
  setLang(getLang());
  var toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.addEventListener('click', toggleLang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
