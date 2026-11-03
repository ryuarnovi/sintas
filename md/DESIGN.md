# Design System & UI Rules: SINTAS Landing Page

> **Directive**: Dokumen ini adalah sumber kebenaran tunggal untuk **semua keputusan visual dan interaksi** di landing page SINTAS. Baca **satu kali** di awal sesi bersama `md/RULES.md` (aturan engineering). Jika ada konflik: `RULES.md` menang untuk struktur kode, `DESIGN.md` menang untuk tampilan, animasi, dan konten. Jangan menciptakan warna, font, radius, atau pola animasi di luar yang tertulis di sini. Jika butuh sesuatu yang belum ada, turunkan dari token yang sudah ada dan tambahkan ke dokumen ini.

> **Pembaruan redesign (Nov 2026):** halaman kini **8 section** (Hero, Masalah, Cara Kerja, AI, Peta, Harga, FAQ, Gabung Pilot); `HeroSyncMap`, `WhyNow`, `Audience`, `Cascade`, `Trust` dilebur. Palet memakai Nirsisa: `forest-900 #014F2F`, `leaf-500 #65AF3E`, `snow #FEFEFE`, plus `mist-50 #F4F8EE`, `forest-950 #012A19`, `amber-500 #F2B84B` (Grade C), `soil-700 #8A5A3C` (Grade D), `lime-400 #B7D33C` (Grade B). Tema section: `light | dark | mist`. Motif: kontur topografi (`.bg-contour`), `ScrollProgress`, `RevealText`, `GradeLadder`. Bagian di bawah yang bertentangan dengan catatan ini dianggap usang. Alur WhatsApp dihapus dan pembayaran lewat payment gateway berizin.

---

## 0. Ringkasan Cepat (TL;DR)

- **Konsep:** "Satu Alur, Tanpa Sisa". Motif utama adalah **S-Flow**, jalur berbentuk huruf S dari logo yang terdiri dari 4 segmen warna = **Grade A → B → C → D**.
- **Mood:** *organic-tech*. Section terang berwarna kertas hangat bergantian dengan section "AI" berwarna hijau hutan gelap.
- **Navbar:** pill glass mengambang di tengah atas (wajib).
- **Font:** Bricolage Grotesque (display), Geist (body), Geist Mono (data/AI).
- **Ikon:** `lucide-react` saja.
- **Animasi:** `motion` (`motion/react`) + `lenis`. Hormati `prefers-reduced-motion`.
- **Bahasa:** Bahasa Indonesia, `lang="id"`.
- **Halaman:** satu halaman (`app/page.tsx`) berisi 12 section + footer. **Tidak ada section paket harga.**
- **Brand:** SINTAS di seluruh halaman. **Nirsisa** (perusahaan induk) hanya muncul di **footer**.

---

## 1. Konteks Produk (wajib dipahami sebelum mendesain)

**SINTAS** (*Sistem Informasi Niaga, Taksir, Alokasi Sayur*) adalah webapp berbasis AI yang mempertemukan **petani sayur** dengan **pembeli** melalui **peta stok**. Pembeli melihat lot panen di peta. Tagline: **"Panen selamat, tanpa sisa."**

### 1.1 Fitur AI (empat pilar yang harus tampil di landing page)

| Pilar | Penjelasan singkat | Ikon Lucide |
|---|---|---|
| **AI Grade dari foto** | Petani memotret panen, lalu AI memberi grade A–D dan perkiraan sisa umur segar. | `ScanSearch` |
| **Penyaluran otomatis per grade** | Lot dicocokkan ke pembeli sesuai grade. Saat grade turun seiring waktu, lot otomatis ditawarkan ke pembeli tingkat berikutnya. | `Workflow` |
| **Prediksi harga per grade** | Harga rekomendasi, batas bawah biaya petani, dan rincian harga yang transparan. | `ChartSpline` |
| **Panen atau tanam?** | Saran "panen sekarang / tunda panen" dan rekomendasi komoditas untuk ditanam. | `Sprout` |

### 1.2 Grade & tujuan penyaluran (data kanonik, jangan diubah)

| Grade | Kondisi | Tujuan / segmen pembeli |
|---|---|---|
| **A** | Segar prima | Dapur MBG, restoran & kafe, ritel, katering |
| **B** | Layak makan, tidak sempurna | Warung & UMKM, katering, perorangan, pengolah, pengepul |
| **C** | Bukan untuk manusia | Peternak, budidaya maggot, pengepul pakan |
| **D** | Busuk atau berjamur | Kompos, pupuk cair |

### 1.3 Segmen pembeli (untuk marquee, filter peta, dan kartu)

Dapur MBG · Restoran & kafe · Katering · Ritel · Warung & UMKM · Perorangan · Pengolah · Pengepul · Peternak · Budidaya maggot · Kompos & pupuk

### 1.4 Batasan kejujuran (WAJIB tercermin di UI)

- Grade AI adalah **indikasi mutu, bukan jaminan keamanan pangan**. Kalimat ini wajib ada di section AI, Kepercayaan, dan FAQ.
- Fitur masih dalam pengembangan. Label status yang dipakai: **"Segera hadir"** atau **"Program pilot"**. Semua tampilan aplikasi diberi caption **"Ilustrasi"**.
- Angka harga dan simulasi berupa **ilustrasi**. Statistik masalah wajib menyertakan **sumber**.
- SINTAS hanya web + AI. **Tidak** mengurus logistik dan **tidak** memegang uang. Jangan menggambarkan truk SINTAS, gudang SINTAS, atau dompet SINTAS.

---

## 2. Prinsip Desain

1. **Sinkron (Sync).** Semua yang bergerak harus menggambarkan aliran dari petani ke pembeli atau dari grade ke tujuan. Motif yang dipakai: garis alur, busur peta, partikel, dan titik "live". Animasi tanpa makna dilarang.
2. **AI yang terlihat, bukan sihir.** Tunjukkan *bagaimana* AI bekerja (scan, skor, alasan, waktu), bukan sekadar label "AI-powered". Angka AI selalu memakai font mono.
3. **Tanpa sisa.** Setiap grade punya tujuan dan tidak ada jalan buntu. Warna grade dipakai konsisten di semua komponen.
4. **Jujur & membumi.** Pakai foto nyata, bahasa sederhana, sumber pada setiap klaim, dan disclaimer yang tidak disembunyikan.

---

## 3. Brand & Logo

### 3.1 Aset

Salin dari `../logo/` dan `../instagram/assets/` ke `public/brand/`:

| File sumber | Tujuan | Pemakaian |
|---|---|---|
| `logo/sintas-ikon.png` | `public/brand/sintas-ikon.png` | Navbar (ikon), favicon, watermark |
| `logo/sintas-logo-horizontal-transparan.png` | `public/brand/sintas-logo-horizontal.png` | Footer, OG image |
| `logo/sintas-logo-gelap.png` | `public/brand/sintas-logo-gelap.png` | Di atas latar gelap |
| `instagram/assets/nirsisa-logo-putih.png` | `public/brand/nirsisa-logo-putih.png` | Footer (latar gelap) |

> Lebih disukai: buat ulang **ikon S** sebagai komponen SVG `components/common/SintasMark.tsx` (4 path segmen + daun). Komponen ini dipakai untuk navbar, watermark, dan animasi S-Flow sehingga tiap segmen bisa dianimasikan sendiri-sendiri.

### 3.2 Aturan logo

- Area kosong minimal = tinggi daun pada logo di setiap sisi.
- Jangan mengubah warna segmen, memutar, memberi efek bayangan atau glow pada logo, atau meletakkannya di atas foto ramai tanpa latar.
- Wordmark "SINTAS" di navbar boleh ditulis sebagai teks (Bricolage Grotesque, weight 700, tracking `-0.02em`, warna `forest-900`) di samping ikon SVG.

---

## 4. Warna

Semua warna diambil dari logo. Struktur token tiga lapis: **primitive → semantic → component**. Komponen **hanya** boleh memakai token semantic atau component, bukan hex mentah.

### 4.1 Primitive

