/**
 * @file Canonical FAQ Data - Five key questions: farmer access and subscription, AI accuracy, rejections, delivery and payment, and getting started.
 */

import type { FaqItem } from "@/types/landing";

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "faq-biaya",
    category: "umum",
    question: "Siapa yang membayar, dan bagaimana sistem langganannya?",
    answer:
      "Petani dan kelompok tani memposting lot panen secara gratis dengan kuota penilaian AI bulanan, karena merekalah sisi pasokan. Pembeli (dapur MBG, katering, restoran, pengolah, dan koperasi) berlangganan paket sesuai kebutuhan, ditambah biaya layanan kecil per transaksi. Rincian paket diumumkan saat layanan dibuka.",
  },
  {
    id: "faq-akurasi-ai",
    category: "ai",
    question: "Seberapa akurat grade A–D dari AI, dan apakah itu jaminan keamanan pangan?",
    answer: "Model AI visual kami menilai kondisi fisik dari foto terpandu (keseragaman warna, tingkat layu, bercak permukaan) beserta waktu sejak panen. Penting: Grade AI adalah indikasi mutu visual, bukan jaminan keamanan pangan. Foto tidak bisa mendeteksi kuman, residu pestisida, atau racun. Bila tingkat keyakinan AI ragu (<70%), sistem otomatis menurunkan satu tingkat grade, dan pembeli tetap wajib memeriksa sayur saat serah terima.",
  },
  {
    id: "faq-tolak-sayur",
    category: "operasional",
    question: "Bagaimana jika pembeli menolak sayur saat barang tiba?",
    answer: "Pembeli dapat menerima atau menolak lot dengan mengunggah bukti foto dan alasan terstruktur di aplikasi. Dua hal langsung terjadi: pertama, keputusan terima/tolak tersebut menjadi data pelatihan untuk meningkatkan akurasi AI kami; kedua, lot yang ditolak tidak terbuang melainkan langsung diturunkan tingkatnya (misal dari Grade A ke B atau C) dan ditawarkan ke pembeli terdekat di peta.",
  },
  {
    id: "faq-pengiriman",
    category: "operasional",
    question: "Siapa yang mengurus pengiriman dan pembayaran?",
    answer:
      "SINTAS adalah platform web dan AI informasi niaga. Kami tidak memiliki armada logistik atau gudang pendingin. Pengiriman disepakati langsung antara petani/koperasi dan pembeli, dengan estimasi ongkos antar yang dihitung transparan oleh mesin harga. Pembayaran diproses oleh mitra payment gateway berizin, sehingga SINTAS tidak membuat dompet atau mengendapkan dana sendiri.",
  },
  {
    id: "faq-mulai",
    category: "umum",
    question: "Kapan SINTAS bisa dipakai, dan bagaimana cara memulainya?",
    answer:
      "SINTAS sedang dalam pengembangan. Akses akun dan langganan akan dibuka bertahap untuk wilayah Pulau Jawa. Sementara itu, hubungi kami lewat formulir kontak di bagian bawah halaman ini dan tim Nirsisa akan menjawab pertanyaan Anda.",
  },
] as const;
