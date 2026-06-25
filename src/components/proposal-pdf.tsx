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
  page: { 
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 55,
    paddingRight: 55,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
    position: 'relative'
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '60%',
    opacity: 0.03,
    zIndex: -1
  },
  pageBorder: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: -2
  },
  pageBorderInner: {
    position: 'absolute',
    top: 24,
    bottom: 24,
    left: 24,
    right: 24,
    borderWidth: 1,
    borderColor: '#d97706', // Gold inner border
    opacity: 0.3,
    zIndex: -2
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 35,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d97706', // Gold separator
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: 'contain'
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f172a', // Deep slate
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#d97706', // Gold
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  proposalMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
    paddingHorizontal: 10,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#d97706'
  },
  metaText: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4
  },
  metaValue: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0f172a'
  },
  recipientBox: {
    marginBottom: 30,
    paddingLeft: 10,
  },
  recipientTo: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 4
  },
  recipientName: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 2
  },
  recipientInst: {
    fontSize: 12,
    fontWeight: 600,
    color: '#334155',
    marginBottom: 2
  },
  text: {
    fontSize: 11,
    lineHeight: 1.8,
    color: '#334155',
    marginBottom: 12,
    textAlign: 'justify'
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 20,
    paddingRight: 10,
  },
  bulletDot: {
    width: 20,
    fontSize: 14,
    color: '#d97706', // Gold dot
    fontWeight: 700
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.6,
    color: '#334155',
  },
  highlightBox: {
    backgroundColor: '#fffbeb', // Light amber/gold bg
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 6,
    padding: 16,
    marginTop: 20,
    marginBottom: 25,
    alignItems: 'center'
  },
  highlightText: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 600,
    color: '#b45309',
    textAlign: 'center',
    lineHeight: 1.6
  },
  bankSection: {
    marginTop: 25,
    marginBottom: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  bankTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1
  },
  bankDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30
  },
  bankInfoCol: {
    alignItems: 'center'
  },
  bankLabel: {
    fontSize: 9,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4
  },
  bankValue: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1e293b'
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  signatureBlock: {
    width: '50%'
  },
  signatureTitle: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 40,
  },
  qrBlock: {
    width: '40%',
    alignItems: 'flex-end',
  },
  qrCode: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 4,
    borderRadius: 4
  },
  qrLabel: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: 4
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
    textDecoration: 'underline'
  },
  signatureRole: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
    fontStyle: 'italic'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 55,
    right: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 8,
    color: '#cbd5e1',
    textTransform: 'uppercase',
    letterSpacing: 1
  }
})