| Token | Hex | Asal |
|---|---|---|
| `forest-950` | `#06231A` | Turunan gelap wordmark |
| `forest-900` | `#0B3D2E` | Wordmark SINTAS |
| `forest-700` | `#136F4B` | Daun logo |
| `leaf-500` | `#2E9E5B` | Segmen S #1 (Grade A) |
| `leaf-600` | `#1F7A47` | Varian teks dari leaf-500 |
| `leaf-300` | `#5BC183` | Varian terang untuk latar gelap |
| `lime-400` | `#B7D33C` | Segmen S #2 (Grade B) |
| `amber-500` | `#E9A21A` | Segmen S #3 (Grade C) |
| `amber-700` | `#9A6510` | Varian teks amber |
| `soil-700` | `#7A4B2A` | Segmen S #4 (Grade D) |
| `soil-300` | `#C4936A` | Varian terang untuk latar gelap |
| `sage-300` | `#94BEAD` | Garis daun logo |
| `slate-600` | `#5F6F67` | Tagline logo |
| `slate-700` | `#4A5A53` | Teks sekunder kuat |
| `paper-50` | `#F6F5EF` | Latar utama (kertas hangat) |
| `paper-100` | `#ECEBE2` | Latar alternatif / muted |
| `white` | `#FFFFFF` | Kartu |

### 4.2 Semantic

| Token | Light section | Dark section |
|---|---|---|
| `--bg` | `paper-50` | `forest-950` |
| `--surface` (kartu) | `white` | `forest-900` |
| `--surface-muted` | `paper-100` | `#0E3326` |
| `--fg` (teks utama) | `forest-900` | `paper-50` |
| `--fg-muted` (teks sekunder) | `slate-600` | `#A9BDB3` |
| `--border` | `forest-900 / 10%` | `paper-50 / 10%` |
| `--accent` (AI glow, highlight) | `leaf-600` | `lime-400` |
| `--ring` (fokus) | `leaf-500` | `lime-400` |

### 4.3 Warna Grade (paling penting, konsisten di mana pun)

| Grade | Fill / pin / garis | Teks di atas fill | Teks grade di latar terang | Teks grade di latar gelap |
|---|---|---|---|---|
| A | `leaf-500` `#2E9E5B` | `forest-950` | `leaf-600` | `leaf-300` |
| B | `lime-400` `#B7D33C` | `forest-950` | `forest-900` (pakai badge) | `lime-400` |
| C | `amber-500` `#E9A21A` | `forest-950` | `amber-700` | `amber-500` |
| D | `soil-700` `#7A4B2A` | `white` | `soil-700` | `soil-300` |

### 4.4 Rasio kontras yang sudah diverifikasi (WCAG AA)

| Pasangan | Rasio | Status |
|---|---|---|
| `forest-900` di atas `paper-50` | 11.17 | ✅ teks apa pun |
| `slate-600` di atas `paper-50` | 4.86 | ✅ teks body |
| `leaf-600` di atas `paper-50` | 4.89 | ✅ teks |
| `leaf-500` di atas `paper-50` | 3.12 | ❌ jangan untuk teks; hanya fill, ikon besar, atau garis |
| `white` di atas `leaf-500` | 3.41 | ❌ jangan untuk label tombol |
| `white` di atas `forest-700` | 6.17 | ✅ |
| `forest-950` di atas `lime-400` | 9.81 | ✅ CTA aksen |
| `forest-950` di atas `leaf-500` | 4.88 | ✅ badge A |
| `forest-900` di atas `amber-500` | 5.61 | ✅ badge C |
| `white` di atas `soil-700` | 7.32 | ✅ badge D |
| `lime-400` di atas `forest-950` | 9.81 | ✅ aksen di section gelap |
| `#A9BDB3` di atas `forest-950` | 8.41 | ✅ teks sekunder gelap |

**Larangan warna:**
- Jangan memakai `lime-400` atau `amber-500` sebagai warna teks di latar terang.
- Jangan memakai gradien pelangi atau gradien ungu-biru generik.
- Gradien hanya boleh: (a) radial glow `lime-400/15` di section gelap, (b) gradien 4 warna grade **dengan urutan A→D**, khusus untuk motif S-Flow dan progress bar.
- Jangan memakai warna merah untuk "buruk". Grade D memakai cokelat tanah, karena D tetap punya tujuan (kompos).

### 4.5 Implementasi Tailwind v4 (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Primitive */
  --color-forest-950: #06231a;
  --color-forest-900: #0b3d2e;
  --color-forest-700: #136f4b;
  --color-leaf-300: #5bc183;
  --color-leaf-500: #2e9e5b;
  --color-leaf-600: #1f7a47;
  --color-lime-400: #b7d33c;
  --color-amber-500: #e9a21a;
  --color-amber-700: #9a6510;
  --color-soil-300: #c4936a;
  --color-soil-700: #7a4b2a;
  --color-sage-300: #94bead;
  --color-slate-600: #5f6f67;
  --color-slate-700: #4a5a53;
  --color-paper-50: #f6f5ef;
  --color-paper-100: #ecebe2;

  /* Grade (alias) */
  --color-grade-a: var(--color-leaf-500);
  --color-grade-b: var(--color-lime-400);
  --color-grade-c: var(--color-amber-500);
  --color-grade-d: var(--color-soil-700);

  /* Radius */
  --radius-card: 1.75rem;   /* 28px */
  --radius-tile: 1rem;      /* 16px */

  /* Shadow: bertint hijau, bukan abu netral */
  --shadow-soft: 0 1px 2px rgb(11 61 46 / 0.06), 0 8px 24px -8px rgb(11 61 46 / 0.12);
  --shadow-float: 0 2px 4px rgb(11 61 46 / 0.06), 0 24px 48px -16px rgb(11 61 46 / 0.22);
  --shadow-glow: 0 0 0 1px rgb(183 211 60 / 0.25), 0 0 32px -4px rgb(183 211 60 / 0.35);

  /* Easing */
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);

  /* Keyframes */
  --animate-sync-pulse: sync-pulse 2s var(--ease-out-expo) infinite;
  --animate-marquee: marquee 40s linear infinite;
  @keyframes sync-pulse {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
}

