# MathCode

MathCode adalah aplikasi yang dibuat untuk orang yang ingin belajar matematika dan coding dengan format soal yang sederhana yaitu dalam bentuk isian dan pilihan ganda.

## Penjelasan Konsep

React Native adalah framework yang membantu dalam membuat aplikasi mobile menggunakan JavaScript atau TypeScript dengan React. Cara kerjanya React Native cukup berbeda, kode JavaScript yang ditulis akan dieksekusi oleh engine seperti Hermes di latar belakang aplikasi. Ketika ada interaksi atau perubahan data, React akan menghitung bagian antarmuka mana saja yang perlu diperbarui. Lalu proses rendering React Native akan menginstruksikan OS untuk membuat atau memodifikasi elemen UI native yang sesuai. Sebagai contoh, komponen `<View>` akan diterjemahkan menjadi elemen `android.view.View` di sistem Android dan `UIView` di iOS. Dengan demikian, yang benar-benar tampil di layar ponsel pengguna adalah elemen native, bukan halaman web yang dibungkus di dalam WebView.

Penggunaan React Native untuk aplikasi hybrid seperti MathCode membawa beberapa keunggulan:

1. **Satu basis kode (Single Codebase):** Kode yang sama dapat dicompile dan dijalankan secara multi platform Android, iOS, maupun Web, sehingga menghemat waktu pengembangan.
2. **Tampilan dan interaksi native:** Karena menggunakan antarmuka bawaan OS, komponen seperti tombol, teks, maupun animasi akan terasa responsif dan natural, seperti aplikasi normal.
3. **Siklus pengembangan yang cepat:** Berkat fitur Fast Refresh, developer dapat langsung melihat perubahan antarmuka (UI) di layar simulator sesaat setelah menyimpan kode, tanpa perlu menunggu proses compile (rebuild) ulang yang memakan waktu.

Dalam pengembangannya, React Native sangat bergantung pada konsep Komponen, Props, State, dan Navigasi.

### Komponen dan Props

Komponen merupakan blok UI yang dapat digunakan berulang kali. Sedangkan Props (properties) adalah data turunan yang dikirimkan dari komponen induk ke komponen anak agar elemen tersebut bersifat dinamis. Pada MathCode, saya membuat tombol kustom `PrimaryButton` yang menerima props `label` (untuk teks) dan `onPress` (untuk aksi klik):

```tsx
export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} className="h-12 items-center justify-center rounded-xl bg-blue-700">
      <Text className="text-base font-bold text-white">{label}</Text>
    </TouchableOpacity>
  );
}

// Cara menggunakan komponen di halaman lain:
<PrimaryButton label="Masuk" onPress={handleSubmit} />
```

### State

State adalah data internal milik suatu komponen yang dapat berubah sewaktu-waktu akibat interaksi pengguna. Jika state berubah, komponen tersebut akan dirender ulang secara otomatis. Di halaman utama, saya menggunakan state `subject` untuk melacak materi apa yang sedang dipilih pengguna:

```tsx
const [subject, setSubject] = useState<string>('Matematika');

// Saat tombol ditekan, setSubject('Coding') dipanggil, dan teks di bawah ini akan otomatis berubah
<Text>Jenis soal {subject}</Text>
```

### Navigasi

Untuk perpindahan antar layar, MathCode memanfaatkan Expo Router yang menggunakan sistem file-based routing. Perpindahan halaman dan pengiriman parameter antar layar dapat dilakukan dengan metode push atau replace:

```tsx
// Berpindah ke halaman detail sambil membawa data materi yang dipilih
router.push({ pathname: '/detail', params: { subject, type: question.title } });

// Menerima data parameter di halaman tujuan (detail.tsx)
const { subject, type } = useLocalSearchParams<{ subject: string; type: string }>();
```

## Analisis Kebutuhan

### Masalah

Orang-orang sering kali merasa kesulitan dikarenakan langsung diberi soal latihan tanpa adanya pembahasan terlebih dahulu tentang konsep atau panduan cara pengerjaan. Selain itu, materi dasar matematika dan coding umumnya terpisah di dua platform yang berbeda. Hal ini membuat pengguna untuk bolak-balik berganti aplikasi yang berpotensi memecah fokus dan membuat mereka bingung dalam menentukan titik awal pembelajaran.

