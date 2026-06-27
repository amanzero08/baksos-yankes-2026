import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

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

// Register Playfair Display for headings
Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/PlayfairDisplay[wght].ttf' },
    { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/playfairdisplay/PlayfairDisplay[wght].ttf', fontWeight: 700 },
  ]
})

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 40,
    fontFamily: 'Open Sans',
    backgroundColor: '#ffffff',
    fontSize: 9,
    color: '#1e293b'
  },
  watermark: {
    position: 'absolute',
    top: '35%',
    left: '38%',
    width: '24%',
    opacity: 0.03,
    zIndex: -1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#0f172a',
    paddingBottom: 12,
    marginBottom: 20,
    alignItems: 'center'
  },
  headerLogo: {
    width: 35,
    height: 35,
    marginRight: 10
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: 0.5
  },
  headerSubtitle: {
    fontSize: 7.5,
    color: '#64748b',
    marginTop: 2,
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  docMeta: {
    textAlign: 'right',
    fontSize: 7.5,
    color: '#64748b'
  },
  docMetaVal: {
    fontWeight: 700,
    color: '#0f172a'
  },
  reportTitle: {
    fontFamily: 'Playfair Display',
    fontSize: 20,
    fontWeight: 700,
    color: '#0f172a',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 4
  },
  reportSubtitle: {
    fontSize: 9,
    color: '#d97706',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    borderLeftWidth: 3,
    borderLeftColor: '#d97706',
    paddingLeft: 8,
    marginBottom: 12,
    marginTop: 15,
    textTransform: 'uppercase'
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12
  },
  summaryCardFull: {
    width: '100%',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bcf0da',
    borderRadius: 8,
    padding: 14,
    marginBottom: 4
  },
  cardLabel: {
    fontSize: 7.5,
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0f172a'
  },
  cardValueGreen: {
    fontSize: 20,
    fontWeight: 700,
    color: '#03543f'
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 20
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  tableRowAlternating: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  tableColHeader: {
    fontSize: 7.5,
    fontWeight: 700,
    color: '#475569',
    textTransform: 'uppercase'
  },
  tableCol: {
    fontSize: 7.5,
    color: '#334155'
  },
  tableColBold: {
    fontSize: 7.5,
    fontWeight: 700,
    color: '#0f172a'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: '#94a3b8'
  },
  pageNumber: {
    textAlign: 'right'
  },
  sigSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 20
  },
  sigBlock: {
    alignItems: 'center',
    width: '40%'
  },
  sigTitle: {
    fontSize: 8,
    color: '#64748b',
    marginBottom: 40,
    textAlign: 'center'
  },
  sigName: {
    fontSize: 8.5,
    fontWeight: 700,
    color: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    paddingBottom: 2,
    marginBottom: 2
  },
  sigRole: {
    fontSize: 7.5,
    color: '#64748b'
  }
})

