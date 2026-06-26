-- ==========================================
-- SEED DATA UNTUK UJICOBA (BAKSOS YANKES 2026)
-- ==========================================

-- 1. Hapus data lama agar tidak terjadi duplikasi (Hati-hati jika sudah ada data asli!)
TRUNCATE TABLE donations CASCADE;
TRUNCATE TABLE proposals CASCADE;
TRUNCATE TABLE news CASCADE;
TRUNCATE TABLE kartu_sahabat CASCADE;

-- 2. Memasukkan Data Proposal (Dummy)
INSERT INTO proposals (id, proposal_number, donor_name, institution, committee_name, message)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'BAKSOS-GPIB-2026-0001', 'Bapak Yohanes', 'PT. Maju Bersama', 'Panitia Inti', 'Semoga acara berjalan lancar dan memberkati.'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'BAKSOS-GPIB-2026-0002', 'Ibu Maria', 'Klinik Sehat', 'Seksi Dana', 'Sedikit bantuan untuk pengadaan obat-obatan.'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'BAKSOS-GPIB-2026-0003', 'Bapak Petrus', NULL, 'Ketua Panitia', 'Donasi pribadi.');

-- Sinkronisasi sequence proposal_number_seq agar tidak terjadi bentrok unique constraint saat insert baru
SELECT setval('proposal_number_seq', COALESCE((SELECT MAX(CAST(RIGHT(proposal_number, 4) AS INTEGER)) FROM proposals WHERE proposal_number LIKE 'BAKSOS-GPIB-2026-%'), 0));


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

-- 5. Memasukkan Data Panitia / Kartu Sahabat (Cleaned from Proposal Manado.content.txt)
INSERT INTO kartu_sahabat (committee_name, collected_amount, target_amount)
VALUES 
  ('Pdt. Semuel A. Z. Karinda, M.Si.', 0, 2500000),
  ('dr. Griselda P. S. Aer, Sp.KP', 0, 2500000),
  ('Pdt. Jan Jona Lumanauw', 0, 2500000),
  ('Pnt. Inno Wiesje Subagyono Logor (Jakarta)', 0, 2500000),
  ('Ibu Desye Syul L. (Manado)', 0, 2500000),
  ('Pnt. Reni Kanter', 0, 2500000),
  ('drg. Lanny Ranti', 0, 2500000),
  ('Pnt. Tommy Masinambouw', 0, 2500000),
  ('Dkn. Denny Tewu', 0, 2500000),
  ('Pnt. Adri Manafe', 0, 2500000),
  ('Dkn. Inang M. K. Kaloke', 0, 2500000),
  ('Sdri. Anggita Cesilia Febriana', 0, 2500000),
  ('Ibu Yetje Sumual', 0, 2500000),
  ('Dkn. Lady Tangkere-Sondakh', 0, 2500000),
  ('Ibu Karema Rumambi', 0, 2500000),
  ('Pdt. Marthen Leiwakabessy', 0, 2500000),
  ('Ibu Marcela Lantang', 0, 2500000),
  ('Pdt. Danny Titaley', 0, 2500000),
  ('Dkn. Yvone Wakkary', 0, 2500000),
  ('Pnt. Antje Kanter', 0, 2500000),
  ('Pnt. Max Roring', 0, 2500000),
  ('Dkn. Ellen Tahalele', 0, 2500000),
  ('Ibu Nancy Rita Damping', 0, 2500000),
  ('Dkn. Vicora Van der Muur', 0, 2500000),
  ('Ibu Diana Johanes', 0, 2500000),
  ('Ibu Tine Sigarlaki', 0, 2500000),
  ('Bpk. Edward Kanter', 0, 2500000),
  ('Ibu Esther Polii', 0, 2500000),
  ('Dkn. Daniel F. Lolo', 0, 2500000),
  ('Dkn. Okta Friyanto', 0, 2500000),
  ('Pnt. Heince Tumewu', 0, 2500000),
  ('Bpk. Agus Patty', 0, 2500000),
  ('Pnt. Sahat Sianipar', 0, 2500000),
  ('Ibu Revny Longkutoy', 0, 2500000),
  ('Dkn. Wulan Sanggelorang', 0, 2500000),
  ('Pdt. Johny A. Lontoh', 0, 2500000),
  ('Pdt. Sealthiel Izaak', 0, 2500000),
  ('Pdt. Asachristo', 0, 2500000),
  ('Bpk. Edwien Moniaga', 0, 2500000),
  ('Ibu Yanny Siraya Santi Papia, SIP', 0, 2500000),
  ('Bpk. Saldy Jacob, S.Pd', 0, 2500000),
  ('Bpk. Butje Ferry Maramis', 0, 2500000),
  ('Bpk. Edward Sumual', 0, 2500000),
  ('Ibu Wulan Badahura', 0, 2500000),
  ('Dkn. dr. Netty Selanno', 0, 2500000),
  ('Pnt. dr. Cleve Sumeisey', 0, 2500000),
  ('Dkn. Nancy Wehantouw', 0, 2500000),
  ('Bpk. Toni Irawan', 0, 2500000),
  ('dr. Theo Resilowi', 0, 2500000),
  ('drg. Feylia', 0, 2500000),
  ('drg. Iphighenia M.', 0, 2500000),
  ('Bpk. Rio Lembong', 0, 2500000),
  ('Bpk. Ezra Sengkey', 0, 2500000),
  ('Ibu Yanti Tumbol', 0, 2500000),
  ('Bpk. Chris Rumansi', 0, 2500000),
  ('Bpk. Arther Runturambi', 0, 2500000),
  ('Ibu Vanda Rantung', 0, 2500000),
  ('Bpk. Raymond Sumual, S.TEOL', 0, 2500000),
  ('Ibu Yulita Ceisy Mangundap', 0, 2500000),
  ('Ibu Priscillia Warouw', 0, 2500000),
  ('Bpk. Lando Sumarauw', 0, 2500000),
  ('Ibu Nathalia KM Mamoto', 0, 2500000),
  ('Ibu Josephine Inez Rompas', 0, 2500000),
  ('Ibu Paula Makalew', 0, 2500000),
  ('Ibu Gracia Yubelinda Oroh', 0, 2500000);