### Target Pengguna

Aplikasi ini dirancang untuk pelajar mulai dari kelas 1 SD hingga 12 SMA, serta mahasiswa (dari latar belakang jurusan apa pun) yang baru pertama kali mempelajari logika matematika dasar atau coding dan membutuhkan aplikasi latihan yang nyaman diakses melalui HP.

### Kebutuhan Pengguna

1. Pengguna harus dapat mendaftarkan diri atau masuk ke dalam aplikasi menggunakan email.
2. Pengguna dapat memilih jalur pembelajaran yang diinginkan, yakni materi Matematika atau materi Coding.
3. Pengguna dapat memilih format pengerjaan soal sesuai preferensi (Isian Singkat atau Pilihan Ganda).
4. Pengguna dapat membaca instruksi, cara bermain, dan peraturan dengan jelas sebelum mulai mengerjakan soal latihan.
5. Pengguna dapat mengakses preview atau contoh pengerjaan soal beserta pembahasan jawabannya untuk memahami pola penyelesaian.
6. Pengguna dapat melengkapi profil identitas diri, yang mencakup nama lengkap, status pendidikan, dan tingkatan kelas atau jurusan.

### Tabel Pemetaan Kebutuhan ke Layar dan Komponen

| Kebutuhan | Nama Layar (Screen) | Komponen & Sumber Data |
|---|---|---|
| 1 | `index.tsx`, `daftar.tsx` | `AuthLayout`, `LabeledInput`, `PasswordToggle`, `PrimaryButton`, `ErrorText` |
| 2 | `homepage.tsx` | `Icon`, State `subject`, Data statis `SUBJECTS` dari `src/data/home.ts` |
| 3 | `homepage.tsx` | `Icon`, Props `onPress`, Data `QUESTION_TYPES` dari `src/data/home.ts` |
| 4 | `detail.tsx` | `Section`, `Icon`, Data aturan `GUIDES` dari `src/data/guides.ts` |
| 5 | `detail.tsx` | `Section`, Modul contoh soal pada data `GUIDES` dari `src/data/guides.ts` |
| 6 | `profil.tsx` | `LabeledInput`, `PrimaryButton`, `ErrorText`, State profil |

### Alasan Keputusan Desain (Design Decisions)

- **Warna Utama:** Menggunakan satu warna dominan (biru) dengan latar belakang terang agar bersih dan nyaman dipandang dalam waktu lama.
- **Alur Pengguna (User Flow):** Halaman Detail yang berisi aturan dan contoh sengaja ditaruh sebelum pengguna benar-benar masuk ke mode latihan. Pendekatan ini dipilih karena target aplikasinya adalah pemula yang butuh adaptasi sebelum dievaluasi.
- **Indikator Visual:** Status aktif atau kebenaran jawaban tidak hanya bergantung pada perubahan warna, tetapi dibantu dengan ikon visual (seperti tanda centang) dan teks penjelas ("Jawaban benar") agar lebih ramah bagi pengguna dengan kendala buta warna.
- **Aksesibilitas Sentuhan:** Semua komponen tombol atau area yang bisa diklik (touch target) dirancang agar responsif dan mudah dijangkau.
- **Pemisahan Data:** Teks panjang, daftar panduan, dan soal dipisahkan dari file UI (disimpan di `src/data`) untuk mempermudah manajemen data. Jika dosen ingin mengubah soal, ia tidak perlu membongkar struktur komponen UI.

### Rencana Pengembangan Lanjutan

Pada tahap prototipe ini, data sesi (auth) dan profil belum sepenuhnya tersimpan di local storage, dan mode pengerjaan soal masih dalam tahap penyusunan. Rencana iterasi berikutnya mencakup:

1. Membuat engine kuis di halaman latihan soal yang dilengkapi dengan validasi jawaban langsung dan kalkulasi skor akhir.
2. Mengintegrasikan penyimpanan lokal (seperti AsyncStorage) untuk mempertahankan data profil dan riwayat nilai agar tidak hilang saat aplikasi ditutup.
3. Menghubungkan front-end otentikasi dengan layanan backend atau Backend-as-a-Service (seperti Supabase) untuk sistem login aktual.
4. Mengekspansi database soal menjadi cabang topik yang lebih spesifik (misalnya: operasi aljabar, percabangan if-else, dan perulangan).