/* Font dari next/font: pakai inline karena merujuk ke CSS variable */
@theme inline {
  --font-display: var(--font-bricolage);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* Semantic tokens per tema section */
:root,
[data-theme="light"] {
  --bg: var(--color-paper-50);
  --surface: #ffffff;
  --surface-muted: var(--color-paper-100);
  --fg: var(--color-forest-900);
  --fg-muted: var(--color-slate-600);
  --border: rgb(11 61 46 / 0.1);
  --accent: var(--color-leaf-600);
  --ring: var(--color-leaf-500);
}
[data-theme="dark"] {
  --bg: var(--color-forest-950);
  --surface: var(--color-forest-900);
  --surface-muted: #0e3326;
  --fg: var(--color-paper-50);
  --fg-muted: #a9bdb3;
  --border: rgb(246 245 239 / 0.1);
  --accent: var(--color-lime-400);
  --ring: var(--color-lime-400);
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-muted: var(--surface-muted);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-ring: var(--ring);
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
}
```

Cara pakai: setiap `<section>` diberi atribut `data-theme="light" | "dark"`, lalu memakai class semantic (`bg-bg text-fg border-border text-fg-muted`). Dengan begitu komponen yang sama otomatis menyesuaikan tema section tempatnya berada.

> Tidak ada toggle dark mode dan tidak mengikuti `prefers-color-scheme`. Ritme terang/gelap ditentukan per section (lihat §10.1). Hapus blok `@media (prefers-color-scheme: dark)` bawaan template.

---

## 5. Tipografi

### 5.1 Font (lewat `next/font/google` di `app/layout.tsx`)

| Peran | Font | Variable | Weight |
|---|---|---|---|
| Display / heading | **Bricolage Grotesque** (`Bricolage_Grotesque`) | `--font-bricolage` | 500, 600, 700, 800 |
| Body / UI | **Geist** | `--font-geist-sans` | 400, 500, 600 |
| Data / AI / angka | **Geist Mono** | `--font-geist-mono` | 400, 500 |

Set `<html lang="id">`. Semua font memakai `subsets: ["latin"]` dan `display: "swap"`.

### 5.2 Skala (fluid)

| Token | Ukuran | Line-height | Tracking | Font | Pemakaian |
|---|---|---|---|---|---|
| `display-xl` | `clamp(3rem, 7vw, 6rem)` | 0.95 | -0.035em | display 700 | Headline hero |
| `display-lg` | `clamp(2.5rem, 5vw, 4.5rem)` | 1.0 | -0.03em | display 700 | Angka statistik raksasa, CTA akhir |
| `h2` | `clamp(2rem, 4vw, 3.25rem)` | 1.05 | -0.025em | display 600 | Judul section |
| `h3` | `clamp(1.375rem, 2vw, 1.75rem)` | 1.2 | -0.015em | display 600 | Judul kartu besar |
| `h4` | `1.125rem` | 1.3 | -0.01em | sans 600 | Judul kartu kecil |
| `body-lg` | `1.125rem–1.25rem` | 1.6 | 0 | sans 400 | Lead paragraf |
| `body` | `1rem` | 1.6 | 0 | sans 400 | Teks umum |
| `small` | `0.875rem` | 1.5 | 0 | sans 400 | Caption, catatan |
| `eyebrow` | `0.75rem` | 1 | 0.18em, UPPERCASE | mono 500 | Label di atas judul section |
| `data` | bebas | 1 | -0.01em, `tabular-nums` | mono 500 | Harga, persen, jam, koordinat |

### 5.3 Aturan tipografi

- Satu `h1` per halaman, yaitu headline hero.
- Judul memakai `text-balance`, paragraf memakai `text-pretty`. Lebar maksimal paragraf `max-w-[60ch]`.
- **Kata kunci dalam headline** boleh diberi aksen warna `--accent` (contoh: "tanpa **sisa**."). Maksimal satu frasa per judul.
- Semua angka harga, persentase, berat, dan waktu memakai `font-mono tabular-nums`. Format Indonesia: `Rp35.000`, `−94%`, `27.486`, `14.00`.
- Eyebrow selalu diawali penanda kecil: titik `●` berwarna accent atau nomor section (`01 —`).

---

## 6. Layout, Spasi, Radius, Elevation

- **Container:** `max-w-7xl` (1280px), `px-5 sm:px-8 lg:px-12`. Section full-bleed (peta, S-Flow) boleh melewati container.
- **Grid:** 12 kolom desktop, 6 kolom tablet, 4 kolom mobile, gap `gap-6 lg:gap-8`.
- **Ritme vertikal section:** `py-24 md:py-32 lg:py-40`. Jarak antara judul section dan konten `mt-12 md:mt-16`.
- **Skala spasi:** hanya kelipatan 4 (skala Tailwind bawaan).
- **Radius:**
  - `rounded-full`: navbar, tombol, chip, badge, avatar.
  - `rounded-card` (28px): kartu besar, bento, mockup.
  - `rounded-tile` (16px): kartu kecil, input, popup peta.
  - Jangan memakai sudut tajam 0px kecuali untuk garis pembatas.
- **Elevation:** `shadow-soft` untuk kartu statis, `shadow-float` untuk elemen melayang (kartu hero, popup), `shadow-glow` khusus elemen AI di section gelap.
- **Border:** kartu di section terang memakai `border border-border` + `shadow-soft`. Kartu di section gelap memakai `bg-surface` + `border-border`, tanpa shadow.
- **Glass:** hanya untuk (1) navbar dan (2) kartu yang melayang di atas peta atau foto. Resep: `bg-white/65 backdrop-blur-xl border border-white/60` (terang) atau `bg-forest-950/55 backdrop-blur-xl border border-white/10` (gelap). Jangan memakai glass untuk kartu konten biasa.
- **Tekstur:** overlay grain/noise SVG dengan opacity 3–4% di section gelap (`public/textures/grain.svg`, `pointer-events-none`, `mix-blend-overlay`), agar terasa organik dan tidak datar.

---

## 7. Ikonografi

- **Hanya `lucide-react`.** Dilarang memakai emoji sebagai ikon, library ikon lain, atau ikon dalam bentuk PNG.
- Default: `size={20}`, `strokeWidth={1.75}`. Ukuran yang diizinkan: 16 (inline/chip), 20 (UI), 24 (kartu fitur), 32 (ikon hero di bento).
- Ikon dekoratif diberi `aria-hidden="true"`. Tombol yang hanya berisi ikon wajib punya `aria-label` berbahasa Indonesia.
- Nama ikon mengikuti **lucide-react v1** (beberapa ikon sudah berganti nama, misalnya `FileQuestionMark` dan `FingerprintPattern`, dan ikon brand seperti Instagram sudah dihapus). Cek ekspor di `node_modules/lucide-react` sebelum memakai nama baru.
- Wadah ikon kartu fitur: lingkaran `size-12 rounded-full`. Di section terang memakai `bg-surface-muted text-fg`, di section gelap memakai `bg-lime-400/10 text-lime-400 ring-1 ring-lime-400/20`.

### Pemetaan konsep → ikon (pakai konsisten)

| Konsep | Ikon |
|---|---|
| Foto panen / kamera | `Camera` |
| AI menilai / scan | `ScanSearch`, `ScanLine` |
| Insight AI | `Sparkles` (maksimal 1 per section) |
| Peta / lokasi | `MapPin`, `Map` |
| Sinkron / penyaluran | `Workflow`, `ArrowRightLeft`, `Route` |
| Turun tingkat / alur ulang | `Recycle`, `CornerRightDown` |
| Harga | `Tag`, `Receipt` |
| Prediksi / grafik | `ChartSpline`, `TrendingUp`, `TrendingDown` |
| Panen / tanam | `Sprout`, `Wheat`, `Leaf` |
| Waktu / kesegaran | `Timer`, `Clock` |
| Kepercayaan | `ShieldCheck`, `BadgeCheck`, `FingerprintPattern` |
| Petani | `Tractor`, `Sprout` |
| Dapur MBG / katering | `CookingPot`, `UtensilsCrossed` |
| Restoran | `ChefHat` |
| Warung / UMKM / ritel | `Store` |
| Perorangan | `User` |
| Pengepul | `Warehouse` |
| Peternak / maggot | `Bug`, `Egg` |
| Kompos | `Recycle`, `Shovel` |
| Terima / tolak | `CircleCheck`, `CircleX` |
| CTA panah | `ArrowRight`, `ArrowUpRight` |

---

## 8. Sistem Animasi

### 8.1 Library

| Library | Paket | Pemakaian |
|---|---|---|
| Motion | `motion` (import dari `motion/react`) | Semua animasi komponen, scroll-linked (`useScroll`, `useTransform`), layout animation, gesture |
| Lenis | `lenis` (pakai `ReactLenis` dari `lenis/react`) | Smooth scroll global, dipasang di satu provider client |
| NumberFlow | `@number-flow/react` | Angka yang bergulir (statistik, harga, countdown) |

**Dilarang:** GSAP, AOS, animate.css, react-spring. Cukup satu sistem animasi.

### 8.2 Token animasi (simpan di `lib/motion.ts`)

```ts
export const duration = { fast: 0.15, base: 0.25, slow: 0.4, slower: 0.7 } as const;
export const ease = { out: [0.22, 1, 0.36, 1], inOut: [0.65, 0, 0.35, 1] } as const;
export const spring = {
  snappy: { type: "spring", stiffness: 400, damping: 32 },
  soft: { type: "spring", stiffness: 220, damping: 28 },
} as const;
```

### 8.3 Pola standar

- **Reveal on scroll:** `opacity 0→1`, `y 24→0`, `duration.slower`, `ease.out`, `viewport={{ once: true, margin: "-15%" }}`. Elemen bersaudara diberi stagger `0.06s`, maksimal 6 elemen.
- **Hover kartu:** `y: -4` dan shadow naik satu tingkat, `duration.base`.
- **Hover tombol:** latar sedikit lebih gelap atau terang, dan ikon panah bergeser `x: 3`. Saat ditekan: `scale: 0.97`.
- **Tab / segmented / navbar aktif:** pill latar bergeser memakai `layoutId`, dengan `spring.snappy`.

### 8.4 Signature motion (identitas SINTAS)

| Nama | Makna | Implementasi |
|---|---|---|
| **Sync Pulse** | Data live / tersinkron | Titik `size-2 bg-lime-400` (gelap) atau `bg-leaf-500` (terang) + cincin `animate-sync-pulse`. Dipakai di CTA navbar, kartu lot, dan pin peta. |
| **Flow Line** | Penyaluran | `<motion.path>` dengan `pathLength` 0→1 yang terikat ke scroll (`useScroll` + `useTransform`). Partikel (`circle r=3`) bergerak di sepanjang path dengan `offset-path` CSS atau `getPointAtLength`. Warna mengikuti grade segmen. |
| **AI Scan** | AI sedang menilai | Garis horizontal bergradien `lime-400` turun dari atas ke bawah foto (1.2s), lalu 2–3 bounding box (`border-lime-400`, sudut ala crosshair) muncul dengan stagger, lalu skor mono menghitung naik (NumberFlow), lalu badge grade muncul memakai `spring.soft`. |
| **Grade Decay** | Grade turun seiring waktu | Badge berganti A→B→C→D dengan crossfade warna (`duration.slow`) dan label waktu diperbarui. Lot sekaligus "meluncur" ke kolom pembeli berikutnya memakai `layout`. |
| **Number Roll** | Angka penting | NumberFlow memicu animasi saat masuk viewport. Untuk harga anjlok, angka turun dari nilai awal ke nilai akhir. |
| **Map Arc** | Petani terhubung ke pembeli | Busur SVG quadratic antara dua pin, `pathLength` 0→1 lalu memudar, berulang secara acak tiap 1.5–3s dengan maksimal 4 busur sekaligus. |

### 8.5 Aturan wajib animasi

- **`prefers-reduced-motion: reduce`**: pakai `useReducedMotion()` dari Motion. Jika aktif, semua animasi berulang (pulse, arc, marquee, partikel) **berhenti**, reveal langsung tampil, dan scroll-linked menampilkan state akhir. Lenis dinonaktifkan.
- Hanya animasikan `transform`, `opacity`, `pathLength`, dan `filter` ringan. Jangan menganimasikan `width`, `height`, `top`, atau `left`.
- Animasi berulang hanya berjalan saat terlihat di layar (`useInView`). Jika di luar layar, animasi di-pause.
- Tidak boleh ada animasi yang menghalangi konten. Teks harus terbaca walau JavaScript gagal (SSR menampilkan state akhir atau visible).
- Durasi interaksi UI ≤ 400ms. Hanya storytelling scroll yang boleh lebih panjang.

---

## 9. Spesifikasi Komponen

Semua primitive UI ada di `components/ui/`, memakai `cva` + `cn()`. Primitive dengan perilaku kompleks (Accordion, Tabs, Slider, Tooltip, Dialog/Sheet, ToggleGroup) memakai **shadcn/ui (Radix)** lalu di-restyle dengan token di dokumen ini.

### 9.1 NavbarPill (`components/common/NavbarPill.tsx`), WAJIB

**Struktur (desktop ≥ lg):**
```
[ (S) SINTAS ]  [ Masalah  Cara Kerja  AI  Penyaluran  Peta  FAQ ]  [ ● Gabung Pilot → ]
```

| Properti | Nilai |
|---|---|
| Posisi | `fixed top-4 inset-x-0 mx-auto z-50`, lebar `w-[min(100%-2rem,56rem)]` |
| Bentuk | `rounded-full h-14 px-2 pl-4`, flex `justify-between items-center` |
| Latar (di atas section terang) | `bg-white/65 backdrop-blur-xl border border-forest-900/10 shadow-float` |
| Latar (di atas section gelap) | `bg-forest-950/55 backdrop-blur-xl border border-white/10`, teks `paper-50` |
| Menu | `text-sm font-medium`, `px-4 h-10 rounded-full`. Item aktif memakai pill latar `bg-forest-900/6` (terang) atau `bg-white/10` (gelap) yang bergeser lewat `layoutId="nav-active"` |
| CTA | Tombol `accent` ukuran `sm`: `bg-lime-400 text-forest-950`, berisi Sync Pulse di kiri dan `ArrowRight` di kanan |

**Perilaku:**
1. **Deteksi tema:** setiap section punya `data-theme`. Navbar memakai IntersectionObserver pada garis `top: 40px` untuk mengetahui tema section di bawahnya, lalu transisi warna latar dalam `duration.slow`.
2. **Scroll-spy:** item menu aktif mengikuti section yang terlihat (`id` section: `masalah`, `cara-kerja`, `ai`, `penyaluran`, `peta`, `faq`).
3. **Menyusut:** saat scroll ke bawah lebih dari 120px, menu tengah mengecil (`h-12`, padding dikurangi). Saat scroll ke atas, kembali penuh. Navbar **tidak pernah disembunyikan total**.
4. **Mobile (< lg):** pill berisi logo dan tombol `Menu` (ikon). Saat diketuk, pill **memanjang menjadi panel** (`layout` animation, `rounded-card`) berisi menu vertikal berukuran besar + CTA lebar penuh. Tutup dengan `X`, Escape, atau ketuk tautan. Fokus terkunci di dalam panel.
5. Klik menu melakukan smooth scroll lewat Lenis (`lenis.scrollTo("#id", { offset: -96 })`).
6. Ada tautan "Langsung ke konten" (skip link) yang tampil saat mendapat fokus.

### 9.2 Button (`components/ui/Button.tsx`)

| Variant | Light section | Dark section | Pemakaian |
|---|---|---|---|
| `primary` | `bg-forest-900 text-paper-50 hover:bg-forest-700` | `bg-paper-50 text-forest-950 hover:bg-white` | Aksi utama dalam section |
| `accent` | `bg-lime-400 text-forest-950 hover:brightness-95` | sama | CTA "Gabung Pilot" (maksimal 1 per layar) |
| `secondary` | `bg-white border border-border text-fg hover:bg-paper-100` | `bg-white/5 border-border text-fg hover:bg-white/10` | Aksi kedua |
| `ghost` | `text-fg hover:bg-forest-900/5` | `text-fg hover:bg-white/10` | Tautan berbentuk tombol |

- Ukuran: `sm` (h-10 px-4 text-sm), `md` (h-12 px-6), `lg` (h-14 px-8 text-base). Semua `rounded-full font-medium`.
- Tombol berisi ikon memakai `gap-2`, dengan ikon trailing `ArrowRight` yang bergeser saat hover.
- State: `focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-bg`, `disabled:opacity-50 disabled:pointer-events-none`, `active:scale-[0.97]`.
- **Jangan** membuat tombol hijau `leaf-500` dengan teks putih (kontras gagal).

### 9.3 GradeBadge (`components/ui/GradeBadge.tsx`)

- Props: `grade: "A" | "B" | "C" | "D"`, `size?: "sm" | "md" | "lg"`, `withLabel?: boolean`.
- Bentuk: pill dengan huruf grade dalam font mono 600. Jika `withLabel`, tampilkan label kondisi ("Segar prima", dan seterusnya).
- Warna mengikuti §4.3 (fill + teks di atas fill). Ukuran `lg` (lingkaran 56px) dipakai untuk hasil scanner.
- Mapping warna disimpan sekali di `constants/grades.ts` (DRY), lengkap dengan label, kondisi, tujuan, dan ikon.

```ts
export const GRADES = {
  A: { label: "Segar prima", destinations: ["Dapur MBG", "Restoran & kafe", "Ritel", "Katering"], className: "bg-grade-a text-forest-950" },
  B: { label: "Layak, tidak sempurna", destinations: ["Warung & UMKM", "Katering", "Perorangan", "Pengolah", "Pengepul"], className: "bg-grade-b text-forest-950" },
  C: { label: "Bukan untuk manusia", destinations: ["Peternak", "Budidaya maggot", "Pengepul pakan"], className: "bg-grade-c text-forest-950" },
  D: { label: "Busuk atau berjamur", destinations: ["Kompos", "Pupuk cair"], className: "bg-grade-d text-white" },
} as const satisfies Record<Grade, GradeMeta>;
```

### 9.4 Chip / FilterChip (`components/ui/Chip.tsx`)

- `h-9 px-3.5 rounded-full text-sm border border-border`. Saat terpilih: `bg-forest-900 text-paper-50` (terang) atau `bg-lime-400 text-forest-950` (gelap), dengan ikon `Check` 16px.
- Chip grade memakai dot warna grade `size-2` di sebelah kiri.
- Dibangun di atas `ToggleGroup` Radix agar bisa dioperasikan dengan keyboard.

### 9.5 Card

| Variant | Kelas dasar | Pemakaian |
|---|---|---|
| `default` | `rounded-card bg-surface border border-border shadow-soft p-6 md:p-8` | Kartu konten |
| `muted` | `rounded-card bg-surface-muted p-6 md:p-8` | Bento sekunder |
| `glass` | resep glass §6 + `rounded-tile p-4 shadow-float` | Kartu melayang di hero atau peta |
| `ai` | `rounded-card bg-surface border border-lime-400/20 shadow-glow` + radial glow di sudut | Kartu hasil AI di section gelap |

### 9.6 SectionHeader (`components/common/SectionHeader.tsx`)

- Props: `eyebrow`, `index` (contoh `"03"`), `title` (ReactNode, boleh berisi `<em>` aksen), `description`, `align: "left" | "center"`.
- Susunan: eyebrow mono (`03 — CARA KERJA`), lalu `h2`, lalu lead `body-lg text-fg-muted max-w-[60ch]`.
- Default rata kiri. Rata tengah hanya untuk Hero, Kenapa Sekarang, FAQ, dan CTA akhir.

### 9.7 Komponen lain

| Komponen | Lokasi | Catatan |
|---|---|---|
| `SintasMark` | `components/common/` | SVG logo S, 4 segmen + daun sebagai path terpisah. Prop `animated` untuk menggambar segmen berurutan. |
| `SyncDot` | `components/ui/` | Titik + cincin pulse. Prop `tone: "leaf" \| "lime"`. |
| `StatCard` | `components/ui/` | Angka `display-lg` mono + label + sumber (`small text-fg-muted`, berisi tautan). |
| `PhoneMockup` | `components/common/` | Bingkai ponsel SVG/CSS (`rounded-[44px]`, bezel `forest-950`). Isi layar berupa children React (UI tiruan), **bukan** screenshot. |
| `LotCard` | `components/common/` | Kartu lot: foto kecil, komoditas, GradeBadge, berat, harga mono, countdown kesegaran `Timer`, SyncDot. |
| `MapPin` | `components/ui/` | Lingkaran warna grade + border putih 2px + SyncDot opsional. Ukuran 14px, dan 20px saat aktif. |
| `FlowLine` | `components/common/` | Wrapper `motion.path` dengan pathLength terikat scroll + partikel. |
| `SourceNote` | `components/ui/` | Teks sumber kecil dengan ikon `Info`. Wajib menyertai setiap angka statistik. |
| `IllustrationTag` | `components/ui/` | Label kecil "Ilustrasi" di pojok mockup atau simulasi. |
| `Marquee` | `components/ui/` | Daftar segmen pembeli yang bergulir tak berujung, pause saat hover/fokus, dan statis saat reduced-motion. |

---

## 10. Blueprint Halaman

### 10.1 Urutan & ritme tema

| # | Section | `id` | `data-theme` |
|---|---|---|---|
| 1 | Hero: Peta Sinkron Hidup | `beranda` | light |
| 2 | Masalah: Harga Runtuh | `masalah` | **dark** |
| 3 | Cara Kerja: Sinkron dari Lahan ke Dapur | `cara-kerja` | light |
| 4 | Demo AI Grade Scanner | `ai` | **dark** |
| 5 | Penyaluran Berjenjang (S-Flow) | `penyaluran` | light |
| 6 | Peta Stok Interaktif | `peta` | light (peta full-bleed) |
| 7 | Prediksi Harga & Panen atau Tanam | `prediksi` | **dark** |
| 8 | Untuk Siapa: Petani & Pembeli | `untuk-siapa` | light |
| 9 | Kenapa Sekarang | `kenapa-sekarang` | **lime band** (`bg-lime-400 text-forest-950`) |
| 10 | Kepercayaan & Batas AI | `kepercayaan` | light |
| 11 | FAQ | `faq` | light |
| 12 | CTA Gabung Pilot | `gabung` | **dark** |
| — | Footer | — | **dark** |

> **Tidak ada section paket harga.** Jangan menambahkan tabel harga langganan di mana pun.

Setiap section adalah komponen di `components/sections/` (contoh: `HeroSection.tsx`). `app/page.tsx` hanya merangkai section-section tersebut. Section dibuat sebagai Server Component, dan bagian yang interaktif dipecah menjadi komponen client di tingkat daun (sesuai RULES.md §5).

---

### 10.2 Section 1: Hero, "Peta Sinkron Hidup"

**Tujuan:** dalam 5 detik pengunjung paham bahwa SINTAS menghubungkan panen dan pembeli lewat peta + AI, dan tidak ada sayur yang terbuang.

**Layout desktop:** grid 12 kolom, teks di kolom 1–6 dan visual peta di kolom 6–12 (sedikit menumpuk). Tinggi `min-h-[100svh]`, dengan padding atas yang memberi ruang untuk navbar. **Mobile:** teks di atas, peta di bawah dengan tinggi 420px.

**Konten:**
- Eyebrow: `● PROGRAM PILOT · WEB + AI` (dengan SyncDot)
- H1: **"Panen selamat, tanpa *sisa*."** (kata "sisa" memakai warna accent)
- Lead: "SINTAS mempertemukan petani sayur dengan dapur MBG, restoran, katering, hingga peternak dalam satu peta. AI menilai mutu panen dari foto, lalu menyalurkannya ke pembeli yang tepat."
- CTA: `accent` "Gabung Pilot" (→ `#gabung`) + `secondary` "Lihat cara kerja" (→ `#cara-kerja`, ikon `ArrowDown`)
- Baris kepercayaan kecil: 3 item dengan ikon (`ScanSearch` "Grade A–D dari foto", `MapPin` "Stok real-time di peta", `Recycle` "Sisa tersalur berjenjang")

**Visual (`HeroSyncMap`, client):**
- Peta **dot-matrix Pulau Jawa** (SVG statis yang dihasilkan `dotted-map` saat build. Titik `fill-forest-900/15`, radius 1.6).
- 8–12 pin petani (`MapPin` warna grade) dan 6–8 pin pembeli (lingkaran putih berisi ikon segmen 14px).
- **Map Arc** muncul secara acak dari petani ke pembeli dengan warna sesuai grade lot.
- 3 **kartu glass melayang**, yang muncul berurutan lalu mengapung pelan (`y ±6px`, 6s):
  1. `LotCard`: "Tomat · Grade A · 120 kg · Rp7.980/kg · segar 36 jam lagi"
  2. Kartu AI: `ScanLine` "AI menilai foto… **94%** yakin → Grade A"
  3. Kartu sync: `Workflow` "Tersalur ke Dapur MBG Sleman · 3,2 km"
- Parallax kursor ringan (maksimal 8px, hanya di desktop dengan pointer halus).
- `IllustrationTag` di pojok peta.

**Bawah hero:** `Marquee` segmen pembeli (ikon + nama), dipisah dot warna grade.

---

### 10.3 Section 2: Masalah, "Harga Runtuh, Sayur Terbuang" (dark)

**Konten & visual:**
- Header: eyebrow `01 — MASALAH`, H2 "Panen melimpah, harga *runtuh*, lalu sayurnya dibuang."
- **Visual utama "Price Crash":** kartu besar dengan grafik garis SVG yang menukik saat di-scroll. Angka NumberFlow turun dari **Rp35.000 → Rp2.000** /kg. Badge `−94%` (amber). Caption: "Selada di tingkat petani, Magetan, saat panen melimpah." Sumber: Beritajatim.
- Kartu kecil kedua: Buncis **Rp6.000 → Rp500** (−92%), sumber Antara Bengkulu.
- 3 `StatCard`:
  - **23–48 juta ton** pangan hilang & terbuang per tahun (Bappenas)
  - **Rp213–551 T** kerugian ekonomi per tahun (Bappenas)
  - **1–5 pemasok** saja di ±80 dapur MBG Solo Raya, padahal wajib ≥15 (Tirto, BGN)
- **4 akar masalah** dalam grid 2×2 / 4 kolom dengan ikon:
  - `Users` Pembeli terbatas
  - `FileQuestionMark` Mutu sulit dibuktikan
  - `CalendarClock` Panen serempak
  - `Ban` Tak ada jalur alternatif
- Penutup (body-lg, rata tengah): "Bukan kekurangan pangan. Yang hilang adalah **pembeli, bukti mutu, dan jalur alternatif**."
- Catatan kecil: "Angka Bappenas mencakup semua jenis pangan."

---

### 10.4 Section 3: Cara Kerja, "Sinkron dari Lahan ke Dapur" (light)

**Pola:** scroll storytelling dengan **PhoneMockup sticky** (kiri, `sticky top-28`) dan 6 langkah di kanan, masing-masing setinggi ±70vh. Di mobile tidak ada sticky: setiap langkah berisi mockup kecilnya sendiri.

| # | Langkah | Ikon | Layar ponsel (UI tiruan) |
|---|---|---|---|
| 1 | Petani memotret panen | `Camera` | Kamera terpandu dengan bingkai crosshair, input jumlah & waktu panen |
| 2 | AI menilai grade | `ScanSearch` | Animasi AI Scan, lalu GradeBadge A + "sisa segar 36 jam" |
| 3 | Mesin harga menghitung | `Tag` | Harga rekomendasi + batas bawah + chip "Panen sekarang" |
| 4 | Stok tampil di peta | `MapPin` | Peta mini dengan pin + LotCard |
| 5 | Pembeli menerima / menolak | `CircleCheck` | Tombol Terima/Tolak + unggah foto bukti ("data ini melatih AI") |
| 6 | Sisa turun tingkat otomatis | `Recycle` | Grade Decay A→B, ditawarkan ke "Warung Bu Sri" |

- **Progress indikator:** di sisi kiri daftar langkah ada garis vertikal yang terisi mengikuti scroll, dengan **gradien 4 warna grade** (gema S-Flow). Nomor langkah memakai font mono dalam lingkaran.
- Layar ponsel berganti dengan crossfade + `y` 12px berdasarkan langkah aktif (`useScroll` / `useInView` per langkah).

---

### 10.5 Section 4: Demo AI Grade Scanner (dark), ⭐ section unggulan

**Tujuan:** pengunjung *merasakan* AI bekerja. Seluruh demo berjalan di sisi klien dengan data simulasi.

**Layout:** kiri (5 kolom) berisi penjelasan + kontrol, kanan (7 kolom) berisi "AI viewport".

**Kontrol:**
1. **Pilih sampel:** 4 thumbnail (Tomat, Selada, Sawi, Cabai) dalam `ToggleGroup`.
2. **Slider "Jam sejak panen"**: 0–96 jam (Radix Slider), dengan nilai berfont mono.
3. Tombol `primary` "Nilai ulang" (ikon `ScanLine`).

**AI viewport (Card `ai`):**
- Foto sampel (`next/image`), berganti antar varian A/B/C/D sesuai nilai slider.
- Overlay: grid tipis `lime-400/10`, tick koordinat di tepi (mono 10px), animasi **AI Scan**, dan bounding box berlabel ("daun layu 12%", "warna merata", "bercak 0%").
- **Panel hasil** di sebelah kanan atau bawah foto:
  - `GradeBadge size="lg"`
  - Tingkat keyakinan `94%` (NumberFlow)
  - Perkiraan sisa segar: "± 36 jam" (`Timer`)
  - Kalimat waktu: **"Grade A sampai pukul 14.00, lalu otomatis B"**
  - Tujuan penyaluran: chip-chip dari `GRADES[grade].destinations`
  - Alasan (3 butir pendek dengan ikon `Check` / `AlertTriangle`)
- Aturan simulasi: grade turun berdasarkan ambang jam per komoditas (simpan di `constants/scanner.ts`). Jika keyakinan < 70%, tampilkan "AI ragu → turun satu tingkat" (aturan keselamatan produk).

**Wajib ada:** `SourceNote`/disclaimer di bawah viewport: "Grade AI adalah indikasi mutu, bukan jaminan keamanan pangan. Pembeli tetap memeriksa saat menerima." + `IllustrationTag`.

---

### 10.6 Section 5: Penyaluran Berjenjang, "S-Flow" (light), ⭐ motif utama

**Konsep:** **huruf S raksasa dari logo** digambar ulang sebagai jalur tebal (stroke 28–40px) dengan 4 segmen warna A→D, dibaca dari atas ke bawah. Sayur "mengalir" turun di sepanjang S. Dari setiap segmen keluar cabang ke kartu tujuan.

**Layout desktop:** S-Flow di tengah (`sticky` selama section berlangsung, tinggi section ±250vh). Kartu tujuan muncul bergantian di kiri dan kanan mengikuti segmen yang sedang aktif. **Mobile:** S diganti jalur vertikal lurus 4 warna, dengan kartu ditumpuk di sebelah kanannya.

**Konten per segmen (kartu `GradeTierCard`):**
- GradeBadge + kondisi + daftar segmen pembeli (ikon §7) + satu kalimat nilai:
  - A: "Masuk dapur MBG, restoran, dan ritel dengan harga terbaik."
  - B: "Tidak sempurna, tetap layak. Jadi bahan katering, warung, dan pengolah."
  - C: "Tidak untuk manusia, tetap bernilai sebagai pakan dan maggot."
  - D: "Akhir yang berguna: kompos dan pupuk cair, kembali ke lahan."
- Penutup: setelah segmen D, jalur kembali ke ikon `Sprout` (siklus kembali ke lahan), disertai headline kecil **"Tidak ada jalan buntu."**

**Interaksi:**
- **Flow Line** terikat scroll: segmen S tergambar sesuai progres scroll, dan partikel (lingkaran kecil berwarna grade) bergerak terus di sepanjang jalur yang sudah tergambar.
- Hover/fokus pada kartu grade membuat segmen lain memudar menjadi `opacity 0.25` dan cabangnya menebal.
- **Toggle "Simulasikan 48 jam"** (Switch): sebuah `LotCard` "Selada 80 kg" berjalan melewati waktu. Badge-nya mengalami Grade Decay dan kartu lot berpindah ke tujuan berikutnya, dengan log mono kecil: `08.00 Grade A → Dapur MBG (menolak 20 kg) · 14.00 Grade B → Warung Bu Sri · ...`. Ini wujud konkret dari "penyaluran otomatis per grade".

---

### 10.7 Section 6: Peta Stok Interaktif (light, full-bleed)

**Tujuan:** menunjukkan pengalaman pembeli yang map-based.

**Implementasi:** `maplibre-gl` + `react-map-gl/maplibre`. Tile memakai **OpenFreeMap** style `positron` (gratis, tanpa API key). Warna basemap diredam: air `#DCE8E2`, daratan `paper-50`. Peta dimuat dengan **`next/dynamic` + `ssr: false` di dalam komponen client** dan baru dimuat saat section mendekati viewport. Sebelum siap, tampilkan placeholder dot-map statis.

**Layout:** peta full-bleed setinggi `h-[80svh]` dengan `rounded-card` dan margin samping di desktop. Di atasnya:
- **Panel filter glass** (kiri atas, desktop) / **bottom sheet** (mobile):
  - Komoditas (chip: Tomat, Selada, Sawi, Cabai, Wortel, Kubis)
  - Grade (chip A–D dengan dot warna)
  - Jarak (slider 1–50 km)
  - Harga (slider rentang)
- **Toggle "Saya adalah…"** (segmen pembeli): Dapur MBG, Restoran, Katering, UMKM, Perorangan, Pengepul, Peternak. Pilihan ini otomatis menyaring grade yang relevan (contoh: Peternak → C), memperlihatkan bahwa penyaluran ditentukan grade.
- **Pin lot** berwarna grade. Klik membuka **popup LotCard** (foto, harga mono, countdown kesegaran, jarak, tombol "Pesan" non-fungsional bertanda "Segera hadir").
- Penghitung live di pojok: `● 128 lot tersedia` (SyncDot).
- `IllustrationTag`: "Data simulasi". Data dummy disimpan di `constants/lots.ts` dengan tipe di `types/`.

**Aksesibilitas:** sediakan daftar lot alternatif (tab "Peta | Daftar") agar konten bisa diakses tanpa peta.

---

### 10.8 Section 7: Prediksi Harga & "Panen atau Tanam?" (dark)

**Layout:** bento 12 kolom.

1. **Kartu Prediksi Harga (8 kolom):** grafik garis **custom SVG + Motion** (tanpa library grafik). Isinya 4 garis harga per grade (warna grade) untuk 30 hari terakhir dan pita prediksi 14 hari ke depan (area `lime-400/10` + garis putus-putus). Ada tab komoditas dan tooltip mengikuti kursor (mono). Label "Prediksi AI · ilustrasi".
2. **Kartu "Panen atau tidak?" (4 kolom):** kalkulator mini. Pilih komoditas + grade + jumlah kg, lalu muncul **rincian waterfall** dalam bar horizontal:
   `Harga pembeli Rp7.980 − Estimasi antar Rp1.200 − Biaya platform Rp399 − Cadangan risiko Rp319 = Harga petani Rp6.060`
   Garis **batas bawah** (biaya panen + kemas + antar + margin) digambar putus-putus.
   - Jika harga ≥ batas bawah: badge **"Panen sekarang"** (`leaf`, `CircleCheck`).
   - Jika di bawah: badge **"Tunda panen"** (`amber`, `Clock`) + saran "pra-jual atau alihkan ke pembeli lain".
3. **Kartu Rekomendasi Tanam (6 kolom):** kalender musim horizontal 12 bulan dengan bar permintaan, ditambah rekomendasi "Tanam sawi minggu ini, panen saat permintaan katering naik" (`Sprout`).
4. **Kartu Formula (6 kolom):** formula harga ditampilkan dengan font mono, rapi dan transparan:
   `Harga pembeli = acuan × pengali grade × diskon kesegaran × faktor pasokan`
   Catatan: "Rekomendasi, bukan penetapan harga."

---

### 10.9 Section 8: Untuk Siapa (light)

- **Segmented control** besar di tengah: `Tractor` **Petani** | `Store` **Pembeli** (Tabs Radix, pill aktif memakai `layoutId`).
- Konten berganti dengan crossfade. Layout 2 kolom: foto (kiri, `rounded-card`) + daftar manfaat (kanan, 4 butir dengan ikon).
  - **Petani:** Gratis dengan kuota penilaian AI · Pasar lebih luas dari 1–2 pengepul · Harga adil dengan rincian & batas bawah · Saran "panen atau tidak?" sebelum rugi.
  - **Pembeli:** Mutu jelas lewat grade A–D & sisa umur · Banyak pemasok dalam satu peta (memenuhi syarat ≥15 pemasok MBG) · Rincian harga transparan · Bukti terima/tolak berfoto untuk pelaporan.
- Di bawahnya, grid kecil segmen pembeli (ikon + nama + grade yang biasa dibeli dalam bentuk dot).

---

### 10.10 Section 9: Kenapa Sekarang (lime band)

- Latar `bg-lime-400`, teks `forest-950`. Ini satu-satunya section lime dan menjadi jeda visual yang energik.
- Rata tengah. H2: "Permintaannya sudah ada. Yang belum ada: *jalurnya*."
- 3–4 angka besar `display-lg` mono (NumberFlow):
  - **27.486** dapur MBG beroperasi (BGN, 30 Sep 2026)
  - **≥15** pemasok wajib per dapur (BGN)
  - **USD 1,15 M** pasar agritech Indonesia 2025 (Ken Research)
  - **18,7%** CAGR 2026–2031 (Ken Research)
- `SourceNote` dengan warna `forest-900/70`.

---

### 10.11 Section 10: Kepercayaan & Batas AI (light)

- H2: "AI yang jujur soal batasnya."
- Grid 3×2 kartu `muted`:
  - `Camera` Foto dari kamera aplikasi, bukan galeri
  - `MapPin` Bertanda waktu & lokasi
  - `FingerprintPattern` Deteksi foto duplikat
  - `BadgeCheck` Reputasi petani dari riwayat terima/tolak
  - `CornerRightDown` AI ragu → turun satu tingkat
  - `ShieldCheck` Dapur MBG hanya menerima grade A panen baru
- Banner disclaimer (Card dengan border `amber-500/40`, ikon `Info`): "Grade AI adalah indikasi mutu, bukan jaminan keamanan pangan. Foto tidak bisa mendeteksi kuman atau racun. Pembeli tetap memeriksa saat menerima."
- Baris "Yang tidak kami lakukan": `Truck` tanpa logistik sendiri · `Wallet` tidak memegang uang · `Cpu` tanpa perangkat keras. Ditulis dengan nada tenang dan transparan.

---

### 10.12 Section 11: FAQ (light)

- Rata tengah, `max-w-3xl`. Memakai Accordion Radix (satu terbuka dalam satu waktu). Ikon `Plus` berputar 45° saat terbuka.
- Pertanyaan minimal:
  1. Apakah petani perlu membayar?
  2. Seberapa akurat grade dari AI?
  3. Bagaimana jika pembeli menolak sayur saya?
  4. Siapa yang mengurus pengiriman?
  5. Bagaimana harga ditentukan?
  6. Apa itu penyaluran berjenjang?
  7. Bisakah dipakai lewat WhatsApp?
  8. Kapan SINTAS bisa digunakan?
- Jawaban mengikuti data di §1. Pertanyaan tentang harga langganan **tidak** dimasukkan.

---

### 10.13 Section 12: CTA "Gabung Pilot" (dark)

- Card besar `rounded-[40px] bg-forest-900` di dalam section `forest-950`, dengan radial glow lime di pojok dan **SintasMark raksasa** (opacity 6%) sebagai watermark yang segmennya tergambar satu per satu saat masuk viewport.
- H2 `display-lg`: "Selamatkan panen *berikutnya*."
- **Form waitlist** (client, Server Action untuk submit):
  - Toggle peran: Petani / Pembeli
  - Jika Pembeli: select jenis usaha (Dapur MBG, Restoran, Katering, UMKM, Perorangan, Pengepul, Peternak, Lainnya)
  - Nama, nomor WhatsApp, kota/kabupaten
  - Tombol `accent` "Daftar program pilot"
- Validasi inline. Pesan sukses lewat `sonner`: "Terima kasih! Tim kami akan menghubungi lewat WhatsApp."
- Input: `h-12 rounded-tile bg-white/5 border-border text-fg placeholder:text-fg-muted`, fokus memakai `ring-lime-400`.

---

### 10.14 Footer (dark)

- Latar `forest-950`, tersambung dengan section CTA tanpa garis tegas (bisa memakai pemisah garis tipis `border-border`).
- **Baris atas (4 kolom):**
  1. Logo SINTAS (versi untuk latar gelap) + tagline "Panen selamat, tanpa sisa." + deskripsi singkat 1 kalimat.
  2. Navigasi: tautan ke section.
  3. Fitur: AI Grade, Peta Stok, Prediksi Harga, Penyaluran Berjenjang.
  4. Kontak: `AtSign` @nirsisa.id (ikon brand sudah dihapus dari Lucide v1), email (placeholder).
- **Blok Nirsisa (wajib):** logo Nirsisa putih + teks: "SINTAS adalah produk dari **Nirsisa**, venture teknologi pangan untuk menghilangkan susut panen sayur. *Nir* = tanpa, *sisa*: tanpa sisa." Tautan ke Instagram @nirsisa.id.
- **Baris bawah:** `© 2026 Nirsisa. Hak cipta dilindungi.` · atribusi foto (contoh: "Foto: Doyanmoto / Wikimedia Commons, CC BY-SA 4.0") · "Grade AI adalah indikasi mutu."
- Ornamen: wordmark "SINTAS" sangat besar (`text-[18vw]`, `text-white/[0.03]`, display 800) terpotong di dasar footer.

---

## 11. Aset Visual & Imagery

### 11.1 Gaya foto

- Natural, cahaya pagi/siang, warna sedikit hangat-hijau, fokus pada **sayur, tangan petani, dan lahan Indonesia** (dataran tinggi, terasering, kebun kubis/selada).
- Grading konsisten: highlight agak krem, shadow kehijauan, saturasi sedang.
- **Hindari:** foto stok korporat (orang berjas, "tangan memegang tablet" dengan hologram), robot, otak digital, sirkuit, dan semua visual "AI" klise.
- Selalu memakai `next/image` dengan `alt` deskriptif berbahasa Indonesia. Foto hero memakai `preload` atau `fetchPriority="high"` (catatan: prop `priority` **sudah deprecated** di Next 16). Gambar lain lazy.

### 11.2 Sumber aset

| Aset | Sumber | Lokasi |
|---|---|---|
| Foto lahan & petani | `../instagram/assets/photos/*`, `../img/upload/*` (pakai ulang) | `public/images/` (konversi ke `.webp`, lebar maks 2000px) |
| Foto sampel scanner (4 komoditas × 4 grade = 16) | **Generate AI** (lihat prompt §11.3) | `public/images/scanner/{komoditas}-{a\|b\|c\|d}.webp` |
| Peta dot Jawa | Dihasilkan `dotted-map` saat build (Server Component) atau skrip sekali jalan | inline SVG / `public/maps/java-dots.svg` |
| S-Flow path, SintasMark | SVG tulis tangan, diturunkan dari `sintas-ikon.png` | komponen React |
| Grain texture | SVG `feTurbulence` | `public/textures/grain.svg` |
| OG image | `app/opengraph-image.tsx` (ImageResponse) dengan latar forest + logo + tagline | — |

### 11.3 Prompt generate gambar (konsisten)

Gaya dasar semua foto sampel scanner:
> "Studio product photo of [komoditas] on a neutral warm off-white surface (#F6F5EF), soft diffused top light, slight shadow, square 1:1, sharp focus, realistic, no text, no props."

Kondisi per grade:
- **A:** "perfectly fresh, vibrant, firm, glossy, no blemishes"
- **B:** "edible but imperfect: slightly irregular shape, minor surface blemishes, a little wilted"
- **C:** "clearly wilted and bruised, discolored patches, not suitable for human consumption"
- **D:** "rotting with visible mold, collapsed, decomposing"

Foto hero opsional:
> "Editorial photo, Indonesian highland vegetable farm at golden morning light, farmer's hands holding a crate of fresh lettuce and tomatoes, shallow depth of field, warm green color grading, natural, 3:2."

---

## 12. Copywriting & Tone

- **Bahasa:** Bahasa Indonesia baku tapi hangat dan lugas. Istilah teknis secukupnya (pakai "grade", "lot", "AI", tapi hindari jargon lain).
- **Kalimat:** pendek, aktif, konkret. Utamakan angka dan contoh nyata (Rp, kg, jam) daripada kata sifat.
- **Dilarang:**
  - Kata hiperbolik: "revolusioner", "terdepan", "canggih", "solusi terbaik", "game-changer".
  - Frasa generik: "Selamat datang di…", "Kami percaya…", "Masa depan pertanian".
  - Klaim tanpa sumber, dan klaim keamanan pangan.
- **Pola judul section:** pernyataan tegas + aksen satu kata. Contoh:
  - "Satu foto. Satu *grade*. Satu tujuan."
  - "Tidak sempurna bukan berarti *terbuang*."
  - "Tahu harganya *sebelum* memanen."
- **CTA:** kata kerja + manfaat. Pakai "Gabung Pilot", "Daftar program pilot", "Lihat cara kerja", "Coba nilai sayur". Hindari "Klik di sini" dan "Submit".
- **Sumber statistik** (format `SourceNote`: "Sumber: Nama, tanggal"):

| Klaim | Sumber |
|---|---|
| Selada Rp35.000 → Rp2.000/kg, Magetan | Beritajatim, 25 Des 2025 |
| Buncis Rp6.000 → Rp500/kg | Antara Bengkulu, 11 Apr 2025 |
| 23–48 juta ton terbuang/th; kerugian Rp213–551 T | Bappenas |
| Dapur MBG wajib ≥15 pemasok | BGN, 25 Feb 2026 |
| ±80 dapur Solo Raya hanya 1–5 pemasok | Tirto, 8 Mar 2026 |
| 27.486 dapur MBG beroperasi | BGN, 30 Sep 2026 |
| Pasar agritech USD 1,15 M; CAGR 18,7% | Ken Research, 2025 |

---

## 13. Aksesibilitas

- Kontras mengikuti tabel §4.4. Verifikasi ulang setiap pasangan warna baru (teks ≥ 4.5:1, teks besar/ikon ≥ 3:1).
- Semua elemen interaktif bisa dijangkau keyboard, dengan fokus terlihat: `focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-bg`. Jangan pernah memakai `outline-none` tanpa pengganti.
- Target sentuh minimal 44×44px di mobile.
- **Warna bukan satu-satunya penanda:** grade selalu menampilkan huruf (A/B/C/D), tidak hanya warna. Pin peta memiliki label huruf saat diperbesar atau di tooltip.
- Elemen dekoratif (dot map, partikel, watermark, grain) memakai `aria-hidden="true"`.
- Hasil scanner dan penghitung lot diumumkan lewat `aria-live="polite"`.
- Marquee dan animasi otomatis bisa dihentikan (pause saat hover/fokus) dan berhenti saat reduced-motion.
- Hierarki heading berurutan: `h1` (hero), lalu `h2` per section, lalu `h3` di kartu.

## 14. Performa

- Target: **LCP < 2.5s**, **CLS < 0.05**, **INP < 200ms** di mobile 4G.
- Hero harus ringan: headline berupa teks SSR. Dot map adalah SVG statis, dan animasi busur dimulai setelah hydrate.
- **Lazy-load:** MapLibre (section 6), scanner image set, dan grafik prediksi. Pakai `next/dynamic` di dalam komponen client dan picu dengan `useInView`.
- Batasi elemen `backdrop-blur` yang tampil bersamaan (maksimal 4 di layar) karena berat di perangkat low-end.
- Partikel S-Flow maksimal 24 sekaligus. Map arc maksimal 4.
- Gambar memakai `.webp`/`.avif` dengan `sizes` yang tepat. Tidak boleh ada gambar > 300KB setelah optimasi kecuali foto hero.

---

## 15. Stack & Instalasi

```bash
bun add lucide-react motion lenis @number-flow/react sonner \
  maplibre-gl react-map-gl dotted-map \
  clsx tailwind-merge class-variance-authority
bunx shadcn@latest init   # lalu tambah: accordion tabs slider toggle-group switch tooltip sheet select
```

- shadcn/ui di-init untuk Tailwind v4. Komponen yang dihasilkan masuk ke `components/ui/`, lalu **di-restyle** dengan token di dokumen ini (hapus warna default shadcn yang tidak sesuai).
- **Tidak boleh** memakai library grafik (Recharts, Chart.js) atau library animasi tambahan tanpa memperbarui dokumen ini.
- Sebelum memakai API Next.js, baca panduan di `node_modules/next/dist/docs/` (sesuai `AGENTS.md`), terutama `next/font`, `next/image`, `next/dynamic`, dan Metadata.

## 16. Pemetaan File (mengikuti `RULES.md`)

```text
app/
├── layout.tsx              # Font (Bricolage, Geist, Geist Mono), lang="id", metadata SINTAS, LenisProvider
├── page.tsx                # Merangkai section 1–12 + Footer
├── opengraph-image.tsx
└── globals.css             # Token §4.5
components/
├── ui/                     # Button, GradeBadge, Chip, Card, SyncDot, MapPin, StatCard, SourceNote, IllustrationTag, Marquee, + shadcn primitives
├── common/                 # NavbarPill, Footer, SectionHeader, SintasMark, PhoneMockup, LotCard, FlowLine, LenisProvider
├── forms/                  # WaitlistForm + field wrappers
├── feedback/               # Toaster (sonner), Skeleton peta
└── sections/               # HeroSection, ProblemSection, HowItWorksSection, AiScannerSection,
                            # CascadeSection, StockMapSection, PricingForecastSection*,
                            # AudienceSection, WhyNowSection, TrustSection, FaqSection, CtaSection
actions/waitlist.ts         # Server Action submit waitlist
hooks/                      # useSectionTheme, useScrollSpy, useInViewOnce
lib/                        # utils.ts (cn), motion.ts (token animasi), format.ts (formatRupiah, formatJam)
constants/                  # grades.ts, segments.ts, lots.ts, scanner.ts, prices.ts, nav.ts, faq.ts, sources.ts
types/                      # landing.ts (Grade, Lot, Segment, ScannerSample, PricePoint)
public/brand · public/images · public/textures · public/maps
```

`*PricingForecastSection` adalah section **prediksi harga** (fitur AI), **bukan** paket harga langganan.

> `components/sections/` adalah ekstensi dari struktur di RULES.md, khusus untuk komponen section landing page. Semua teks konten, data dummy, dan daftar ditaruh di `constants/` dan tidak di-hardcode dalam JSX bila dipakai lebih dari sekali.

---

## 17. Checklist Sebelum Menyelesaikan UI

**Wajib ✅**
- [ ] Hanya memakai token warna, font, radius, dan shadow dari dokumen ini.
- [ ] Setiap section punya `id` dan `data-theme` sesuai §10.1, dan navbar berganti tema dengan benar.
- [ ] Navbar pill mengambang: scroll-spy, menyusut, dan panel mobile berfungsi.
- [ ] Warna grade konsisten (A hijau, B lime, C amber, D cokelat) dan selalu disertai huruf.
- [ ] Ikon hanya dari `lucide-react`, sesuai pemetaan §7.
- [ ] Setiap angka statistik punya `SourceNote`, dan setiap mockup/simulasi punya `IllustrationTag`.
- [ ] Disclaimer "Grade AI adalah indikasi mutu…" tampil di section AI, Kepercayaan, dan FAQ.
- [ ] Nirsisa tampil di footer (logo + penjelasan + @nirsisa.id).
- [ ] `prefers-reduced-motion` dihormati dan animasi berulang di-pause di luar viewport.
- [ ] Keyboard & fokus terlihat, kontras lolos §4.4, target sentuh ≥ 44px.
- [ ] Diuji responsif pada 375, 768, 1024, 1440px.
- [ ] Peta dan grafik di-lazy-load, dan `next/image` dipakai untuk semua gambar.

**Dilarang ❌**
- [ ] Section atau tabel **paket harga langganan**.
- [ ] Tombol `leaf-500` dengan teks putih, teks lime/amber di latar terang.
- [ ] Gradien ungu/biru generik, glassmorphism di semua kartu, emoji sebagai ikon.
- [ ] Visual AI klise (robot, otak, sirkuit), foto stok korporat.
- [ ] Menggambarkan SINTAS mengurus logistik atau memegang uang.
- [ ] Klaim "AI menjamin aman" atau angka tanpa sumber.
- [ ] Library animasi atau grafik di luar §8.1 / §15.
