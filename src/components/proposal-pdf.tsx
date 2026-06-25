import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, borderBottom: '2pt solid #1e40af', paddingBottom: 10 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#1e40af' },
  subHeader: { fontSize: 12, color: '#64748b' },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 15 },
  label: { fontSize: 10, color: '#64748b', marginBottom: 4 },
  value: { fontSize: 12, marginBottom: 10 },
  text: { fontSize: 12, lineHeight: 1.5, marginBottom: 10 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#94a3b8', borderTop: '1pt solid #cbd5e1', paddingTop: 10 },
  bankBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 5, marginTop: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  bankTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#1e40af' },
  bankText: { fontSize: 12, marginBottom: 3 }
})

export const ProposalPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Yayasan Kesehatan GPIB</Text>
          <Text style={styles.subHeader}>Bakti Sosial Lintas Sinodal 2026</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.subHeader}>No. Proposal</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1e40af' }}>{data.proposal_number}</Text>
        </View>
      </View>

      <Text style={styles.title}>PROPOSAL PERMOHONAN DANA / BANTUAN</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Kepada Yth.</Text>
        <Text style={styles.value}>{data.donor_name} {data.institution ? `- ${data.institution}` : ''}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Syalom,</Text>
        <Text style={styles.text}>
          Dalam rangka mewujudkan pelayanan kasih bagi sesama, Yayasan Kesehatan GPIB dan GMIM akan mengadakan kegiatan Bakti Sosial Lintas Sinodal pada:
        </Text>
        <View style={{ marginLeft: 20, marginBottom: 10 }}>
          <Text style={styles.text}>• Tanggal: 14 – 18 September 2026</Text>
          <Text style={styles.text}>• Lokasi: Desa Tondanouw (Minahasa Tenggara), Likupang (Minahasa Utara), dan Desa Lolah (Minahasa)</Text>
          <Text style={styles.text}>• Bentuk Layanan: Pengobatan Gratis, Pemeriksaan, Penyuluhan, dll.</Text>
        </View>
        <Text style={styles.text}>
          Melalui proposal ini, kami memohon dukungan doa dan partisipasi dana dari Bapak/Ibu/Saudara/i untuk menyukseskan kegiatan tersebut.
        </Text>
      </View>

      {data.message && (
        <View style={styles.section}>
          <Text style={styles.label}>Pesan Khusus:</Text>
          <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#334155' }}>"{data.message}"</Text>
        </View>
      )}

      <View style={styles.bankBox}>
        <Text style={styles.bankTitle}>Informasi Penyaluran Donasi</Text>
        <Text style={styles.bankText}>Bank: BNI (Contoh)</Text>
        <Text style={styles.bankText}>No. Rekening: 1234567890</Text>
        <Text style={styles.bankText}>a.n: Panitia Baksos Lintas Sinodal 2026</Text>
      </View>

      <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}>Hormat Kami,</Text>
          <Text style={{ ...styles.text, marginTop: 40, textDecoration: 'underline' }}>
            {data.committee_name || 'Panitia Baksos 2026'}
          </Text>
          <Text style={styles.label}>Perwakilan Panitia</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Proposal ini dicetak secara otomatis pada {new Date().toLocaleDateString('id-ID')} | Ref: {data.proposal_number}
      </Text>
    </Page>
  </Document>
)
