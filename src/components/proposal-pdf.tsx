import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

// Register fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ]
})

const styles = StyleSheet.create({
  // PAGE LAYOUT
  page: { 
    paddingTop: 50,
    paddingBottom: 55,
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  coverPage: {
    paddingTop: 80,
    paddingBottom: 80,
    paddingLeft: 60,
    paddingRight: 60,
    fontFamily: 'Open Sans',
    backgroundColor: '#0f172a', // Deep slate cover
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pageBorder: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    zIndex: -2
  },
  coverPageBorder: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: '#334155',
    zIndex: -2
  },
  pageBorderInner: {
    position: 'absolute',
    top: 24,
    bottom: 24,
    left: 24,
    right: 24,
    borderWidth: 1,
    borderColor: '#b45309', // Gold inner border
    opacity: 0.35,
    zIndex: -2
  },
  coverPageBorderInner: {
    position: 'absolute',
    top: 24,
    bottom: 24,
    left: 24,
    right: 24,
    borderWidth: 1.5,
    borderColor: '#d97706', // Gold inner border
    opacity: 0.6,
    zIndex: -2
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '60%',
    opacity: 0.02,
    zIndex: -1
  },

  // COVER ELEMENTS
  coverLogosContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  coverLogoLarge: {
    width: 80,
    height: 80,
    objectFit: 'contain'
  },
  coverLogoSmall: {
    width: 65,
    height: 65,
    objectFit: 'contain'
  },
  coverTitleContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  coverTitleLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: '#d97706',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  coverTitleMain: {
    fontSize: 28,
    fontWeight: 700,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 1.25,
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  coverSubtitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#94a3b8',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  coverRecipientBox: {
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    marginTop: 60,
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
  },
  coverRecipientLabel: {
    fontSize: 9,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  coverRecipientName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 4,
  },
  coverRecipientInst: {
    fontSize: 12,
    color: '#cbd5e1',
  },
  coverFooterText: {
    fontSize: 9,
    color: '#64748b',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 600,
    textAlign: 'center',
  },

  // HEADER & FOOTER
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 32,
    height: 32,
    objectFit: 'contain'
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  headerSubtitle: {
    fontSize: 8,
    fontWeight: 600,
    color: '#b45309',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 2
  },
  headerMeta: {
    alignItems: 'flex-end',
  },
  headerMetaText: {
    fontSize: 8,
    color: '#64748b',
  },
  headerMetaVal: {
    fontWeight: 700,
    color: '#334155'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 7.5,
    color: '#cbd5e1',
    textTransform: 'uppercase',
    letterSpacing: 1
  },

  // SECTION STYLES
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    marginTop: 10,
  },
  sectionNumber: {
    fontSize: 14,
    fontWeight: 700,
    color: '#b45309',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#334155',
    marginBottom: 10,
    textAlign: 'justify'
  },
  boldText: {
    fontWeight: 700,
    color: '#0f172a',
  },
  italicText: {
    fontStyle: 'italic',
  },

  // VISION / MISSION CARDS
  orgContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0f172a',
  },
  orgContainerGold: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#b45309',
  },
  orgTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  visimisiBlock: {
    marginTop: 8,
  },
  visimisiLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 12,
  },
  bulletDot: {
    width: 12,
    fontSize: 10,
    color: '#b45309',
    fontWeight: 700
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.5,
    color: '#334155',
  },

  // GEOGRAPHIC / DETAILS
  grid2: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  gridCol: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  gridColTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#b45309',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // TABLES (RAB)
  table: { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderRadius: 6, 
    overflow: 'hidden', 
    marginVertical: 8 
  },
  tableRowHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#0f172a', 
    borderBottomWidth: 1, 
    borderBottomColor: '#0f172a' 
  },
  tableRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9',
    alignItems: 'center'
  },
  tableRowAlternating: { 
    flexDirection: 'row', 
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9',
    alignItems: 'center'
  },
  tableRowTotal: { 
    flexDirection: 'row', 
    backgroundColor: '#fffbeb',
    borderTopWidth: 1.5, 
    borderTopColor: '#b45309',
    fontWeight: 700,
    alignItems: 'center'
  },
  tableColHeader: { 
    padding: 8, 
    fontSize: 9, 
    fontWeight: 700, 
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  tableCol: { 
    padding: 8, 
    fontSize: 8.5, 
    color: '#334155' 
  },
  tableColBold: { 
    padding: 8, 
    fontSize: 9, 
    fontWeight: 700, 
    color: '#0f172a' 
  },

  // COMMITTEE LISTS
  committeeSection: {
    marginBottom: 12,
  },
  committeeGroupTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0f172a',
    backgroundColor: '#f1f5f9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  committeeRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8fafc',
  },
  committeeRole: {
    width: '40%',
    fontSize: 9,
    color: '#64748b',
    fontWeight: 600,
  },
  committeeName: {
    width: '60%',
    fontSize: 9,
    color: '#0f172a',
    fontWeight: 700,
  },

  // DONATION BOX
  donationBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#b45309',
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 15,
  },
  donationTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#b45309',
    marginBottom: 10,
    letterSpacing: 1,
  },
  donationDetailsRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  donationDetailItem: {
    alignItems: 'center',
  },
  donationDetailLabel: {
    fontSize: 8,
    color: '#b45309',
    opacity: 0.7,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  donationDetailVal: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
  },

  // SIGNATURES
  signatureSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 15,
  },
  signatureBlock: {
    width: '45%',
    marginBottom: 15,
  },
  signatureRoleHeader: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 35,
    fontWeight: 600,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    marginBottom: 3,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0f172a',
  },
  signatureRole: {
    fontSize: 8.5,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  qrBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  qrCode: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  qrLabel: {
    fontSize: 8,
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
  }
});

