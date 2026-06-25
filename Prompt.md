
---

### 🎯 **Prompt Pengembangan Aplikasi Web**

> Buatkan sebuah aplikasi Mobile First WPA yang responsif, berbasis **React dengan framework Next.js**, menggunakan **Tailwind CSS** sebagai utility-first styling, komponen UI dari **shadcn/ui**, dan backend/database terintegrasi dengan **Supabase**.  
>
> Aplikasi ini bertujuan untuk mendukung kegiatan **Bakti Sosial Lintas Sinodal 2026** yang diselenggarakan oleh **Yayasan Kesehatan GPIB** di wilayah **Manado (Desa Tondanouw – Kec. Touluaan, Kab. Minahasa Tenggara & Likupang – Kab. Minahasa Utara)** pada tanggal **14–18 September 2026**.
>
> ### 🎨 Desain & Estetika
> - Gunakan **desain modular ultra-modern-premium** dengan tata letak bersih, responsif, dan mudah dinavigasi.
> - Terapkan **palet warna utama** yang mencerminkan nuansa spiritual dan profesional seperti yang terdapat dalam dokumen proposal (misalnya: biru tua, emas/soft gold, putih bersih — sesuaikan jika ada logo atau identitas visual resmi GPIB/GMIM).
> - semua logo ada dalam directory: logo yankes, logo GPIB dan logo GMIM
> - Pastikan antarmuka memiliki kesan **humanis, inklusif, dan transparan**, sesuai semangat pelayanan kemanusiaan lintas sinodal.
>
> ### 🧩 Fitur Utama
> 1. **Halaman Utama Informasi Baksos**
>    - Ringkasan kegiatan: tujuan, lokasi, waktu, latar belakang sosial, dan bentuk layanan kesehatan yang diberikan.
>    - Profil singkat GPIB & GMIM beserta visi-misi relevan.
>    - Galeri foto dokumentasi (opsional placeholder).
>    - News portal mulai dari persiapan, rapat-rapat hingga hal lainnya yang dapat dijadikan berita tentang pra, kegiatan dan pasca kegiatan beserta foto-foto (simpan dalam bucket supabase)
>
> 2. **Generator Proposal Donatur Otomatis**
>    - Formulir input data donatur: nama, institusi/perusahaan (opsional), nama panitia (yang memberikan proposal), dan pesan khusus.
>    - Sistem **auto-numbering proposal** unik berformat: `BAKSOS-GPIB-2026-XXXX` (incremental berdasarkan urutan pembuatan).
>    - Hasil output berupa **PDF proposal resmi** yang:
>      - Memuat header/logo resmi Yayasan Kesehatan GPIB.
>      - Menyertakan detail kegiatan, anggaran, susunan panitia, dan rekening donasi.
>      - Menampilkan nomor proposal unik dan tanggal generate.
>    - PDF dapat diunduh dan dikirim via whatsapp dengan kata-kata pengantar yang sesuai nama donatur dengan attachment pdf proposal yang bersesuaian.
>
> 3. **Sistem Konfirmasi Donasi**
>    - Halaman upload bukti transfer (gambar/file) oleh donatur setelah melakukan donasi.
>    - Upload dilengkapi dengan form: nama donatur, nomor proposal (referensi), dan catatan.
>    - File bukti transfer disimpan di **Supabase Storage** dan terhubung ke entri donasi di database.
>
> 4. **Notifikasi & Ucapan Terima Kasih Otomatis**
>    - Setelah bukti transfer diverifikasi manual, sistem membuat pesan Whatsapp ucapan terima kasih resmi beserta PDF ucapan yang ekslusif kepada donatur (sebagai attachment di Whatsapp).
>    - PDF:
>      - Ucapan syukur dari Panitia Baksos 2026.
>      - Ringkasan donasi mereka.
>      - Link ke laporan penggunaan dana (akan ditambahkan nanti pasca-kegiatan).
>      - Logo dan tanda tangan digital panitia (jika tersedia).
>
> ### 🛠️ Teknologi
> - **Frontend**: Next.js 14 (App Router), React Server Components
> - **Styling**: Tailwind CSS + shadcn/ui components (Button, Card, Form, Dialog, etc.)
> - **State/Form Handling**: React Hook Form + Zod validation
> - **PDF Generation**: `@react-pdf/renderer` atau `pdfmake` (client/server-side)
> - **Backend & Auth**: Supabase (PostgreSQL + Auth + Storage)
> - **Deployment**: Vercel (frontend), Supabase (backend)
>
> ### 🔐 Keamanan & Privasi
> - Data donatur hanya digunakan untuk keperluan administrasi baksos.
> - Bukti transfer tidak ditampilkan publik; hanya bisa diakses oleh admin terverifikasi.
> - Gunakan Supabase Row Level Security (RLS) untuk proteksi data.
>
> Hasil akhir: Aplikasi siap pakai untuk **mengelola donasi secara transparan, profesional, dan penuh berkah**, sejalan dengan nilai-nilai pelayanan gerejawi dan kemanusiaan.

---