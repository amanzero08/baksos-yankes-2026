-- ==========================================
-- SEED DATA UNTUK UJICOBA (BAKSOS YANKES 2026)
-- ==========================================

-- 1. Hapus data lama agar tidak terjadi duplikasi (Hati-hati jika sudah ada data asli!)
TRUNCATE TABLE donations CASCADE;
TRUNCATE TABLE proposals CASCADE;
TRUNCATE TABLE news CASCADE;

-- 2. Memasukkan Data Proposal (Dummy)
INSERT INTO proposals (id, proposal_number, donor_name, institution, committee_name, message)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'BAKSOS-GPIB-2026-0001', 'Bapak Yohanes', 'PT. Maju Bersama', 'Panitia Inti', 'Semoga acara berjalan lancar dan memberkati.'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'BAKSOS-GPIB-2026-0002', 'Ibu Maria', 'Klinik Sehat', 'Seksi Dana', 'Sedikit bantuan untuk pengadaan obat-obatan.'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'BAKSOS-GPIB-2026-0003', 'Bapak Petrus', NULL, 'Ketua Panitia', 'Donasi pribadi.');

-- 3. Memasukkan Data Donasi & Konfirmasi (Dummy)
INSERT INTO donations (proposal_id, donor_name, notes, receipt_url, verified)
VALUES 
  -- Donasi yang tertaut dengan proposal dan sudah diverifikasi
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bapak Yohanes', 'Transfer via BCA', 'dummy-receipt-1.jpg', true),
  
  -- Donasi yang tertaut dengan proposal tapi belum diverifikasi
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Ibu Maria', 'Transfer via BNI tgl 26 Juni', 'dummy-receipt-2.jpg', false),
  
  -- Donasi mandiri (tanpa proposal)
  (NULL, 'Hamba Tuhan (Anonim)', 'Tanpa proposal, transfer Mandiri', 'dummy-receipt-3.jpg', false);

-- 4. Memasukkan Data Berita/News (Dummy)
INSERT INTO news (title, content, image_url)
VALUES 
  ('Rapat Persiapan Baksos Lintas Sinodal 2026', 'Hari ini panitia lintas sinodal dari GPIB dan GMIM mengadakan rapat koordinasi pertama secara daring untuk membahas persiapan logistik dan tenaga medis.', 'news-dummy-1.jpg'),
  ('Survei Lokasi di Desa Tondanouw', 'Tim survei dari Yayasan Kesehatan telah mengunjungi Desa Tondanouw untuk berkoordinasi dengan perangkat desa serta melihat langsung fasilitas yang bisa digunakan untuk pengobatan gratis.', 'news-dummy-2.jpg');
