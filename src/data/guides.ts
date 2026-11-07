export type Guide = {
  steps: string[];
  rules: string[];
  example: { question: string; code?: string; options?: string[]; answer: string; explanation: string };
};

const MC_STEPS = [
  'Baca soal sampai selesai.',
  'Pilih satu dari empat jawaban (A, B, C, atau D).',
  'Tekan Periksa untuk melihat apakah jawabanmu benar.',
  'Baca pembahasannya, lalu lanjut ke soal berikutnya.',
];

const FILL_STEPS = [
  'Baca soal dan cari bagian yang kosong.',
  'Ketik jawabanmu di kotak isian.',
  'Tekan Periksa untuk melihat apakah jawabanmu benar.',
  'Baca pembahasannya, lalu lanjut ke soal berikutnya.',
];

// Proposed rules: the quiz screen does not exist yet, adjust these when it is built
const SESSION_RULES = [
  'Satu sesi berisi 10 soal.',
  'Setiap jawaban benar mendapat 10 poin.',
  'Tidak ada batas waktu, kerjakan dengan santai.',
  'Jawaban yang sudah diperiksa tidak bisa diganti.',
];

export const GUIDES: Record<string, Record<string, Guide>> = {
  Matematika: {
    'Pilihan ganda': {
      steps: MC_STEPS,
      rules: ['Setiap soal hanya punya satu jawaban benar.', ...SESSION_RULES],
      example: {
        question: 'Berapa hasil dari 12 × 3?',
        options: ['32', '36', '39', '42'],
        answer: '36',
        explanation: '12 × 3 artinya 12 dijumlahkan 3 kali: 12 + 12 + 12 = 36.',
      },
    },
    Isian: {
      steps: FILL_STEPS,
      rules: ['Tulis jawaban dalam angka saja, tanpa satuan.', ...SESSION_RULES],
      example: {
        question: 'Lengkapi: 45 − ___ = 18',
        answer: '27',
        explanation: 'Cari angka yang jika dikurangkan dari 45 menyisakan 18. Caranya 45 − 18 = 27.',
      },
    },
  },
  Coding: {
    'Pilihan ganda': {
      steps: MC_STEPS,
      rules: ['Semua soal coding memakai bahasa Python.', 'Setiap soal hanya punya satu jawaban benar.', ...SESSION_RULES],
      example: {
        question: 'Apa yang ditampilkan oleh kode berikut?',
        code: 'x = 5\nx = x + 2\nprint(x)',
        options: ['5', '7', '52', 'Error'],
        answer: '7',
        explanation: 'x mula-mula bernilai 5, lalu ditambah 2 sehingga menjadi 7. print(x) menampilkan 7.',
      },
    },
    Isian: {
      steps: FILL_STEPS,
      rules: ['Semua soal coding memakai bahasa Python.', 'Huruf besar dan kecil dianggap berbeda.', ...SESSION_RULES],
      example: {
        question: 'Lengkapi kode agar menampilkan tulisan Halo:',
        code: '___("Halo")',
        answer: 'print',
        explanation: 'print() adalah perintah Python untuk menampilkan teks ke layar.',
      },
    },
  },
};
