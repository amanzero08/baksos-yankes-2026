import { Document, Page, Text, View, StyleSheet, Image, Font, Link } from '@react-pdf/renderer'

// Register Open Sans
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ]
})

// Register Playfair Display for classic serif certificate headings
Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/PlayfairDisplay[wght].ttf' },
    { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/PlayfairDisplay[wght].ttf', fontWeight: 700 },
    { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/PlayfairDisplay-Italic[wght].ttf', fontStyle: 'italic' },
  ]
})

const styles = StyleSheet.create({
  page: { 
    paddingTop: 45,
    paddingBottom: 45,
    paddingLeft: 60,
    paddingRight: 60,
    fontFamily: 'Open Sans',
    backgroundColor: '#fdfcf7', // Premium warm paper/vellum background
    position: 'relative'
  },
  outerBorder: {
    position: 'absolute',
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
    borderWidth: 3,
    borderColor: '#065f46', // Thick emerald outer border
    zIndex: 10
  },
  innerBorder: {
    position: 'absolute',
    top: 22,
    bottom: 22,
    left: 22,
    right: 22,
    borderWidth: 1.5,
    borderColor: '#d97706', // Gold inner border
    borderStyle: 'solid',
    zIndex: 10
  },
  // Decorative corners
  cornerTL: {
    position: 'absolute',
    top: 26,
    left: 26,
    width: 25,
    height: 25,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#d97706',
    zIndex: 11
  },
  cornerTR: {
    position: 'absolute',
    top: 26,
    right: 26,
    width: 25,
    height: 25,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#d97706',
    zIndex: 11
  },
  cornerBL: {
    position: 'absolute',
    bottom: 26,
    left: 26,
    width: 25,
    height: 25,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#d97706',
    zIndex: 11
  },
  cornerBR: {
    position: 'absolute',
    bottom: 26,
    right: 26,
    width: 25,
    height: 25,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#d97706',
    zIndex: 11
  },
  watermark: {
    position: 'absolute',
    top: '32%',
    left: '38%',
    width: '24%',
    opacity: 0.04,
    zIndex: -1
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 45,
    height: 45,
    objectFit: 'contain'
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerOrg: {
    fontSize: 9,
    fontWeight: 700,
    color: '#065f46',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4
  },
  headerMainTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 26,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  headerSubTitle: {
    fontSize: 8.5,
    fontStyle: 'italic',
    color: '#64748b',
    letterSpacing: 1,
    marginTop: 2
  },
  recipientLabel: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 8
  },
  recipientName: {
    fontFamily: 'Playfair Display',
    fontSize: 28,
    fontWeight: 700,
    color: '#b45309', // Deep gold/amber
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 4
  },
  recipientInst: {
    fontSize: 12,
    fontWeight: 600,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 12
  },
  divider: {
    width: 150,
    height: 1,
    backgroundColor: '#d97706',
    alignSelf: 'center',
    marginBottom: 12,
    opacity: 0.6
  },
  bodyText: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: '#334155',
    textAlign: 'center',
    paddingHorizontal: 50,
    marginBottom: 12
  },
  amountBox: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 18,
  },
  amountText: {
    fontSize: 13,
    fontWeight: 700,
    color: '#065f46',
    letterSpacing: 0.5
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  signatureBlock: {
    width: '30%',
    alignItems: 'center'
  },
  signatureLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#94a3b8',
    marginBottom: 5,
    opacity: 0.7
  },
  signatureRole: {
    fontSize: 8.5,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  signatureName: {
    fontSize: 10,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 2
  },
  signatureTitle: {
    fontSize: 8,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 25
  },
  qrBlock: {
    width: '25%',
    alignItems: 'center'
  },
  qrCode: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 3,
    borderRadius: 3
  },
  qrLabel: {
    fontSize: 7,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 3,
    fontStyle: 'italic'
  },
  footerMeta: {
    position: 'absolute',
    bottom: 26,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: '#94a3b8',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 6
  }
})