// Helper for formatting Currency
const formatIDR = (amount: number) => {
  return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Translations lookup
const t = {
  id: {
    coverTitleLabel: "Proposal Kemitraan",
    coverSubtitle: "Pelayanan Kesehatan Gratis Lintas Sinode",
    toHonorable: "Kepada Yang Terhormat,",
    loveDonor: "Calon Donatur Pelayanan Kasih",
    yearOfMinistry: "Tahun Pelayanan 2026",
    headerTitle: "Bakti Sosial Lintas Sinodal",
    headerSubtitle: "YANKES GPIB & GMIM 2026",
    donationProposal: "Proposal Donasi",
    pageOf: (current: number, total: number) => `Halaman ${current} dari ${total}`,
    docTitle: "Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026",
    
    sec1Num: "I.",
    sec1Title: "Pendahuluan",
    sec1P1: "Kesehatan merupakan kebutuhan dasar yang sangat penting dalam menunjang kualitas hidup masyarakat. Namun, dalam realitas sosial saat ini, masih banyak masyarakat di wilayah Likupang dan Ratahan yang menghadapi keterbatasan akses terhadap layanan kesehatan, baik dari sisi jarak, biaya pemeriksaan, ketersediaan tenaga medis, maupun rendahnya kesadaran pemeriksaan kesehatan secara rutin. Kondisi tersebut berdampak pada meningkatnya risiko penyakit tidak menular maupun penyakit menular, serta masih adanya angka kematian yang dipengaruhi oleh keterlambatan penanganan medis.",
    sec1P2: "Melalui kegiatan bakti sosial ini, Yayasan Kesehatan GPIB berkomitmen untuk mengambil bagian dalam pelayanan kemanusiaan melalui penyediaan layanan kesehatan gratis yang mencakup pemeriksaan umum, konsultasi dokter, pemeriksaan tekanan darah, pemeriksaan gula darah, kolesterol, asam urat, edukasi kesehatan, serta pemberian obat dasar sesuai indikasi medis.",
    sec1P3: "Kegiatan ini diharapkan dapat menjadi bentuk nyata kepedulian terhadap masyarakat, sekaligus mendukung program pemerintah dalam peningkatan derajat kesehatan masyarakat di wilayah-wilayah terpencil di Provinsi Sulawesi Utara. Sinergi antara Yayasan Kesehatan GPIB dan Sinode GMIM menjadi bukti kebersamaan gerejawi untuk melayani sesama manusia tanpa membedakan latar belakang sosial dan golongan.",

    sec2Num: "II.",
    sec2Title: "Profil Organisasi Sinergi",
    gpibTitle: "Gereja Protestan di Indonesia bagian Barat (GPIB)",
    gpibDesc: "Gereja Protestan di Indonesia bagian Barat (disingkat GPIB) adalah persekutuan orang percaya Kristen Protestan di Indonesia dimana Tuhan Yesus Kristus menjadi dasar dan kepalanya. GPIB melaksanakan panggilan dan pengutusan-Nya melalui persekutuan, pelayanan dan kesaksian yang dituangkan dalam Pokok-pokok Kebijakan Umum Pelayanan dan Kesaksian (PKUPPG). GPIB merupakan bagian dari Gereja Protestan di Indonesia (GPI) yang pada zaman Hindia Belanda bernama De Protestantsche Kerk in Nederlandsch-Indie atau Indische Kerk. Pelembagaan dan pembentukan GPIB sebagai gereja bagian mandiri keempat di lingkungan GPI, disetujui dan diputuskan melalui Surat Keputusan Wakil Tinggi Kerajaan Belanda di Indonesia No. 2, tanggal 1 Desember 1948.",
    visi: "Visi",
    gpibVisi: "GPIB menjadi gereja yang mewujudkan damai sejahtera bagi seluruh ciptaan-Nya.",
    misi: "Misi",
    gpibMisi1: "Menjadi Gereja yang terus menerus diperbaharui dengan bertolak dari Firman Allah, yang terwujud dalam perilaku kehidupan warga gereja, baik dalam persekutuan, maupun dalam hidup bermasyarakat.",
    gpibMisi2: "Menjadi gereja yang hadir sebagai contoh kehidupan, yang terwujud melalui inisiatif dan partisipasi dalam kesetiakawanan sosial serta kerukunan dalam masyarakat, dengan berbasis pada perilaku kehidupan keluarga yang kuat dan sejahtera.",
    gpibMisi3: "Menjadi Gereja yang membangun keutuhan ciptaan yang terwujud melalui perhatian terhadap lingkungan hidup, semangat keesaan dan semangat persatuan dan kesatuan warga Gereja sebagai warga masyarakat.",

    gmimTitle: "Gereja Masehi Injili di Minahasa (GMIM)",
    gmimDesc: "Gereja Masehi Injili di Minahasa (GMIM) adalah persekutuan orang-orang Minahasa dan suku lain serta ras lain, yang ada di tanah Minahasa dan di luar tanah Minahasa, yang percaya kepada Yesus Kristus untuk memberitakan perbuatan-perbuatan besar Tuhan Allah dan menjadi berkat bagi orang banyak di manapun dan kapanpun. Dengan bersumber dari kesaksian Alkitab maka dalam Tata Gereja 2021, GMIM merumuskan panggilannya dalam 3 bentuk yakni terpanggil untuk bersekutu, bersaksi, dan melayani.",
    gmimVisi: "GMIM Yang Kudus, Am dan Rasuli (Yang Kudus dipahami sebagai persekutuan orang-orang kudus yang telah dibenarkan dan ditebus; Am dipahami karena pekerjaan Yesus Kristus; Rasuli dipahami karena gereja diutus untuk memberitakan keselamatan).",
    gmimMisi1: "Meningkatkan kualitas karakter dan spiritualitas Kristiani warga Gereja.",
    gmimMisi2: "Meningkatkan pelayanan misi yang holistik bagi keadilan, perdamaian dan kesejahteraan sosial yang menjamin keberlangsungan keutuhan ciptaan.",
    gmimMisi3: "Meningkatkan keesaan bersama Gereja-Gereja di Indonesia dan di seluruh dunia secara oikumenis.",
    gmimMisi4: "Meningkatkan kapasitas kelembagaan GMIM dalam presbiterial sinodal sebagai upaya mewujudkan amanat amanat agung Kristus.",

    sec3Num: "III.",
    sec3Title: "Waktu Dan Tempat Pelaksanaan",
    sec3Text: "Bakti Sosial Lintas Sinodal ini akan diselenggarakan secara maraton pada tanggal 14 s.d. 18 September 2026 dengan membagi tim medis ke dalam tiga wilayah koordinasi pelayanan utama, yaitu:",
    pointA: "Titik A (Mitra)",
    pointADesc: "Desa Tondanouw, Kec. Touluaan, Kabupaten Minahasa Tenggara",
    pointB: "Titik B (Minut)",
    pointBDesc: "Kecamatan Likupang, Kabupaten Minahasa Utara (Pusat Sunatan Massal)",
    pointC: "Titik C (Minahasa)",
    pointCDesc: "Desa Lolah, Kecamatan Tombariri Timur, Kabupaten Minahasa",

    sec4Num: "IV.",
    sec4Title: "Letak Geografis & Demografi Lokasi",
    tondanouwTitle: "Desa Tondanouw (Mitra)",
    tondanouwDesc: "Desa Tondanouw berada di Kecamatan Touluaan, Kabupaten Minahasa Tenggara pada ketinggian ±272 mdpl. Dengan populasi ±1.500 jiwa, masyarakat hidup rukun dalam tradisi gotong royong Mapalus yang kuat. Sebagai salah satu sentra produksi padi utama (lumbung beras) di Minahasa Tenggara, sebagian besar warga berprofesi sebagai petani sawah dan perkebunan.",
    likupangTitle: "Kawasan Likupang (Minut)",
    likupangDesc: "Kawasan Likupang terletak di ujung utara Pulau Sulawesi, berjarak sekitar 60 km dari Kota Manado. Terbagi secara administratif menjadi Likupang Barat, Timur, dan Selatan dengan total populasi ±38.000 jiwa. Sebagian besar masyarakat bekerja sebagai nelayan tradisional dan petani kelapa. Wilayah pesisir strategis ini memiliki tantangan kesehatan tersendiri akibat jarak geografis dari pusat rujukan medis.",
    lolahTitle: "Desa Lolah (Minahasa)",
    lolahDesc: "Desa Lolah berada di Kecamatan Tombariri Timur, Kabupaten Minahasa, memadukan potensi agraris subur dan wilayah pesisir. Dihuni oleh sekitar 1.000 jiwa yang kental dengan adat kekeluargaan, desa ini memiliki keunikan warisan sejarah budaya megalitik yang bernilai tinggi seperti situs waruga dan menhir purba, di samping mata pencaharian warga sebagai petani kelapa dan cengkih.",

    sec5Num: "V.",
    sec5Title: "Bentuk Kegiatan Pelayanan",
    sec5Intro: "Pelayanan kesehatan diselenggarakan secara komprehensif oleh tim dokter spesialis, dokter umum, dokter gigi, perawat, apoteker, dan analis lab dengan bentuk layanan meliputi:",
    service1Title: "Pemeriksaan & Pengobatan Umum: ",
    service1Desc: "Pemeriksaan fisik mendalam, konsultasi medis, serta penanganan keluhan penyakit menular dan tidak menular.",
    service2Title: "Pemeriksaan & Pengobatan Gigi: ",
    service2Desc: "Pemeriksaan gigi dasar, penambalan, pembersihan karang gigi (scaling), dan ekstraksi/pencabutan gigi sesuai indikasi.",
    service3Title: "Bedah Minor (Minor Surgery): ",
    service3Desc: "Operasi kecil untuk mengangkat kista, lipoma, keloid, atau penanganan luka yang membutuhkan penjahitan.",
    service4Title: "Laboratorium Darah Sederhana: ",
    service4Desc: "Skrining instan kadar Gula Darah, Asam Urat, dan Kolesterol untuk mendeteksi risiko metabolik secara dini.",
    service5Title: "Pemberian Kacamata Baca: ",
    service5Desc: "Pengujian visus (ketajaman penglihatan) dan pembagian kacamata baca gratis bagi penderita presbiopia usia lanjut.",
    service6Title: "Sunatan Massal (Khusus Likupang): ",
    service6Desc: "Tindakan sirkumsisi gratis menggunakan metode bedah standar medis steril bagi anak-anak keluarga prasejahtera.",

    sec6Num: "VI.",
    sec6Title: "Rancangan Anggaran Belanja (RAB)",
    expenditurePlan: "1. Rencana Pengeluaran (Alokasi Dana)",
    no: "No",
    budgetDesc: "Pos Anggaran & Keterangan",
    amount: "Jumlah Nominal",
    totalExp: "TOTAL PENGELUARAN KESELURUHAN",
    
    budgetItems: [
      { id: 1, text: "Pembelian obat-obatan, kacamata baca, bahan habis pakai medis, dan instrumen sirkumsisi.", title: "Pelayanan Kesehatan: " },
      { id: 2, text: "Tiket pesawat Jakarta - Manado (PP) untuk tim dokter spesialis dan paramedis.", title: "Transportasi Udara: " },
      { id: 3, text: "Penginapan tim medis selama 5 hari pelaksanaan baksos di 3 titik.", title: "Akomodasi & Penginapan: " },
      { id: 4, text: "Sewa bus operasional dan mobil logistik di lokasi pelayanan.", title: "Transportasi Darat & Bus: " },
      { id: 5, text: "Konsumsi makan berat dan snack tim medis & panitia lokal.", title: "Konsumsi & Logistik Lapangan: " },
      { id: 6, text: "Pembuatan dokumen, sertifikat penghargaan, bagasi, dan transport bandara.", title: "Sekretariat & Transport Bandara: " }
    ],

    incomePlan: "2. Rencana Pemasukan (Sumber Dana)",
    fundingSource: "Sumber Pendanaan",
    totalIncome: "TOTAL RENCANA PEMASUKAN",
    incomeItems: [
      "Alokasi Kas Majelis Sinode GPIB",
      "Pencarian Dana Kemitraan (Proposal & Kartu Sahabat)"
    ],

    sec7Num: "VII.",
    sec7Title: "Susunan Kepanitiaan Lintas Sinode",
    committeeRoles: {
      pengarah: "Dewan Pengarah",
      gpibSinode: "Ketua II Majelis Sinode GPIB",
      gpibYankes: "Ketua Yayasan Kesehatan GPIB",
      harian: "Pelaksana Harian (Inti)",
      ketua: "Ketua Pelaksana",
      ketua1: "Ketua I (Seksi Acara)",
      ketua2: "Ketua II (Seksi Dana)",
      ketua3: "Ketua III (Kesehatan)",
      ketua4: "Ketua IV (Transp. & Akom.)",
      ketua5: "Ketua V (Hubungan Antar Agama)",
      sekretaris: "Sekretaris & Wkl. Sekretaris",
      bendahara: "Bendahara & Wkl. Bendahara",
      acaraDana: "Seksi Acara & Seksi Dana",
      acaraRole: "Sie. Acara (Koordinator & Anggota)",
      danaRole: "Sie. Dana (Koordinator & Anggota)",
      ops: "Seksi Pendukung Operasional",
      transRole: "Sie. Transportasi & Akomodasi",
      logRole: "Sie. Logistik & Sie. Konsumsi",
      pastoralRole: "Tim Pastoral & Tim Doa",
      local: "Seksi / Panitia Lokal Sulawesi Utara",
      localMinut: "Panitia Lokal Minahasa Utara",
      localMin: "Panitia Lokal Minahasa",
      localMitra: "Panitia Lokal Minahasa Tenggara",
      healthRoleTitle: "Seksi Kesehatan & Tim Medis Inti",
      healthRole: "Sie. Kesehatan & Medis"
    },

    sec8Num: "VIII.",
    sec8Title: "Saluran Partisipasi & Donasi Resmi",
    sec8P1: "Sebagai wujud kepedulian bersama untuk menghadirkan pelayanan kesehatan gratis bagi saudara-saudara kita di pelosok Sulawesi Utara, kami mengundang Bapak/Ibu/Saudara/i untuk melimpahkan kasih melalui dukungan donasi secara resmi. Partisipasi dapat disalurkan melalui rekening panitia pusat berikut:",
    officialAccountBox: "REKENING RESMI DONASI BAKSOS",
    bankName: "Nama Bank",
    accNum: "Nomor Rekening",
    beneficiary: "Atas Nama Penerima",
    sec8P2: "Demikian proposal donasi kemitraan ini kami sampaikan. Kami mengucapkan terima kasih yang sebesar-besarnya atas doa, perhatian, dan partisipasi aktif Bapak/Ibu/Saudara/i. Kiranya Tuhan Yesus Kristus senantiasa melimpahkan berkat kesehatan, damai sejahtera, serta melancarkan segala karya dan usaha Bapak/Ibu beserta keluarga. Amin.",
    knowPengarah: "Mengetahui, Dewan Pengarah",
    regardsHarian: "Hormat Kami, Pelaksana Harian",
    fundraisingPic: "Tim Penggalangan Dana, PIC",
    fundraisingPicRole: "PIC / Tim Penggalangan Dana Lapangan",
    officialAuth: "Otentikasi Dokumen Digital Resmi",
    qrLabel: "Pindai kode QR untuk memvalidasi keabsahan data proposal ini secara online di sistem baksos.",
    noLabel: "No",
    dateLabel: "Tanggal",
  },
  en: {
    coverTitleLabel: "Partnership Proposal",
    coverSubtitle: "Free Healthcare Services Across Synods",
    toHonorable: "To the Honorable,",
    loveDonor: "Prospective Donor of Love Ministry",
    yearOfMinistry: "Ministry Year 2026",
    headerTitle: "Cross-Synodal Social Mission",
    headerSubtitle: "YANKES GPIB & GMIM 2026",
    donationProposal: "Donation Proposal",
    pageOf: (current: number, total: number) => `Page ${current} of ${total}`,
    docTitle: "Official Document of the Cross-Synodal Social Mission Committee 2026",

    sec1Num: "I.",
    sec1Title: "Introduction",
    sec1P1: "Health is a fundamental need crucial for supporting community quality of life. However, in current social reality, many people in Likupang and Ratahan regions face limited access to health services, due to distance, medical checkup costs, healthcare worker availability, and low awareness of routine health checks. This condition increases the risk of communicable and non-communicable diseases, alongside mortality rates influenced by delayed medical intervention.",
    sec1P2: "Through this social mission, the GPIB Health Foundation commits to participating in humanitarian services by providing free healthcare including general examinations, doctor consultations, blood pressure checks, blood glucose checks, cholesterol, uric acid, health education, and the distribution of basic medicines according to medical indications.",
    sec1P3: "This activity is expected to be a tangible expression of care for the community, while supporting government programs to improve health standards in remote areas of North Sulawesi Province. The synergy between the GPIB Health Foundation and the GMIM Synod testifies to church togetherness in serving humanity without regard for social background or class.",

    sec2Num: "II.",
    sec2Title: "Synergy Organization Profile",
    gpibTitle: "Protestant Church in Western Indonesia (GPIB)",
    gpibDesc: "The Protestant Church in Western Indonesia (abbreviated as GPIB) is a fellowship of Protestant Christian believers in Indonesia where the Lord Jesus Christ is the foundation and head. GPIB carries out His calling and sending through fellowship, service, and witness, formulated in the General Guidelines for Service and Witness Policies (PKUPPG). GPIB is part of the Protestant Church in Indonesia (GPI), which during the Dutch East Indies era was named De Protestantsche Kerk in Nederlandsch-Indie or Indische Kerk. The institutionalization and establishment of GPIB as the fourth independent member church within the GPI was approved and decided through the Decree of the Deputy High Commissioner of the Kingdom of the Netherlands in Indonesia No. 2, dated December 1, 1948.",
    visi: "Vision",
    gpibVisi: "GPIB becomes a church that realizes peace and prosperity for all His creation.",
    misi: "Mission",
    gpibMisi1: "To be a Church that is continuously renewed, centered on the Word of God, manifested in the behavioral life of church members both in fellowship and in community life.",
    gpibMisi2: "To be a church present as an example of life, manifested through initiative and participation in social solidarity and harmony in society, built on the foundation of strong and prosperous family life.",
    gpibMisi3: "To be a Church that builds the integrity of creation, manifested through care for the environment, the spirit of ecumenism, and the spirit of unity and oneness of church members as citizens.",

    gmimTitle: "Christian Evangelical Church in Minahasa (GMIM)",
    gmimDesc: "The Christian Evangelical Church in Minahasa (GMIM) is a fellowship of Minahasa people, other ethnic groups, and other races, residing in and outside Minahasa land, who believe in Jesus Christ to proclaim the great deeds of the Lord God and be a blessing to many people, wherever and whenever. Based on the testimony of the Bible in the 2021 Church Regulations, GMIM formulates its calling in three forms: being called to fellowship, witness, and serve.",
    gmimVisi: "The Holy, Universal, and Apostolic GMIM (Holy is understood as a communion of saints who have been justified and redeemed; Universal is understood because of the work of Jesus Christ; Apostolic is understood because the church is sent to proclaim salvation).",
    gmimMisi1: "Improving the quality of character and Christian spirituality of church members.",
    gmimMisi2: "Increasing holistic mission services for justice, peace, and social welfare that guarantee the sustainability of creation's integrity.",
    gmimMisi3: "Enhancing ecumenical unity with other churches in Indonesia and worldwide.",
    gmimMisi4: "Increasing GMIM's institutional capacity in presbyterial synodal structures to realize Christ's Great Commission.",

    sec3Num: "III.",
    sec3Title: "Time and Place of Implementation",
    sec3Text: "This Cross-Synodal Social Mission will be held as a marathon from September 14 to 18, 2026, by dividing the medical team into three main service coordination points:",
    pointA: "Point A (Mitra)",
    pointADesc: "Tondanouw Village, Touluaan District, Southeast Minahasa Regency",
    pointB: "Point B (Minut)",
    pointBDesc: "Likupang District, North Minahasa Regency (Mass Circumcision Center)",
    pointC: "Point C (Minahasa)",
    pointCDesc: "Lolah Village, East Tombariri District, Minahasa Regency",

    sec4Num: "IV.",
    sec4Title: "Geographic Location and Demography of Locations",
    tondanouwTitle: "Tondanouw Village (Mitra)",
    tondanouwDesc: "Tondanouw Village is located in Touluaan District, Southeast Minahasa Regency, at an altitude of ±272 meters above sea level. Inhabited by ±1,500 people, the community maintains strong social cohesion through the Mapalus mutual cooperation tradition. As a primary rice production center in Southeast Minahasa, the majority of residents earn their livelihoods as wetland rice farmers and managers of food crop and horticulture plantations.",
    likupangTitle: "Likupang Region (Minut)",
    likupangDesc: "The Likupang region is situated at the northern tip of Sulawesi Island, approximately 60 km from Manado. It is administratively divided into West, East, and South Likupang with a total population of ±38,000. Most residents rely on traditional fishing and coconut farming. This strategic coastal region faces unique healthcare challenges due to its geographic isolation from major referral hospitals.",
    lolahTitle: "Lolah Village (Minahasa)",
    lolahDesc: "Lolah Village is located in East Tombariri District, Minahasa Regency, blending fertile agricultural potential with a coastal environment. Home to approximately 1,000 residents living in close-knit communal harmony, the village is unique for its rich megalithic cultural heritage, including historic waruga (stone graves) and ancient menhirs, alongside residents' livelihoods in coconut and clove farming.",

    sec5Num: "V.",
    sec5Title: "Forms of Service Activities",
    sec5Intro: "Healthcare services are comprehensively organized by a team of medical specialists, general practitioners, dentists, nurses, pharmacists, and lab analysts, with forms of service including:",
    service1Title: "General Examination & Treatment: ",
    service1Desc: "In-depth physical examinations, medical consultations, and treatment of communicable and non-communicable disease complaints.",
    service2Title: "Dental Examination & Treatment: ",
    service2Desc: "Basic dental checkups, fillings, scaling, and tooth extraction as indicated.",
    service3Title: "Minor Surgery: ",
    service3Desc: "Small surgeries to remove cysts, lipomas, keloids, or wound treatment requiring suturing.",
    service4Title: "Simple Blood Laboratory: ",
    service4Desc: "Instant screening of Blood Glucose, Uric Acid, and Cholesterol levels to detect metabolic risks early.",
    service5Title: "Provision of Reading Glasses: ",
    service5Desc: "Visual acuity testing and distribution of free reading glasses for elderly presbyopia sufferers.",
    service6Title: "Mass Circumcision (Likupang Only): ",
    service6Desc: "Free circumcision procedures using sterile standard medical surgical methods for children of underprivileged families.",

    sec6Num: "VI.",
    sec6Title: "Budget Plan (RAB)",
    expenditurePlan: "1. Expenditure Plan (Fund Allocation)",
    no: "No",
    budgetDesc: "Budget Item & Description",
    amount: "Nominal Amount",
    totalExp: "TOTAL OVERALL EXPENDITURE",

    budgetItems: [
      { id: 1, text: "Purchase of medicines, reading glasses, medical consumables, and circumcision instruments.", title: "Healthcare Services: " },
      { id: 2, text: "Round-trip flight tickets Jakarta - Manado for medical specialists and paramedical teams.", title: "Air Transportation: " },
      { id: 3, text: "Lodging of the medical team during the 5 days of social work in the 3 points.", title: "Accommodation & Lodging: " },
      { id: 4, text: "Rental of operational buses and logistics cars at service locations.", title: "Land Transportation & Bus: " },
      { id: 5, text: "Heavy meals and snacks for the medical team & local committee.", title: "Consumption & Field Logistics: " },
      { id: 6, text: "Document production, appreciation certificates, excess baggage, and airport transfers.", title: "Secretariat & Airport Transport: " }
    ],

    incomePlan: "2. Income Plan (Fund Source)",
    fundingSource: "Funding Source",
    totalIncome: "TOTAL INCOME PLAN",
    incomeItems: [
      "Allocation of GPIB Synod Board Cash",
      "Partnership Fundraising (Proposal & Friends Card)"
    ],

    sec7Num: "VII.",
    sec7Title: "Cross-Synodal Committee Structure",
    committeeRoles: {
      pengarah: "Advisory Board",
      gpibSinode: "Vice Chairman II of the GPIB Synod",
      gpibYankes: "Chairperson of the GPIB Health Foundation",
      harian: "Executive Committee (Core)",
      ketua: "Chairman",
      ketua1: "Vice Chairman I (Event Section)",
      ketua2: "Vice Chairman II (Funding Section)",
      ketua3: "Vice Chairman III (Health Section)",
      ketua4: "Vice Chairman IV (Transp. & Accom.)",
      ketua5: "Vice Chairman V (Interfaith Relations)",
      sekretaris: "Secretary & Vice Secretary",
      bendahara: "Treasurer & Vice Treasurer",
      acaraDana: "Event Committee & Funding Committee",
      acaraRole: "Event Div. (Coordinator & Members)",
      danaRole: "Funding Div. (Coordinator & Members)",
      ops: "Operational Supporting Divisions",
      transRole: "Transport & Accommodation Div.",
      logRole: "Logistics & Consumption Div.",
      pastoralRole: "Pastoral & Prayer Team",
      local: "North Sulawesi Local Committees",
      localMinut: "North Minahasa Local Committee",
      localMin: "Minahasa Local Committee",
      localMitra: "Southeast Minahasa Local Committee",
      healthRoleTitle: "Health Section & Core Medical Team",
      healthRole: "Health & Medical Div."
    },

    sec8Num: "VIII.",
    sec8Title: "Official Donation & Participation Channels",
    sec8P1: "As a reflection of our collective care to bring free healthcare services to those in remote areas of North Sulawesi, we invite you to extend your love through official donation support. Participation can be funneled through the official central committee account:",
    officialAccountBox: "OFFICIAL BAKSOS DONATION ACCOUNT",
    bankName: "Bank Name",
    accNum: "Account Number",
    beneficiary: "Beneficiary Name",
    sec8P2: "Thus we present this partnership donation proposal. We express our deepest gratitude for your prayers, attention, and active participation. May the Lord Jesus Christ always bestow blessings of health, peace, and prosper all your work and efforts along with your family. Amen.",
    knowPengarah: "Acknowledged by, Advisory Board",
    regardsHarian: "Respectfully yours, Executive Committee",
    fundraisingPic: "Fundraising Team, PIC",
    fundraisingPicRole: "PIC / Field Fundraising Team",
    officialAuth: "Official Digital Document Authentication",
    qrLabel: "Scan the QR code to validate the authenticity of this proposal online in the baksos system.",
    noLabel: "No",
    dateLabel: "Date",
  }
};

export const ProposalPDF = ({ data, lang = 'id' }: { data: any; lang?: 'id' | 'en' }) => {
  const strings = t[lang] || t.id;

  const currentDate = new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Document>
      {/* ==================== PAGE 1: COVER ==================== */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverPageBorder} fixed />
        <View style={styles.coverPageBorderInner} fixed />

        {/* Top logos */}
        <View style={styles.coverLogosContainer}>
          <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gpib.png" style={styles.coverLogoLarge} />
          <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.coverLogoLarge} />
          <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gmim.png" style={styles.coverLogoSmall} />
        </View>

        {/* Title center */}
        <View style={styles.coverTitleContainer}>
          <Text style={styles.coverTitleLabel}>{strings.coverTitleLabel}</Text>
          <Text style={styles.coverTitleMain}>
            {lang === 'id' ? "BAKTI SOSIAL\nLINTAS SINODAL 2026" : "CROSS-SYNODAL\nSOCIAL MISSION 2026"}
          </Text>
          <Text style={styles.coverSubtitle}>{strings.coverSubtitle}</Text>
        </View>

        {/* Recipient info & proposal meta */}
        <View style={styles.coverRecipientBox}>
          <Text style={styles.coverRecipientLabel}>{strings.toHonorable}</Text>
          <Text style={styles.coverRecipientName}>{data.donor_name}</Text>
          {data.institution ? (
            <Text style={styles.coverRecipientInst}>{data.institution}</Text>
          ) : (
            <Text style={styles.coverRecipientInst}>{strings.loveDonor}</Text>
          )}

          <View style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 8, color: '#94a3b8', fontWeight: 600 }}>{strings.noLabel}: {data.proposal_number}</Text>
            <Text style={{ fontSize: 8, color: '#94a3b8', fontWeight: 600 }}>{strings.dateLabel}: {currentDate}</Text>
          </View>
        </View>

        {/* Footer info */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.coverFooterText}>YAYASAN KESEHATAN GPIB & SINODE GMIM</Text>
          <Text style={{ ...styles.coverFooterText, fontSize: 8, color: '#475569', marginTop: 4 }}>{strings.yearOfMinistry}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 2: PENDAHULUAN ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        {/* Section title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec1Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec1Title}</Text>
        </View>

        {/* Content paragraphs */}
        <Text style={styles.text}>{strings.sec1P1}</Text>
        <Text style={styles.text}>{strings.sec1P2}</Text>
        <Text style={styles.text}>{strings.sec1P3}</Text>

        {data.message && (
          <View style={{ marginTop: 20, padding: 12, backgroundColor: '#fffbeb', borderLeftWidth: 3, borderLeftColor: '#d97706', borderRadius: 4 }}>
            <Text style={{ ...styles.text, fontStyle: 'italic', color: '#b45309', marginBottom: 0 }}>
              &quot;{data.message}&quot;
            </Text>
          </View>
        )}

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(2, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 3: PROFIL ORGANISASI ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec2Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec2Title}</Text>
        </View>

        {/* Organisasi 1: GPIB */}
        <View style={styles.orgContainer}>
          <Text style={styles.orgTitle}>{strings.gpibTitle}</Text>
          <Text style={styles.text}>{strings.gpibDesc}</Text>
          <View style={styles.visimisiBlock}>
            <Text style={styles.visimisiLabel}>{strings.visi}</Text>
            <Text style={{ ...styles.text, marginBottom: 5 }}>{strings.gpibVisi}</Text>
            <Text style={styles.visimisiLabel}>{strings.misi}</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>1.</Text>
              <Text style={styles.bulletText}>{strings.gpibMisi1}</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>2.</Text>
              <Text style={styles.bulletText}>{strings.gpibMisi2}</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>3.</Text>
              <Text style={styles.bulletText}>{strings.gpibMisi3}</Text>
            </View>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(3, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 4: PROFIL GMIM & LOKASI ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        {/* Organisasi 2: GMIM */}
        <View style={styles.orgContainerGold}>
          <Text style={styles.orgTitle}>{strings.gmimTitle}</Text>
          <Text style={styles.text}>{strings.gmimDesc}</Text>
          <View style={styles.visimisiBlock}>
            <Text style={styles.visimisiLabel}>{strings.visi}</Text>
            <Text style={{ ...styles.text, marginBottom: 5 }}>{strings.gmimVisi}</Text>
            <Text style={styles.visimisiLabel}>{strings.misi}</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>1.</Text>
              <Text style={styles.bulletText}>{strings.gmimMisi1}</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>2.</Text>
              <Text style={styles.bulletText}>{strings.gmimMisi2}</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>3.</Text>
              <Text style={styles.bulletText}>{strings.gmimMisi3}</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>4.</Text>
              <Text style={styles.bulletText}>{strings.gmimMisi4}</Text>
            </View>
          </View>
        </View>

        {/* Section title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec3Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec3Title}</Text>
        </View>

        <Text style={styles.text}>{strings.sec3Text}</Text>

        <View style={styles.grid2}>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>{strings.pointA}</Text>
            <Text style={{ ...styles.text, fontSize: 8.5, marginBottom: 0 }}>{strings.pointADesc}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>{strings.pointB}</Text>
            <Text style={{ ...styles.text, fontSize: 8.5, marginBottom: 0 }}>{strings.pointBDesc}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>{strings.pointC}</Text>
            <Text style={{ ...styles.text, fontSize: 8.5, marginBottom: 0 }}>{strings.pointCDesc}</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(4, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 5: GEOGRAFIS & BENTUK KEGIATAN ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec4Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec4Title}</Text>
        </View>

        <View style={styles.grid2}>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>{strings.tondanouwTitle}</Text>
            <Text style={{ ...styles.text, fontSize: 8, lineHeight: 1.5 }}>{strings.tondanouwDesc}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>{strings.likupangTitle}</Text>
            <Text style={{ ...styles.text, fontSize: 8, lineHeight: 1.5 }}>{strings.likupangDesc}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>{strings.lolahTitle}</Text>
            <Text style={{ ...styles.text, fontSize: 8, lineHeight: 1.5 }}>{strings.lolahDesc}</Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec5Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec5Title}</Text>
        </View>

        <Text style={styles.text}>{strings.sec5Intro}</Text>

        <View style={{ paddingLeft: 10 }}>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>{strings.service1Title}</Text>
              {strings.service1Desc}
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>{strings.service2Title}</Text>
              {strings.service2Desc}
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>{strings.service3Title}</Text>
              {strings.service3Desc}
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>{strings.service4Title}</Text>
              {strings.service4Desc}
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>{strings.service5Title}</Text>
              {strings.service5Desc}
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldText}>{strings.service6Title}</Text>
              {strings.service6Desc}
            </Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(5, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 6: RANCANGAN ANGGARAN ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec6Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec6Title}</Text>
        </View>

        {/* Tabel Pengeluaran */}
        <Text style={{ ...styles.boldText, fontSize: 10, marginBottom: 4, textTransform: 'uppercase' }}>{strings.expenditurePlan}</Text>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={{ ...styles.tableColHeader, width: '10%' }}>{strings.no}</Text>
            <Text style={{ ...styles.tableColHeader, width: '60%' }}>{strings.budgetDesc}</Text>
            <Text style={{ ...styles.tableColHeader, width: '30%', textAlign: 'right' }}>{strings.amount}</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>1</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>{strings.budgetItems[0].title}</Text>{strings.budgetItems[0].text}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(420000000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>2</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>{strings.budgetItems[1].title}</Text>{strings.budgetItems[1].text}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(100000000)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>3</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>{strings.budgetItems[2].title}</Text>{strings.budgetItems[2].text}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(90000000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>4</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>{strings.budgetItems[3].title}</Text>{strings.budgetItems[3].text}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(70000000)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>5</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>{strings.budgetItems[4].title}</Text>{strings.budgetItems[4].text}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(56700000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>6</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>{strings.budgetItems[5].title}</Text>{strings.budgetItems[5].text}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(37800000)}</Text>
          </View>

          <View style={styles.tableRowTotal}>
            <Text style={{ ...styles.tableColBold, width: '10%' }}></Text>
            <Text style={{ ...styles.tableColBold, width: '60%' }}>{strings.totalExp}</Text>
            <Text style={{ ...styles.tableColBold, width: '30%', textAlign: 'right', color: '#b45309' }}>{formatIDR(774500000)}</Text>
          </View>
        </View>

        {/* Tabel Pemasukan */}
        <Text style={{ ...styles.boldText, fontSize: 10, marginBottom: 4, marginTop: 12, textTransform: 'uppercase' }}>{strings.incomePlan}</Text>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={{ ...styles.tableColHeader, width: '10%' }}>{strings.no}</Text>
            <Text style={{ ...styles.tableColHeader, width: '60%' }}>{strings.fundingSource}</Text>
            <Text style={{ ...styles.tableColHeader, width: '30%', textAlign: 'right' }}>{strings.amount}</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>1</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}>{strings.incomeItems[0]}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(50000000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>2</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}>{strings.incomeItems[1]}</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(724500000)}</Text>
          </View>

          <View style={styles.tableRowTotal}>
            <Text style={{ ...styles.tableColBold, width: '10%' }}></Text>
            <Text style={{ ...styles.tableColBold, width: '60%' }}>{strings.totalIncome}</Text>
            <Text style={{ ...styles.tableColBold, width: '30%', textAlign: 'right', color: '#b45309' }}>{formatIDR(774500000)}</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(6, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 7: SUSUNAN KEPANITIAAN 1 ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec7Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec7Title}</Text>
        </View>

        {/* Pengarah */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>{strings.committeeRoles.pengarah}</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.gpibSinode}</Text>
            <Text style={styles.committeeName}>Pdt. Semuel A. Z. Karinda, M.Si.</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.gpibYankes}</Text>
            <Text style={styles.committeeName}>dr. Griselda P. S. Aer, Sp.KP</Text>
          </View>
        </View>

        {/* Pelaksana Inti */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>{strings.committeeRoles.harian}</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.ketua}</Text>
            <Text style={styles.committeeName}>Pdt. Jan Jona Lumanauw</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.ketua1}</Text>
            <Text style={styles.committeeName}>Pnt. Inno Wiesje Subagyono Logor (Jkt) / Ibu Desye Syul L. (Mdo)</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.ketua2}</Text>
            <Text style={styles.committeeName}>Pnt. Reni Kanter</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.ketua3}</Text>
            <Text style={styles.committeeName}>drg. Lanny Ranti</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.ketua4}</Text>
            <Text style={styles.committeeName}>Pnt. Tommy Masinambouw</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.ketua5}</Text>
            <Text style={styles.committeeName}>Dkn. Denny Tewu</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.sekretaris}</Text>
            <Text style={styles.committeeName}>Pnt. Adri Manafe / Dkn. Inang M. K. Kaloke / Sdri. Anggita C. F.</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.bendahara}</Text>
            <Text style={styles.committeeName}>Ibu Yetje Sumual / Dkn. Lady Tangkere-Sondakh / Ibu Karema Rumambi</Text>
          </View>
        </View>

        {/* Sie Acara & Sie Dana */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>{strings.committeeRoles.acaraDana}</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.acaraRole}</Text>
            <Text style={styles.committeeName}>Pdt. Marthen Leiwakabessy (Koord) / Pdt. Danny Titaley / Ibu Marcela Lantang</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.danaRole}</Text>
            <Text style={styles.committeeName}>Dkn. Yvone Wakkary (Koord) / Pnt. Antje Kanter / Pnt. Max Roring / Dkn. Ellen Tahalele / Ibu Nancy R. Damping / Dkn. Vicora Van der Muur / Ibu Diana Johanes / Ibu Tine Sigarlaki</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(7, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 8: SUSUNAN KEPANITIAAN 2 ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        {/* Seksi Pendukung */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>{strings.committeeRoles.ops}</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.transRole}</Text>
            <Text style={styles.committeeName}>Bpk. Edward Kanter (Koord) / Ibu Esther Polii / Dkn. Daniel F. Lolo / Dkn. Okta Friyanto / Pnt. Heince Tumewu / Bpk. Agus Patty</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.logRole}</Text>
            <Text style={styles.committeeName}>Pnt. Sahat Sianipar (Logistik Koord) / Ibu Revny Longkutoy (Konsumsi Koord) / Dkn. Wulan Sanggelorang</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.pastoralRole}</Text>
            <Text style={styles.committeeName}>Pdt. Johny A. Lontoh (Koord) / Pdt. Sealthiel Izaak / Pdt. Asachristo</Text>
          </View>
        </View>

        {/* Panitia Lokal */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>{strings.committeeRoles.local}</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.localMinut}</Text>
            <Text style={styles.committeeName}>Bpk. Edwien Moniaga / Ibu Yanny Siraya S. P., SIP / Bpk. Saldy Jacob, S.Pd / Bpk. Butje F. Maramis / Bpk. Edward Sumual / Ibu Wulan Badahura / Tim Medis Setempat</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.localMin}</Text>
            <Text style={styles.committeeName}>Ibu Gracia Y. Oroh / Ibu Paula Makalew / Ibu Josephin I. Rompas / Tim Medis Setempat</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.localMitra}</Text>
            <Text style={styles.committeeName}>Bpk. Raymond Sumual, S.TEOL / Ibu Vanda Rantung / Bpk. Arther Runturambi / Bpk. Chris Rumansi / Ibu Yanti Tumbol / Bpk. Ezra Sengkey / Bpk. Rio Lembong / Bpk. Lando Sumarauw / Ibu Priscillia Warouw / Ibu Yulita C. Mangundap / Ibu Nathalia KM Mamoto / Tim Medis Setempat</Text>
          </View>
        </View>

        {/* Sie Kesehatan */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>{strings.committeeRoles.healthRoleTitle}</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>{strings.committeeRoles.healthRole}</Text>
            <Text style={styles.committeeName}>Dkn. dr. Netty Selanno (Koord) / Pnt. dr. Clevy P. / drg. Iphighenia M. / drg. Feylia / dr. Theo Resilowi / Bpk. Toni Irawan / Dkn. Nancy Wehantouw</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(8, 9)}</Text>
        </View>
      </Page>

      {/* ==================== PAGE 9: SALURAN DONASI & PENGESAHAN ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header template */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.headerLeft}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>{strings.headerTitle}</Text>
              <Text style={styles.headerSubtitle}>{strings.headerSubtitle}</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>{strings.noLabel}: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>{strings.donationProposal}</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>{strings.sec8Num}</Text>
          <Text style={styles.sectionTitle}>{strings.sec8Title}</Text>
        </View>

        <Text style={styles.text}>{strings.sec8P1}</Text>

        {/* Box Rekening Mandiri */}
        <View style={styles.donationBox}>
          <Text style={styles.donationTitle}>{strings.officialAccountBox}</Text>
          <View style={styles.donationDetailsRow}>
            <View style={styles.donationDetailItem}>
              <Text style={styles.donationDetailLabel}>{strings.bankName}</Text>
              <Text style={styles.donationDetailVal}>Bank Mandiri</Text>
            </View>
            <View style={styles.donationDetailItem}>
              <Text style={styles.donationDetailLabel}>{strings.accNum}</Text>
              <Text style={{ ...styles.donationDetailVal, letterSpacing: 1.5 }}>115-00-0240902-6</Text>
            </View>
            <View style={styles.donationDetailItem}>
              <Text style={styles.donationDetailLabel}>{strings.beneficiary}</Text>
              <Text style={styles.donationDetailVal}>YAYASAN KESEHATAN GPIB (Bakti Sosial)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.text}>{strings.sec8P2}</Text>

        {/* Tanda Tangan */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>{strings.knowPengarah}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>dr. Griselda P. S. Aer, Sp.KP</Text>
            <Text style={styles.signatureRole}>{lang === 'id' ? "Ketua Yayasan Kesehatan GPIB" : "Chairperson of GPIB Health Foundation"}</Text>
          </View>
          
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>{strings.knowPengarah}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>Pdt. Semuel A. Z. Karinda, M.Si.</Text>
            <Text style={styles.signatureRole}>{lang === 'id' ? "Ketua II Majelis Sinode GPIB" : "Vice Chairman II of the GPIB Synod Board"}</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>{strings.regardsHarian}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>Pdt. Jan Jona Lumanauw</Text>
            <Text style={styles.signatureRole}>{lang === 'id' ? "Ketua Pelaksana Panitia Baksos 2026" : "Chairman of Baksos Committee 2026"}</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>{strings.fundraisingPic}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{data.committee_name || (lang === 'id' ? 'Panitia Pelaksana' : 'Organizing Committee')}</Text>
            <Text style={styles.signatureRole}>{strings.fundraisingPicRole}</Text>
          </View>
        </View>

        {/* QR Code and Validation */}
        <View style={styles.qrBlock}>
          <Image 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://baksos-yankes.id/verify/${data.proposal_number}&color=0f172a&bgcolor=ffffff`} 
            style={styles.qrCode} 
          />
          <Text style={{ ...styles.signatureName, fontSize: 8.5 }}>{strings.officialAuth}</Text>
          <Text style={styles.qrLabel}>{strings.qrLabel}</Text>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{strings.docTitle}</Text>
          <Text style={styles.footerText}>{strings.pageOf(9, 9)}</Text>
        </View>
      </Page>
    </Document>
  );
};
