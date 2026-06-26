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
    backgroundColor: '#1e293b/30',
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
})

// Helper for formatting Currency
const formatIDR = (amount: number) => {
  return "Rp " + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const ProposalPDF = ({ data }: { data: any }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
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
          <Text style={styles.coverTitleLabel}>Proposal Kemitraan</Text>
          <Text style={styles.coverTitleMain}>BAKTI SOSIAL{"\n"}LINTAS SINODAL 2026</Text>
          <Text style={styles.coverSubtitle}>Pelayanan Kesehatan Gratis Lintas Sinode</Text>
        </View>

        {/* Recipient info */}
        <View style={styles.coverRecipientBox}>
          <Text style={styles.coverRecipientLabel}>Kepada Yang Terhormat,</Text>
          <Text style={styles.coverRecipientName}>{data.donor_name}</Text>
          {data.institution ? (
            <Text style={styles.coverRecipientInst}>{data.institution}</Text>
          ) : (
            <Text style={styles.coverRecipientInst}>Calon Donatur Pelayanan Kasih</Text>
          )}
        </View>

        {/* Footer info */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.coverFooterText}>YAYASAN KESEHATAN GPIB & SINODE GMIM</Text>
          <Text style={{ ...styles.coverFooterText, fontSize: 8, color: '#475569', marginTop: 4 }}>Tahun Pelayanan 2026</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        {/* Section title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>I.</Text>
          <Text style={styles.sectionTitle}>Pendahuluan</Text>
        </View>

        {/* Content paragraphs */}
        <Text style={styles.text}>
          Kesehatan merupakan kebutuhan dasar yang sangat penting dalam menunjang kualitas hidup masyarakat. Namun, dalam realitas sosial saat ini, masih banyak masyarakat di wilayah Likupang dan Ratahan yang menghadapi keterbatasan akses terhadap layanan kesehatan, baik dari sisi jarak, biaya pemeriksaan, ketersediaan tenaga medis, maupun rendahnya kesadaran pemeriksaan kesehatan secara rutin. Kondisi tersebut berdampak pada meningkatnya risiko penyakit tidak menular maupun penyakit menular, serta masih adanya angka kematian yang dipengaruhi oleh keterlambatan penanganan medis.
        </Text>

        <Text style={styles.text}>
          Melalui kegiatan bakti sosial ini, Yayasan Kesehatan GPIB berkomitmen untuk mengambil bagian dalam pelayanan kemanusiaan melalui penyediaan layanan kesehatan gratis yang mencakup pemeriksaan umum, konsultasi dokter, pemeriksaan tekanan darah, pemeriksaan gula darah, kolesterol, asam urat, kesehatan gratis yang mencakup pemeriksaan umum, konsultasi dokter, pemeriksaan tekanan darah, pemeriksaan gula darah, kolesterol, asam urat, edukasi kesehatan, serta pemberian obat dasar sesuai indikasi medis.
        </Text>

        <Text style={styles.text}>
          Kegiatan ini diharapkan dapat menjadi bentuk nyata kepedulian terhadap masyarakat, sekaligus mendukung program pemerintah dalam peningkatan derajat kesehatan masyarakat di wilayah-wilayah terpencil di Provinsi Sulawesi Utara. Sinergi antara Yayasan Kesehatan GPIB dan Sinode GMIM menjadi bukti kebersamaan gerejawi untuk melayani sesama manusia tanpa membedakan latar belakang sosial dan golongan.
        </Text>

        {data.message && (
          <View style={{ marginTop: 20, padding: 12, backgroundColor: '#fffbeb', borderLeftWidth: 3, borderLeftColor: '#d97706', borderRadius: 4 }}>
            <Text style={{ ...styles.text, fontStyle: 'italic', color: '#b45309', marginBottom: 0 }}>
              &quot;{data.message}&quot;
            </Text>
          </View>
        )}

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 2 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>II.</Text>
          <Text style={styles.sectionTitle}>Profil Organisasi Sinergi</Text>
        </View>

        {/* Organisasi 1: GPIB */}
        <View style={styles.orgContainer}>
          <Text style={styles.orgTitle}>Gereja Protestan di Indonesia bagian Barat (GPIB)</Text>
          <Text style={styles.text}>
            Gereja Protestan di Indonesia bagian Barat (disingkat GPIB) adalah persekutuan orang percaya Kristen Protestan di Indonesia dimana Tuhan Yesus Kristus menjadi dasar dan kepalanya. GPIB melaksanakan panggilan dan pengutusan-Nya melalui persekutuan, pelayanan dan kesaksian yang dituangkan dalam Pokok-pokok Kebijakan Umum Pelayanan dan Kesaksian (PKUPPG). GPIB merupakan bagian dari Gereja Protestan di Indonesia (GPI) yang pada zaman Hindia Belanda bernama De Protestantsche Kerk in Nederlandsch-Indie atau Indische Kerk. Pelembagaan dan pembentukan GPIB sebagai gereja bagian mandiri keempat di lingkungan GPI, disetujui dan diputuskan melalui Surat Keputusan Wakil Tinggi Kerajaan Belanda di Indonesia No. 2, tanggal 1 Desember 1948.
          </Text>
          <View style={styles.visimisiBlock}>
            <Text style={styles.visimisiLabel}>Visi</Text>
            <Text style={{ ...styles.text, marginBottom: 5 }}>GPIB menjadi gereja yang mewujudkan damai sejahtera bagi seluruh ciptaan-Nya.</Text>
            <Text style={styles.visimisiLabel}>Misi</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>1.</Text>
              <Text style={styles.bulletText}>Menjadi Gereja yang terus menerus diperbaharui dengan bertolak dari Firman Allah, yang terwujud dalam perilaku kehidupan warga gereja, baik dalam persekutuan, maupun dalam hidup bermasyarakat.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>2.</Text>
              <Text style={styles.bulletText}>Menjadi gereja yang hadir sebagai contoh kehidupan, yang terwujud melalui inisiatif dan partisipasi dalam kesetiakawanan sosial serta kerukunan dalam masyarakat, dengan berbasis pada perilaku kehidupan keluarga yang kuat dan sejahtera.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>3.</Text>
              <Text style={styles.bulletText}>Menjadi Gereja yang membangun keutuhan ciptaan yang terwujud melalui perhatian terhadap lingkungan hidup, semangat keesaan dan semangat persatuan dan kesatuan warga Gereja sebagai warga masyarakat.</Text>
            </View>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 3 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        {/* Organisasi 2: GMIM */}
        <View style={styles.orgContainerGold}>
          <Text style={styles.orgTitle}>Gereja Masehi Injili di Minahasa (GMIM)</Text>
          <Text style={styles.text}>
            Gereja Masehi Injili di Minahasa (GMIM) adalah persekutuan orang-orang Minahasa dan suku lain serta ras lain, yang ada di tanah Minahasa dan di luar tanah Minahasa, yang percaya kepada Yesus Kristus untuk memberitakan perbuatan-perbuatan besar Tuhan Allah dan menjadi berkat bagi orang banyak di manapun dan kapanpun. Dengan bersumber dari kesaksian Alkitab maka dalam Tata Gereja 2021, GMIM merumuskan panggilannya dalam 3 bentuk yakni terpanggil untuk bersekutu, bersaksi, dan melayani.
          </Text>
          <View style={styles.visimisiBlock}>
            <Text style={styles.visimisiLabel}>Visi</Text>
            <Text style={{ ...styles.text, marginBottom: 5 }}>GMIM Yang Kudus, Am dan Rasuli (Yang Kudus dipahami sebagai persekutuan orang-orang kudus yang telah dibenarkan dan ditebus; Am dipahami karena pekerjaan Yesus Kristus; Rasuli dipahami karena gereja diutus untuk memberitakan keselamatan).</Text>
            <Text style={styles.visimisiLabel}>Misi</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>1.</Text>
              <Text style={styles.bulletText}>Meningkatkan kualitas karakter dan spiritualitas Kristiani warga Gereja.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>2.</Text>
              <Text style={styles.bulletText}>Meningkatkan pelayanan misi yang holistik bagi keadilan, perdamaian dan kesejahteraan sosial yang menjamin keberlangsungan keutuhan ciptaan.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>3.</Text>
              <Text style={styles.bulletText}>Meningkatkan keesaan bersama Gereja-Gereja di Indonesia dan di seluruh dunia secara oikumenis.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletDot}>4.</Text>
              <Text style={styles.bulletText}>Meningkatkan kapasitas kelembagaan GMIM dalam presbiterial sinodal sebagai upaya mewujudkan amanat amanat agung Kristus.</Text>
            </View>
          </View>
        </View>

        {/* Section title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>III.</Text>
          <Text style={styles.sectionTitle}>Waktu Dan Tempat Pelaksanaan</Text>
        </View>

        <Text style={styles.text}>
          Bakti Sosial Lintas Sinodal ini akan diselenggarakan secara maraton pada tanggal <Text style={styles.boldText}>14 s.d. 18 September 2026</Text> dengan membagi tim medis ke dalam tiga wilayah koordinasi pelayanan utama, yaitu:
        </Text>

        <View style={styles.grid2}>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>Titik A (Mitra)</Text>
            <Text style={{ ...styles.text, fontSize: 8.5, marginBottom: 0 }}>
              Desa Tondanouw, Kec. Touluaan, Kabupaten Minahasa Tenggara
            </Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>Titik B (Minut)</Text>
            <Text style={{ ...styles.text, fontSize: 8.5, marginBottom: 0 }}>
              Kecamatan Likupang, Kabupaten Minahasa Utara (Pusat Sunatan Massal)
            </Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>Titik C (Minahasa)</Text>
            <Text style={{ ...styles.text, fontSize: 8.5, marginBottom: 0 }}>
              Desa Lolah, Kecamatan Tombariri Timur, Kabupaten Minahasa
            </Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 4 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>IV.</Text>
          <Text style={styles.sectionTitle}>Letak Geografis & Demografi Lokasi</Text>
        </View>

        <View style={styles.grid2}>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>Desa Tondanouw (Mitra)</Text>
            <Text style={{ ...styles.text, fontSize: 8, lineHeight: 1.5 }}>
              Tondanouw berada di Kecamatan Touluaan, Kabupaten Minahasa Tenggara pada ketinggian ±272 mdpl. Dengan jumlah penduduk ±1.500 jiwa, masyarakat hidup rukun dalam gotong royong yang kuat. Mayoritas bekerja di bidang pertanian padi sawah (sentra produksi padi) dan perkebunan tanaman pangan/hortikultura.
            </Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.gridColTitle}>Kawasan Likupang (Minut)</Text>
            <Text style={{ ...styles.text, fontSize: 8, lineHeight: 1.5 }}>
              Likupang berjarak ±60 km dari Kota Manado di ujung utara Pulau Sulawesi. Secara administrasi terbagi menjadi: Likupang Barat (±16.988 jiwa), Likupang Timur (±16.519 jiwa), dan Likupang Selatan (±4.958 jiwa) dengan total populasi kawasan sekitar ±38.000 jiwa yang sebagian besar bermata pencaharian sebagai nelayan dan berkebun.
            </Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>V.</Text>
          <Text style={styles.sectionTitle}>Bentuk Kegiatan Pelayanan</Text>
        </View>

        <Text style={styles.text}>
          Pelayanan kesehatan diselenggarakan secara komprehensif oleh tim dokter spesialis, dokter umum, dokter gigi, perawat, apoteker, dan analis lab dengan bentuk layanan meliputi:
        </Text>

        <View style={{ paddingLeft: 10 }}>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.boldText}>Pemeriksaan & Pengobatan Umum:</Text> Pemeriksaan fisik mendalam, konsultasi medis, serta penanganan keluhan penyakit menular dan tidak menular.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.boldText}>Pemeriksaan & Pengobatan Gigi:</Text> Pemeriksaan gigi dasar, penambalan, pembersihan karang gigi (scaling), dan ekstraksi/pencabutan gigi sesuai indikasi.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.boldText}>Bedah Minor (Minor Surgery):</Text> Operasi kecil untuk mengangkat kista, lipoma, keloid, atau penanganan luka yang membutuhkan penjahitan.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.boldText}>Laboratorium Darah Sederhana:</Text> Skrining instan kadar Gula Darah, Asam Urat, dan Kolesterol untuk mendeteksi risiko metabolik secara dini.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.boldText}>Pemberian Kacamata Baca:</Text> Pengujian visus (ketajaman penglihatan) dan pembagian kacamata baca gratis bagi penderita presbiopia usia lanjut.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={styles.boldText}>Sunatan Massal (Khusus Likupang):</Text> Tindakan sirkumsisi gratis menggunakan metode bedah standar medis steril bagi anak-anak keluarga prasejahtera.</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 5 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>VI.</Text>
          <Text style={styles.sectionTitle}>Rancangan Anggaran Belanja (RAB)</Text>
        </View>

        {/* Tabel Pengeluaran */}
        <Text style={{ ...styles.boldText, fontSize: 10, marginBottom: 4, textTransform: 'uppercase' }}>1. Rencana Pengeluaran (Alokasi Dana)</Text>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={{ ...styles.tableColHeader, width: '10%' }}>No</Text>
            <Text style={{ ...styles.tableColHeader, width: '60%' }}>Pos Anggaran & Keterangan</Text>
            <Text style={{ ...styles.tableColHeader, width: '30%', textAlign: 'right' }}>Jumlah Nominal</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>1</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>Pelayanan Kesehatan:</Text> Pembelian obat-obatan, kacamata baca, bahan habis pakai medis, dan instrumen sirkumsisi.</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(100000000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>2</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>Transportasi Udara:</Text> Tiket pesawat Jakarta - Manado (PP) untuk tim dokter spesialis dan paramedis.</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(420000000)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>3</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>Akomodasi & Penginapan:</Text> Penginapan tim medis selama 5 hari pelaksanaan baksos di 3 titik.</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(90000000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>4</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>Transportasi Darat & Bus:</Text> Sewa bus operasional dan mobil logistik di lokasi pelayanan.</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(70000000)}</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>5</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>Konsumsi & Logistik Lapangan:</Text> Konsumsi makan berat dan snack tim medis & panitia lokal.</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(56700000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>6</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}><Text style={styles.boldText}>Sekretariat & Transport Bandara:</Text> Pembuatan dokumen, sertifikat penghargaan, bagasi, dan transport bandara.</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(37800000)}</Text>
          </View>

          <View style={styles.tableRowTotal}>
            <Text style={{ ...styles.tableColBold, width: '10%' }}></Text>
            <Text style={{ ...styles.tableColBold, width: '60%' }}>TOTAL PENGELUARAN KESELURUHAN</Text>
            <Text style={{ ...styles.tableColBold, width: '30%', textAlign: 'right', color: '#b45309' }}>{formatIDR(774500000)}</Text>
          </View>
        </View>

        {/* Tabel Pemasukan */}
        <Text style={{ ...styles.boldText, fontSize: 10, marginBottom: 4, marginTop: 12, textTransform: 'uppercase' }}>2. Rencana Pemasukan (Sumber Dana)</Text>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={{ ...styles.tableColHeader, width: '10%' }}>No</Text>
            <Text style={{ ...styles.tableColHeader, width: '60%' }}>Sumber Pendanaan</Text>
            <Text style={{ ...styles.tableColHeader, width: '30%', textAlign: 'right' }}>Jumlah Nominal</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>1</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}>Alokasi Kas Majelis Sinode GPIB</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(50000000)}</Text>
          </View>

          <View style={styles.tableRowAlternating}>
            <Text style={{ ...styles.tableCol, width: '10%' }}>2</Text>
            <Text style={{ ...styles.tableCol, width: '60%' }}>Pencarian Dana Kemitraan (Proposal & Kartu Sahabat)</Text>
            <Text style={{ ...styles.tableCol, width: '30%', textAlign: 'right' }}>{formatIDR(724500000)}</Text>
          </View>

          <View style={styles.tableRowTotal}>
            <Text style={{ ...styles.tableColBold, width: '10%' }}></Text>
            <Text style={{ ...styles.tableColBold, width: '60%' }}>TOTAL RENCANA PEMASUKAN</Text>
            <Text style={{ ...styles.tableColBold, width: '30%', textAlign: 'right', color: '#b45309' }}>{formatIDR(774500000)}</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 6 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>VII.</Text>
          <Text style={styles.sectionTitle}>Susunan Kepanitiaan Lintas Sinode</Text>
        </View>

        {/* Pengarah */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>Dewan Pengarah</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua II Majelis Sinode GPIB</Text>
            <Text style={styles.committeeName}>Pdt. Semuel A. Z. Karinda, M.Si.</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua Yayasan Kesehatan GPIB</Text>
            <Text style={styles.committeeName}>dr. Griselda P. S. Aer, Sp.KP</Text>
          </View>
        </View>

        {/* Pelaksana Inti */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>Pelaksana Harian (Inti)</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua Pelaksana</Text>
            <Text style={styles.committeeName}>Pdt. Jan Jona Lumanauw</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua I (Seksi Acara)</Text>
            <Text style={styles.committeeName}>Pnt. Inno Wiesje Subagyono Logor (Jkt) / Ibu Desye Syul L. (Mdo)</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua II (Seksi Dana)</Text>
            <Text style={styles.committeeName}>Pnt. Reni Kanter</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua III (Kesehatan)</Text>
            <Text style={styles.committeeName}>drg. Lanny Ranti</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua IV (Transp. & Akom.)</Text>
            <Text style={styles.committeeName}>Pnt. Tommy Masinambouw</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Ketua V (Hubungan Antar Agama)</Text>
            <Text style={styles.committeeName}>Dkn. Denny Tewu</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Sekretaris & Wkl. Sekretaris</Text>
            <Text style={styles.committeeName}>Pnt. Adri Manafe / Dkn. Inang M. K. Kaloke / Sdri. Anggita C. F.</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Bendahara & Wkl. Bendahara</Text>
            <Text style={styles.committeeName}>Ibu Yetje Sumual / Dkn. Lady Tangkere-Sondakh / Ibu Karema Rumambi</Text>
          </View>
        </View>

        {/* Sie Acara & Sie Dana */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>Seksi Acara & Seksi Dana</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Sie. Acara (Koordinator & Anggota)</Text>
            <Text style={styles.committeeName}>Pdt. Marthen Leiwakabessy (Koord) / Pdt. Danny Titaley / Ibu Marcela Lantang</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Sie. Dana (Koordinator & Anggota)</Text>
            <Text style={styles.committeeName}>Dkn. Yvone Wakkary (Koord) / Pnt. Antje Kanter / Pnt. Max Roring / Dkn. Ellen Tahalele / Ibu Nancy R. Damping / Dkn. Vicora Van der Muur / Ibu Diana Johanes / Ibu Tine Sigarlaki</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 7 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        {/* Seksi Pendukung */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>Seksi Pendukung Operasional</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Sie. Transportasi & Akomodasi</Text>
            <Text style={styles.committeeName}>Bpk. Edward Kanter (Koord) / Ibu Esther Polii / Dkn. Daniel F. Lolo / Dkn. Okta Friyanto / Pnt. Heince Tumewu / Bpk. Agus Patty</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Sie. Logistik & Sie. Konsumsi</Text>
            <Text style={styles.committeeName}>Pnt. Sahat Sianipar (Logistik Koord) / Ibu Revny Longkutoy (Konsumsi Koord) / Dkn. Wulan Sanggelorang</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Tim Pastoral & Tim Doa</Text>
            <Text style={styles.committeeName}>Pdt. Johny A. Lontoh (Koord) / Pdt. Sealthiel Izaak / Pdt. Asachristo</Text>
          </View>
        </View>

        {/* Panitia Lokal */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>Seksi / Panitia Lokal Sulawesi Utara</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Panitia Lokal Minahasa Utara</Text>
            <Text style={styles.committeeName}>Bpk. Edwien Moniaga / Ibu Yanny Siraya S. P., SIP / Bpk. Saldy Jacob, S.Pd / Bpk. Butje F. Maramis / Bpk. Edward Sumual / Ibu Wulan Badahura / Tim Medis Setempat</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Panitia Lokal Minahasa</Text>
            <Text style={styles.committeeName}>Ibu Gracia Y. Oroh / Ibu Paula Makalew / Ibu Josephin I. Rompas / Tim Medis Setempat</Text>
          </View>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Panitia Lokal Minahasa Tenggara</Text>
            <Text style={styles.committeeName}>Bpk. Raymond Sumual, S.TEOL / Ibu Vanda Rantung / Bpk. Arther Runturambi / Bpk. Chris Rumansi / Ibu Yanti Tumbol / Bpk. Ezra Sengkey / Bpk. Rio Lembong / Bpk. Lando Sumarauw / Ibu Priscillia Warouw / Ibu Yulita C. Mangundap / Ibu Nathalia KM Mamoto / Tim Medis Setempat</Text>
          </View>
        </View>

        {/* Sie Kesehatan */}
        <View style={styles.committeeSection}>
          <Text style={styles.committeeGroupTitle}>Seksi Kesehatan & Tim Medis Inti</Text>
          <View style={styles.committeeRow}>
            <Text style={styles.committeeRole}>Sie. Kesehatan & Medis</Text>
            <Text style={styles.committeeName}>Dkn. dr. Netty Selanno (Koord) / Pnt. dr. Clevy P. / drg. Iphighenia M. / drg. Feylia / dr. Theo Resilowi / Bpk. Toni Irawan / Dkn. Nancy Wehantouw</Text>
          </View>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 8 dari 9</Text>
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
              <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
              <Text style={styles.headerSubtitle}>YANKES GPIB & GMIM 2026</Text>
            </View>
          </View>
          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaText}>No: <Text style={styles.headerMetaVal}>{data.proposal_number}</Text></Text>
            <Text style={styles.headerMetaText}>Hal: <Text style={styles.headerMetaVal}>Proposal Donasi</Text></Text>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionNumber}>VIII.</Text>
          <Text style={styles.sectionTitle}>Saluran Partisipasi & Donasi Resmi</Text>
        </View>

        <Text style={styles.text}>
          Sebagai wujud kepedulian bersama untuk menghadirkan pelayanan kesehatan gratis bagi saudara-saudara kita di pelosok Sulawesi Utara, kami mengundang Bapak/Ibu/Saudara/i untuk melimpahkan kasih melalui dukungan donasi secara resmi. Partisipasi dapat disalurkan melalui rekening panitia pusat berikut:
        </Text>

        {/* Box Rekening Mandiri */}
        <View style={styles.donationBox}>
          <Text style={styles.donationTitle}>REKENING RESMI DONASI BAKSOS</Text>
          <View style={styles.donationDetailsRow}>
            <View style={styles.donationDetailItem}>
              <Text style={styles.donationDetailLabel}>Nama Bank</Text>
              <Text style={styles.donationDetailVal}>Bank Mandiri</Text>
            </View>
            <View style={styles.donationDetailItem}>
              <Text style={styles.donationDetailLabel}>Nomor Rekening</Text>
              <Text style={{ ...styles.donationDetailVal, letterSpacing: 1.5 }}>115-00-0240902-6</Text>
            </View>
            <View style={styles.donationDetailItem}>
              <Text style={styles.donationDetailLabel}>Atas Nama Penerima</Text>
              <Text style={styles.donationDetailVal}>YAYASAN KESEHATAN GPIB (Bakti Sosial)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.text}>
          Demikian proposal donasi kemitraan ini kami sampaikan. Kami mengucapkan terima kasih yang sebesar-besarnya atas doa, perhatian, dan partisipasi aktif Bapak/Ibu/Saudara/i. Kiranya Tuhan Yesus Kristus senantiasa melimpahkan berkat kesehatan, damai sejahtera, serta melancarkan segala karya dan usaha Bapak/Ibu beserta keluarga. Amin.
        </Text>

        {/* Tanda Tangan */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>Mengetahui, Dewan Pengarah</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>dr. Griselda P. S. Aer, Sp.KP</Text>
            <Text style={styles.signatureRole}>Ketua Yayasan Kesehatan GPIB</Text>
          </View>
          
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>Mengetahui, Dewan Pengarah</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>Pdt. Semuel A. Z. Karinda, M.Si.</Text>
            <Text style={styles.signatureRole}>Ketua II Majelis Sinode GPIB</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>Hormat Kami, Pelaksana Harian</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>Pdt. Jan Jona Lumanauw</Text>
            <Text style={styles.signatureRole}>Ketua Pelaksana Panitia Baksos 2026</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text style={styles.signatureRoleHeader}>Tim Penggalangan Dana, PIC</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{data.committee_name || 'Panitia Pelaksana'}</Text>
            <Text style={styles.signatureRole}>PIC / Tim Penggalangan Dana Lapangan</Text>
          </View>
        </View>

        {/* QR Code and Validation */}
        <View style={styles.qrBlock}>
          <Image 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://baksos-yankes.id/verify/${data.proposal_number}&color=0f172a&bgcolor=ffffff`} 
            style={styles.qrCode} 
          />
          <Text style={{ ...styles.signatureName, fontSize: 8.5 }}>Otentikasi Dokumen Digital Resmi</Text>
          <Text style={styles.qrLabel}>Pindai kode QR untuk memvalidasi keabsahan data proposal ini secara online di sistem baksos.</Text>
        </View>

        {/* Footer template */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Halaman 9 dari 9</Text>
        </View>
      </Page>
    </Document>
  );
}