export const ProposalPDF = ({ data }: { data: any }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Premium Borders */}
        <View style={styles.pageBorder} fixed />
        <View style={styles.pageBorderInner} fixed />

        {/* Background Watermark */}
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Header with Logos */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gpib.png" style={{...styles.logo, width: 75, height: 75}} />
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={{...styles.logo, width: 75, height: 75}} />
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gmim.png" style={styles.logo} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Bakti Sosial Lintas Sinodal</Text>
            <Text style={styles.headerSubtitle}>Yayasan Kesehatan GPIB & GMIM 2026</Text>
          </View>
        </View>

        {/* Meta Information */}
        <View style={styles.proposalMetaInfo}>
          <View>
            <Text style={styles.metaText}>Nomor  :  <Text style={styles.metaValue}>{data.proposal_number}</Text></Text>
            <Text style={styles.metaText}>Perihal :  <Text style={styles.metaValue}>Permohonan Partisipasi Donasi</Text></Text>
          </View>
          <View>
            <Text style={styles.metaText}>Tanggal Terbit :  <Text style={styles.metaValue}>{currentDate}</Text></Text>
          </View>
        </View>

        {/* Recipient */}
        <View style={styles.recipientBox}>
          <Text style={styles.recipientTo}>Yth. Bapak/Ibu/Sdr/i,</Text>
          <Text style={styles.recipientName}>{data.donor_name}</Text>
          {data.institution && (
            <Text style={styles.recipientInst}>{data.institution}</Text>
          )}
        </View>

        {/* Content */}
        <Text style={styles.text}>Syalom, Salam Sejahtera dalam Kasih Tuhan kita Yesus Kristus,</Text>
        
        <Text style={styles.text}>
          Dalam rangka mewujudkan pelayanan kasih yang holistik dan komprehensif, Yayasan Kesehatan GPIB bersinergi dengan GMIM menyelenggarakan <Text style={{fontWeight: 700, color: '#0f172a'}}>Bakti Sosial Lintas Sinodal 2026</Text>. 
        </Text>
        
        <Text style={styles.text}>
          Kegiatan eksklusif ini bertujuan menghadirkan akses layanan medis premium secara gratis bagi masyarakat yang membutuhkan, mencakup pengobatan umum, gigi, bedah minor, dan pemeriksaan laboratorium dasar. Kegiatan ini akan dilangsungkan pada:
        </Text>

        <View style={{ marginBottom: 20, marginTop: 5 }}>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: 700, color: '#0f172a'}}>Jadwal Pelaksanaan:</Text> 14 s/d 18 September 2026</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}><Text style={{fontWeight: 700, color: '#0f172a'}}>Titik Pelayanan Utama:</Text> Desa Tondanouw (Minahasa Tenggara), Likupang (Minahasa Utara), dan Desa Lolah (Minahasa)</Text>
          </View>
        </View>

        <Text style={styles.text}>
          Mengingat besarnya skala pelayanan dan tingginya standar medis yang kami terapkan, kami mengundang Bapak/Ibu/Saudara/i untuk berpartisipasi dan mengambil bagian dalam karya kemanusiaan yang strategis ini. Dukungan Anda akan langsung dikonversi menjadi layanan medis bagi mereka yang sangat membutuhkan di pelosok Sulawesi Utara.
        </Text>

        {data.message && (
          <View style={styles.highlightBox}>
            <Text style={styles.highlightText}>"{data.message}"</Text>
          </View>
        )}

        {/* Bank Details */}
        <View style={styles.bankSection}>
          <Text style={styles.bankTitle}>REKENING RESMI DONASI</Text>
          <View style={styles.bankDetailsRow}>
            <View style={styles.bankInfoCol}>
              <Text style={styles.bankLabel}>Bank</Text>
              <Text style={styles.bankValue}>BCA</Text>
            </View>
            <View style={styles.bankInfoCol}>
              <Text style={styles.bankLabel}>Nomor Rekening</Text>
              <Text style={styles.bankValue}>870 123 4567</Text>
            </View>
            <View style={styles.bankInfoCol}>
              <Text style={styles.bankLabel}>Atas Nama</Text>
              <Text style={styles.bankValue}>Yankes GPIB - Baksos 2026</Text>
            </View>
          </View>
        </View>

        <Text style={styles.text}>
          Demikian permohonan ini kami sampaikan. Kami mengucapkan terima kasih yang sebesar-besarnya atas kepercayaan dan partisipasi Anda. Kiranya Tuhan senantiasa memberkati kehidupan, keluarga, dan segala usaha Anda.
        </Text>

        {/* Signatures & QR Code */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureTitle}>Disahkan Secara Digital Oleh,</Text>
            <Text style={styles.signatureName}>Pdt. Jan Jona Lumanauw</Text>
            <Text style={styles.signatureRole}>Ketua Panitia Lintas Sinodal 2026</Text>
            
            <Text style={{...styles.signatureName, marginTop: 20}}>{data.committee_name || 'Panitia Baksos'}</Text>
            <Text style={styles.signatureRole}>PIC / Tim Penggalangan Dana</Text>
          </View>
          <View style={styles.qrBlock}>
            <Image 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://baksos-yankes.id/verify/${data.proposal_number}&color=0f172a&bgcolor=ffffff`} 
              style={styles.qrCode} 
            />
            <Text style={{...styles.signatureName, textAlign: 'right'}}>Otentikasi Digital</Text>
            <Text style={styles.qrLabel}>Pindai QR Code untuk memverifikasi{'\n'}keaslian dokumen resmi ini.</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dokumen resmi Panitia Bakti Sosial Lintas Sinodal 2026</Text>
          <Text style={styles.footerText}>Ref: {data.proposal_number}</Text>
        </View>
      </Page>
    </Document>
  );
}
