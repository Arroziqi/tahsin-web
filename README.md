# 🌐 Tahsin App – Web Client

**Tahsin App – Web Client** adalah aplikasi berbasis **Next.js** yang menjadi antarmuka web resmi dari Tahsin App.
Aplikasi ini membantu admin, guru, dan pengelola lembaga untuk mengatur data, jadwal, peserta, dan materi tahsin secara efisien.

---

## 🚀 Fitur Utama
- **Manajemen Jadwal Kelas**
  Membuat, memperbarui, dan memantau jadwal tahsin sesuai level, guru, dan kapasitas.
- **Manajemen Peserta**
  Tambah, ubah, dan pantau data santri/peserta.
- **Monitoring Perkembangan**
  Lihat progres bacaan dan catatan evaluasi.
- **Pengelolaan Guru / Ustadz**
  Menyimpan data guru, mengatur jadwal, dan memantau kinerja.
- **Level & Materi**
  Menentukan level bacaan, kurikulum, dan target capaian tiap tingkatan.
- **Manajemen Pembayaran & Tagihan**
  Pantau status pembayaran peserta.

---

## 📁 Struktur Folder (Ringkas)

```

public/
├── fonts/         # Font Poppins
├── icon/          # Icon SVG
└── img/           # Ilustrasi, logo, dsb.

src/
├── app/           # Halaman Next.js (routing App Dir)
├── components/    # Komponen UI (button, modal, table, dll)
├── common/        # Konstanta, helper, type
├── hooks/         # Custom hooks untuk data & UI
├── lib/           # Logic API & utilitas
└── constants/     # Warna, font, dll

````

---

## 🏁 Getting Started

> Pastikan sudah terinstall [Node.js](https://nodejs.org) dan package manager seperti **npm / yarn / pnpm**.

1. **Clone repository**
   ```bash
   git clone https://github.com/Arroziqi/tahsin-web.git
   cd tahsin-web
   ````

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Konfigurasi environment**

  * Duplikat file `.env.example` menjadi `.env.local`
  * Isi variabel, misalnya:

    ```env
    NEXT_PUBLIC_API_URL=https://api.tahsinapp.com
    NEXTAUTH_SECRET=your-secret
    ```

4. **Jalankan server pengembangan**

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

5. (Opsional) Build untuk produksi:

   ```bash
   npm run build
   npm start
   ```

---

## 🔗 Repositori Terkait

* [Tahsin App – Server API](https://github.com/Arroziqi/tahsin-app-server-monolith.git)
* [Tahsin App – Mobile](https://github.com/Arroziqi/tahsin-mobile.git)

---

## 🧱 Teknologi

* [Next.js 14](https://nextjs.org/)
* [React 18](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Axios](https://axios-http.com/) – komunikasi API
* [NextAuth.js](https://next-auth.js.org/) – autentikasi

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.
Lihat file [LICENSE](LICENSE) untuk detail.