export const RecapPDF = ({ proposals, kartuSahabat }: { proposals: any[]; kartuSahabat: any[] }) => {
  const GLOBAL_TARGET = 774500000;

  // Calculators
  const totalProposalDonations = proposals
    ?.filter(p => p.donations && p.donations.length > 0)
    .reduce((sum, p) => {
      const verifiedAmount = p.donations
        ?.filter((d: any) => d.verified)
        .reduce((s: number, d: any) => s + (Number(d.amount) || 0), 0) || 0;
      return sum + verifiedAmount;
    }, 0) || 0;

  const totalKartuSahabat = kartuSahabat?.reduce((sum, item) => sum + (Number(item.collected_amount) || 0), 0) || 0;
  const totalTargetKartu = kartuSahabat?.reduce((sum, item) => sum + (Number(item.target_amount) || 0), 0) || 0;
  const totalCollected = totalProposalDonations + totalKartuSahabat;
  const remainingAmount = Math.max(0, GLOBAL_TARGET - totalCollected);
  const progressPercent = (totalCollected / GLOBAL_TARGET) * 100;

  // Proposal Stats
  const totalProposals = proposals.length;
  const confirmedProposals = proposals.filter(p => p.donations && p.donations.some((d: any) => d.verified)).length;
  const pendingProposals = proposals.filter(p => p.donations && p.donations.length > 0 && !p.donations.some((d: any) => d.verified)).length;
  const emptyProposals = totalProposals - confirmedProposals - pendingProposals;

  // Kartu Sahabat Stats
  const totalKartu = kartuSahabat.length;
  const activeKartu = kartuSahabat.filter(k => (Number(k.collected_amount) || 0) > 0).length;

  const formatCurrency = (amount: number) => {
    return "Rp " + Math.round(amount).toLocaleString('id-ID');
  }

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Document>
      {/* ================= PAGE 1: EXECUTIVE SUMMARY ================= */}
      <Page size="A4" style={styles.page}>
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />
        
        {/* Header */}
        <View style={styles.headerContainer} fixed>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>PANITIA BAKTI SOSIAL LINTAS SINODAL 2026</Text>
              <Text style={styles.headerSubtitle}>YAYASAN KESEHATAN GPIB & SINODE GMIM</Text>
            </View>
          </View>
          <View style={styles.docMeta}>
            <Text>Jenis Dokumen: <Text style={styles.docMetaVal}>Rekapitulasi LPJ</Text></Text>
            <Text>Tanggal Cetak: <Text style={styles.docMetaVal}>{currentDate}</Text></Text>
          </View>
        </View>

        <Text style={styles.reportTitle}>LAPORAN REKAPITULASI DANA MASUK</Text>
        <Text style={styles.reportSubtitle}>Bakti Sosial Lintas Sinodal 2026</Text>

        <Text style={styles.sectionTitle}>Ringkasan Eksekutif Keuangan</Text>
        
        <View style={styles.summaryGrid}>
          {/* Total Terkumpul Card */}
          <View style={styles.summaryCardFull}>
            <Text style={styles.cardLabel}>Total Dana Pelayanan Terkumpul</Text>
            <Text style={styles.cardValueGreen}>{formatCurrency(totalCollected)}</Text>
            <Text style={{ fontSize: 7.5, color: '#047857', marginTop: 4, fontWeight: 600 }}>
              Pencapaian target sebesar {progressPercent.toFixed(2)}% dari total kebutuhan pelayanan.
            </Text>
          </View>

          {/* Target Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Target Kebutuhan Dana (RAB)</Text>
            <Text style={styles.cardValue}>{formatCurrency(GLOBAL_TARGET)}</Text>
          </View>

          {/* Sisa Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Sisa Dana Harus Dicari</Text>
            <Text style={{ ...styles.cardValue, color: remainingAmount > 0 ? '#b45309' : '#03543f' }}>{formatCurrency(remainingAmount)}</Text>
          </View>

          {/* Proposal Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Donasi via Proposal Kemitraan</Text>
            <Text style={styles.cardValue}>{formatCurrency(totalProposalDonations)}</Text>
            <Text style={{ fontSize: 7, color: '#64748b', marginTop: 4 }}>
              Total: {totalProposals} proposal (Terkonfirmasi: {confirmedProposals}, Review: {pendingProposals})
            </Text>
          </View>

          {/* Kartu Sahabat Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>Donasi via Kartu Sahabat Panitia</Text>
            <Text style={styles.cardValue}>{formatCurrency(totalKartuSahabat)}</Text>
            <Text style={{ fontSize: 7, color: '#64748b', marginTop: 4 }}>
              Total: {totalKartu} pemegang kartu (Aktif terisi: {activeKartu} panitia)
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pernyataan Keabsahan</Text>
        <Text style={{ fontSize: 8.5, lineHeight: 1.6, color: '#475569', marginBottom: 15 }}>
          Laporan ini disusun secara sistematis berdasarkan data real-time transaksi yang tercatat secara sah dan telah melewati proses verifikasi bukti transfer keuangan oleh administrator panitia. Laporan rekapitulasi pertanggungjawaban dana ini ditujukan sebagai bentuk akuntabilitas publik dan transparansi keuangan pelayanan Bakti Sosial Lintas Sinodal 2026 di Sulawesi Utara.
        </Text>

        {/* Tanda Tangan */}
        <View style={styles.sigSection}>
          <View style={styles.sigBlock}>
            <Text style={styles.sigTitle}>Mengetahui,{"\n"}Ketua Pelaksana Panitia Baksos</Text>
            <Text style={styles.sigName}>Pdt. Jan Jona Lumanauw</Text>
            <Text style={styles.sigRole}>Ketua Pelaksana</Text>
          </View>

          {/* QR Sign Verification */}
          <View style={{ ...styles.sigBlock, width: '20%', alignItems: 'center' }}>
            <Image 
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://baksos-yankes-2026.vercel.app/dashboard&color=0f172a&bgcolor=ffffff" 
              style={{ width: 45, height: 45, marginBottom: 4 }} 
            />
            <Text style={{ fontSize: 6, fontWeight: 700, color: '#0f172a', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>DIGITAL SIGNATURE</Text>
            <Text style={{ fontSize: 5, color: '#64748b', textAlign: 'center', marginTop: 1 }}>Pindai untuk Validasi Real-time</Text>
          </View>

          <View style={styles.sigBlock}>
            <Text style={styles.sigTitle}>Disiapkan Oleh,{"\n"}Bendahara Pelaksana Panitia Baksos</Text>
            <Text style={styles.sigName}>Ibu Yetje Sumual</Text>
            <Text style={styles.sigRole}>Bendahara Keuangan</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Laporan Rekapitulasi LPJ Dana Baksos Lintas Sinodal 2026</Text>
          <Text style={styles.pageNumber}>Halaman 1 dari 3</Text>
        </View>
      </Page>

      {/* ================= PAGE 2: PROPOSALS DETAIL ================= */}
      <Page size="A4" style={styles.page}>
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />
        
        {/* Header */}
        <View style={styles.headerContainer} fixed>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>PANITIA BAKTI SOSIAL LINTAS SINODAL 2026</Text>
              <Text style={styles.headerSubtitle}>YAYASAN KESEHATAN GPIB & SINODE GMIM</Text>
            </View>
          </View>
          <View style={styles.docMeta}>
            <Text>Jenis Dokumen: <Text style={styles.docMetaVal}>Rekapitulasi LPJ</Text></Text>
            <Text>Tanggal Cetak: <Text style={styles.docMetaVal}>{currentDate}</Text></Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rincian Donasi Masuk: Jalur Proposal Kemitraan</Text>
        <Text style={{ fontSize: 8, color: '#64748b', marginBottom: 8 }}>
          Tabel di bawah ini menampilkan seluruh data pengajuan proposal donasi kemitraan beserta status verifikasi pembayaran.
        </Text>

        {/* Table of Proposals */}
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={{ ...styles.tableColHeader, width: '5%' }}>No</Text>
            <Text style={{ ...styles.tableColHeader, width: '22%' }}>No. Proposal</Text>
            <Text style={{ ...styles.tableColHeader, width: '23%' }}>Nama Donatur / Mitra</Text>
            <Text style={{ ...styles.tableColHeader, width: '20%' }}>Institusi / Perusahaan</Text>
            <Text style={{ ...styles.tableColHeader, width: '15%', textAlign: 'right' }}>Nominal (Rp)</Text>
            <Text style={{ ...styles.tableColHeader, width: '15%', textAlign: 'center' }}>Status</Text>
          </View>

          {proposals.length > 0 ? (
            proposals.map((prop, idx) => {
              const donation = prop.donations && prop.donations.length > 0 ? prop.donations[0] : null;
              const amount = donation?.verified ? (Number(donation.amount) || 0) : 0;
              const isVerified = donation?.verified;
              const isPending = donation && !donation.verified;
              
              const statusText = isVerified ? "Terkonfirmasi" : isPending ? "Review (Pending)" : "Belum Transfer";
              const isAlternating = idx % 2 === 1;

              return (
                <View key={prop.id} style={isAlternating ? styles.tableRowAlternating : styles.tableRow}>
                  <Text style={{ ...styles.tableCol, width: '5%' }}>{idx + 1}</Text>
                  <Text style={{ ...styles.tableColBold, width: '22%' }}>{prop.proposal_number}</Text>
                  <Text style={{ ...styles.tableCol, width: '23%' }}>{prop.donor_name}</Text>
                  <Text style={{ ...styles.tableCol, width: '20%' }}>{prop.institution || '-'}</Text>
                  <Text style={{ ...styles.tableColBold, width: '15%', textAlign: 'right' }}>
                    {amount > 0 ? formatCurrency(amount) : '-'}
                  </Text>
                  <Text style={{ 
                    ...styles.tableColBold, 
                    width: '15%', 
                    textAlign: 'center',
                    color: isVerified ? '#047857' : isPending ? '#d97706' : '#64748b'
                  }}>{statusText}</Text>
                </View>
              );
            })
          ) : (
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCol, width: '100%', textAlign: 'center', paddingVertical: 10 }}>Belum ada data proposal.</Text>
            </View>
          )}
        </View>

        {/* Summary Info Box */}
        <View style={{
          backgroundColor: '#f8fafc',
          borderWidth: 1,
          borderColor: '#e2e8f0',
          borderRadius: 6,
          padding: 10,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{ width: '30%' }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Proposal Dikirim</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{totalProposals} Dokumen</Text>
          </View>
          <View style={{ width: '35%', borderLeftWidth: 1, borderLeftColor: '#e2e8f0', paddingLeft: 12 }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Proposal Terisi (Lunas)</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#047857' }}>{confirmedProposals} Dokumen</Text>
          </View>
          <View style={{ width: '35%', borderLeftWidth: 1, borderLeftColor: '#e2e8f0', paddingLeft: 12 }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Total Dana Terkonfirmasi</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#047857' }}>{formatCurrency(totalProposalDonations)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Laporan Rekapitulasi LPJ Dana Baksos Lintas Sinodal 2026</Text>
          <Text style={styles.pageNumber}>Halaman 2 dari 3</Text>
        </View>
      </Page>

      {/* ================= PAGE 3: KARTU SAHABAT DETAIL ================= */}
      <Page size="A4" style={styles.page}>
        <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.watermark} fixed />
        
        {/* Header */}
        <View style={styles.headerContainer} fixed>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image src="https://savasoahsiupzqkheduj.supabase.co/storage/v1/object/public/assets/logos/logo-yankes.png" style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle}>PANITIA BAKTI SOSIAL LINTAS SINODAL 2026</Text>
              <Text style={styles.headerSubtitle}>YAYASAN KESEHATAN GPIB & SINODE GMIM</Text>
            </View>
          </View>
          <View style={styles.docMeta}>
            <Text>Jenis Dokumen: <Text style={styles.docMetaVal}>Rekapitulasi LPJ</Text></Text>
            <Text>Tanggal Cetak: <Text style={styles.docMetaVal}>{currentDate}</Text></Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rincian Perolehan Dana: Jalur Kartu Sahabat Panitia</Text>
        <Text style={{ fontSize: 8, color: '#64748b', marginBottom: 8 }}>
          Tabel di bawah ini menampilkan rincian target dan nominal dana terhimpun dari masing-masing pemegang kartu sahabat.
        </Text>

        {/* Table of Kartu Sahabat */}
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={{ ...styles.tableColHeader, width: '10%' }}>No</Text>
            <Text style={{ ...styles.tableColHeader, width: '35%' }}>Nama Pemegang Kartu (Panitia)</Text>
            <Text style={{ ...styles.tableColHeader, width: '20%', textAlign: 'right' }}>Target Dana (Rp)</Text>
            <Text style={{ ...styles.tableColHeader, width: '20%', textAlign: 'right' }}>Terkumpul (Rp)</Text>
            <Text style={{ ...styles.tableColHeader, width: '15%', textAlign: 'right' }}>Pencapaian (%)</Text>
          </View>

          {kartuSahabat.length > 0 ? (
            kartuSahabat.map((kartu, idx) => {
              const collected = Number(kartu.collected_amount) || 0;
              const target = Number(kartu.target_amount) || 0;
              const pct = target > 0 ? (collected / target) * 100 : 0;
              const isAlternating = idx % 2 === 1;

              return (
                <View key={kartu.id} style={isAlternating ? styles.tableRowAlternating : styles.tableRow}>
                  <Text style={{ ...styles.tableCol, width: '10%' }}>{idx + 1}</Text>
                  <Text style={{ ...styles.tableColBold, width: '35%' }}>{kartu.committee_name}</Text>
                  <Text style={{ ...styles.tableCol, width: '20%', textAlign: 'right' }}>{formatCurrency(target)}</Text>
                  <Text style={{ ...styles.tableColBold, width: '20%', textAlign: 'right', color: collected > 0 ? '#047857' : '#1e293b' }}>
                    {collected > 0 ? formatCurrency(collected) : '-'}
                  </Text>
                  <Text style={{ 
                    ...styles.tableColBold, 
                    width: '15%', 
                    textAlign: 'right',
                    color: pct >= 100 ? '#047857' : pct > 0 ? '#d97706' : '#64748b'
                  }}>{pct.toFixed(1)}%</Text>
                </View>
              );
            })
          ) : (
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableCol, width: '100%', textAlign: 'center', paddingVertical: 10 }}>Belum ada data kartu sahabat.</Text>
            </View>
          )}
        </View>

        {/* Summary Info Box */}
        <View style={{
          backgroundColor: '#f8fafc',
          borderWidth: 1,
          borderColor: '#e2e8f0',
          borderRadius: 6,
          padding: 10,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{ width: '22%' }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Kartu Edar</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{totalKartu} Lembar</Text>
          </View>
          <View style={{ width: '25%', borderLeftWidth: 1, borderLeftColor: '#e2e8f0', paddingLeft: 10 }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Kartu Terisi ({">"} 0)</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#b45309' }}>{activeKartu} Lembar</Text>
          </View>
          <View style={{ width: '26%', borderLeftWidth: 1, borderLeftColor: '#e2e8f0', paddingLeft: 10 }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Total Target Dana</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{formatCurrency(totalTargetKartu)}</Text>
          </View>
          <View style={{ width: '27%', borderLeftWidth: 1, borderLeftColor: '#e2e8f0', paddingLeft: 10 }}>
            <Text style={{ fontSize: 7, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Total Dana Himpun</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#047857' }}>{formatCurrency(totalKartuSahabat)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Laporan Rekapitulasi LPJ Dana Baksos Lintas Sinodal 2026</Text>
          <Text style={styles.pageNumber}>Halaman 3 dari 3</Text>
        </View>
      </Page>
    </Document>
  );
}