// Translations dictionary
const t = {
  id: {
    foundationName: "Yayasan Kesehatan GPIB & GMIM",
    certTitle: "Sertifikat Penghargaan",
    subTitle: "Bakti Sosial Lintas Sinodal 2026",
    recipientLabel: "Diberikan Kepada / Presented To:",
    bodyText: "Sebagai ungkapan penghargaan yang mendalam dan rasa terima kasih yang tulus atas partisipasi dan kontribusi berharga dalam aksi kemanusiaan pelayanan kesehatan gratis bagi masyarakat Ratahan Timur, Likupang 2, dan Lansot, Sulawesi Utara. Dukungan Anda telah menghadirkan pemulihan dan harapan baru.",
    donationVerified: "Donasi Terverifikasi: ",
    chairmanTitle: "Ketua Panitia Pelaksana",
    committeeRole: "Lintas Sinodal 2026",
    picTitle: "PIC Pendamping Dana",
    picRole: "Yayasan Kesehatan GPIB",
    qrLabel: "Pindai untuk otentikasi digital",
    certNo: "No. CERT: CERT-TY-",
    dateOfIssue: "Tanggal Terbit: "
  },
  en: {
    foundationName: "GPIB & GMIM Health Foundation",
    certTitle: "Certificate of Appreciation",
    subTitle: "2026 Cross-Synodal Social Mission",
    recipientLabel: "Diberikan Kepada / Presented To:",
    bodyText: "As an expression of deep appreciation and sincere gratitude for your valuable participation and contribution in the humanitarian action of providing free healthcare services for the community in Ratahan Timur, Likupang 2, and Lansot, North Sulawesi. Your support has brought healing and new hope.",
    donationVerified: "Verified Donation: ",
    chairmanTitle: "Chairman of the Organizing Committee",
    committeeRole: "2026 Cross-Synodal",
    picTitle: "Fundraising Liaison Officer",
    picRole: "GPIB Health Foundation",
    qrLabel: "Scan for digital verification",
    certNo: "Cert No: CERT-TY-",
    dateOfIssue: "Date of Issue: "
  }
}

export const ThankYouPDF = ({ data, lang = 'id' }: { data: any; lang?: 'id' | 'en' }) => {
  const currentDate = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formatCurrency = (amount: number) => {
    return "Rp " + Math.round(amount).toLocaleString(lang === 'en' ? 'en-US' : 'id-ID');
  }

  const donation = data.donations && data.donations.length > 0 ? data.donations[0] : { amount: 0 };
  const formattedAmount = formatCurrency(donation.amount);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Decorative Certificate Borders */}
        <View style={styles.outerBorder} fixed />
        <View style={styles.innerBorder} fixed />
        
        {/* Corner Ornaments */}
        <View style={styles.cornerTL} fixed />
        <View style={styles.cornerTR} fixed />
        <View style={styles.cornerBL} fixed />
        <View style={styles.cornerBR} fixed />

        {/* Center Watermark Logo */}
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />

        {/* Top Logos */}
        <View style={styles.logoContainer}>
          <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gpib.png" style={{...styles.logo, width: 50, height: 50}} />
          <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={{...styles.logo, width: 50, height: 50}} />
          <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-gmim.png" style={styles.logo} />
        </View>

        {/* Header Titles */}
        <View style={styles.certificateHeader}>
          <Text style={styles.headerOrg}>{t[lang].foundationName}</Text>
          <Text style={styles.headerMainTitle}>{t[lang].certTitle}</Text>
          <Text style={styles.headerSubTitle}>{t[lang].subTitle}</Text>
        </View>

        {/* Recipient info */}
        <Text style={styles.recipientLabel}>{t[lang].recipientLabel}</Text>
        <Text style={styles.recipientName}>{data.donor_name}</Text>
        {data.institution && (
          <Text style={styles.recipientInst}>{data.institution}</Text>
        )}
        
        <View style={styles.divider} />

        {/* Body Appreciation */}
        <Text style={styles.bodyText}>
          {t[lang].bodyText}
        </Text>

        {/* Amount Box */}
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{t[lang].donationVerified}{formattedAmount}</Text>
        </View>

        {/* Bottom Section: Signatures & Verification */}
        <View style={styles.bottomSection}>
          {/* Chairman Signature Line */}
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureTitle}>{t[lang].chairmanTitle}</Text>
            <Text style={styles.signatureName}>Pdt. Jan Jona Lumanauw</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureRole}>{t[lang].committeeRole}</Text>
          </View>

          {/* Validation QR Code */}
          <View style={styles.qrBlock}>
            <Link src={`https://yankes.amanzero.space/thanks/${data.proposal_number}`}>
              <Image 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://yankes.amanzero.space/thanks/${data.proposal_number}`)}&color=065f46&bgcolor=ffffff`} 
                style={styles.qrCode} 
              />
            </Link>
            <Text style={styles.qrLabel}>{t[lang].qrLabel}</Text>
          </View>

          {/* PIC Signature Line */}
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureTitle}>{t[lang].picTitle}</Text>
            <Text style={styles.signatureName}>{data.committee_name || 'Panitia Baksos'}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureRole}>{t[lang].picRole}</Text>
          </View>
        </View>

        {/* Metadata Footer */}
        <View style={styles.footerMeta} fixed>
          <Text>{t[lang].certNo}{data.proposal_number}</Text>
          <Text>{t[lang].dateOfIssue}{currentDate}</Text>
        </View>
      </Page>
    </Document>
  )
}
