# Engineering Rules & Guidelines for AI Assistant

> **Directive**: Baca aturan ini **satu kali** pada awal sesi dan ingat dalam memori kerja. Jangan membaca file ini berulang-ulang tanpa alasan atau meminta pengguna mengulang instruksi yang sudah tercakup di sini.

---

## 1. Project Structure (Component-Based & DRY)

Proyek ini mengadopsi arsitektur murni **Component-Based** (TIDAK menggunakan folder `features/`) untuk mendukung prinsip **DRY (Don't Repeat Yourself)** secara maksimal di seluruh halaman aplikasi:

```text
sintas/
├── md/                         # Dokumentasi & aturan proyek
│   └── RULES.md                # Aturan baku AI & standar engineering tim
├── app/                        # Next.js App Router (Routing, Layout, Page, Route Handlers)
│   ├── (auth)/                 # Route group untuk pengelompokan halaman tanpa mengubah URL
│   ├── api/                    # Route Handlers untuk REST API endpoints (jika dibutuhkan)
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Halaman utama
│   ├── loading.tsx             # Loading UI (Suspense)
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # Halaman 404
│   └── globals.css             # Konfigurasi Tailwind CSS v4 & theme
├── components/                 # Sentral komponen UI reusable (DRY)
│   ├── ui/                     # Primitives / Atomik (Button, Input, Modal, Card, Badge, Tooltip)
│   ├── common/                 # Komponen gabungan yang dipakai berulang (Navbar, Sidebar, Footer, PageHeader, EmptyState)
│   ├── forms/                  # Reusable form fields, input wrappers, validasi visual
│   └── feedback/               # Skeletons, Spinners, Toast, AlertBanner
├── actions/                    # Server Actions terpusat untuk mutasi data dan operasi server
├── hooks/                      # Reusable custom React hooks (useDebounce, useModal, useMediaQuery, dll)
├── lib/                        # Utilitas & helper murni (cn helper, formatters, HTTP client)
├── types/                      # TypeScript definitions & generic helpers (common.ts, models.ts)
└── constants/                  # Nilai konstan, enums, konfigurasi rute navigasi
```

---

## 2. File Header & Commenting Convention

Terapkan standar komentar berikut dengan disiplin tinggi:

### A. File Header (Wajib)
Setiap file TypeScript/TSX wajib diawali dengan komentar singkat, padat, dan *to-the-point* sebelum kode dimulai, agar anggota tim langsung memahami peran file tersebut:
```ts
/**
 * @file [Nama/Fungsi File] - Penjelasan to-the-point mengenai tugas utama file ini.
 */
```

### B. Code Comments (Selektif & Bebas Noise)
- **DILARANG** memberi komentar pada setiap baris kode, variabel, atau fungsi yang namanya sudah jelas (*self-explanatory*).
- **HANYA** berikan komentar jika:
  1. Fungsi atau variabel memiliki tujuan atau efek samping yang tidak intuitif dari namanya.
  2. Terdapat algoritma non-trivial, kalkulasi khusus, penanganan edge-case, atau workaround teknis.
- Tulis komentar dengan ringkas dan langsung ke inti permasalahan (*high-signal comments*).

---

## 3. Strict TypeScript Standards

- **Zero `any` Policy**: Dilarang keras menggunakan tipe `any`. Jika tipe belum diketahui secara pasti, gunakan `unknown` dan lakukan *type narrowing* menggunakan *Type Guards*.
- **Type Generics**: Wajib memanfaatkan Generic Types (`<T>`, `<TData>`, `<TParams extends Record<string, unknown>>`) untuk:
  - Utility functions dan API wrapper (`ApiResponse<T>`, `fetcher<T>(url: string)`).
  - Custom hooks yang mengelola data dinamis (`useFetch<T>`, `usePagination<T>`).
  - Komponen reusable seperti DataTable, Dropdown, atau List renderer (`interface TableProps<T> { items: T[]; ... }`).
- **Type Safety**:
  - Manfaatkan *Discriminated Unions* untuk memodelkan state (misal: `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: Error }`).
  - Gunakan TypeScript utility types bawaan: `Readonly`, `Partial`, `Pick`, `Omit`, `Record`.
  - Pisahkan contract type (API DTO, domain entities, component props) secara rapi di direktori `types/`.

---

## 4. DRY Principle & Maintainability

- **Don't Repeat Yourself**: Hindari duplikasi logika bisnis, kalkulasi tanggal/mata uang, skema validasi, atau potongan markup UI yang identik.
- **Single Responsibility Principle (SRP)**: Setiap fungsi, hook, atau komponen hanya boleh memiliki satu alasan untuk berubah.
- **Ekstraksi Kode**:
  - UI markup berulang $\rightarrow$ jadikan komponen di `components/ui/` atau `components/common/`.
  - State atau efek berulang $\rightarrow$ jadikan custom hook di `hooks/`.
  - Kalkulasi murni atau format data $\rightarrow$ jadikan helper di `lib/`.
- Struktur kode harus mudah dipelihara (*maintainable*), mudah di-test, dan memiliki *loose coupling*.

---

## 5. Next.js Best Practices (App Router)

- **Server Components by Default**: Komponen di dalam `app/` dan `components/` harus menjadi React Server Components (RSC) secara default.
- **Minimal `'use client'`**: Gunakan direktif `'use client'` hanya pada level daun (*leaf components*) yang mutlak membutuhkan interaktivitas (event listener `onClick`, `onChange`, atau React state/lifecycle hooks).
- **Server Actions**: Gunakan Server Actions (`'use server'`) untuk pengolahan form dan mutasi data backend, lengkap dengan validasi skema input dan penanganan error terstruktur.
- **Streaming & Suspense**: Manfaatkan `loading.tsx` atau `<Suspense fallback={<Skeleton />}>` untuk komponen asinkron.
- **Optimasi Bawaan**:
  - Gunakan `next/image` untuk seluruh gambar eksternal/internal guna mencegah layout shift dan mengoptimalkan ukuran aset.
  - Gunakan `next/font` untuk pemuatan font yang optimal.
  - Terapkan Metadata API (`export const metadata: Metadata = { ... }` atau `generateMetadata`) pada setiap rute.

---

## 6. Styling with Tailwind CSS (v4)

- **Utility-First**: Tulis styling langsung menggunakan class utilitas Tailwind CSS.
- **Class Merging dengan `cn()`**: Selalu gunakan helper `cn()` (`clsx` + `tailwind-merge`) saat menggabungkan class dinamis atau opsional pada komponen:
  ```ts
  import { cn } from "@/lib/utils";
  
  export function Card({ className, ...props }: CardProps) {
    return <div className={cn("rounded-xl border bg-card p-6 shadow-sm", className)} {...props} />;
  }
  ```
- **Hindari Inline Styles**: Jangan gunakan `style={{ ... }}` kecuali untuk nilai yang nilainya dihitung secara dinamis pada saat runtime (misal: koordinat transform/animasi dinamis).
- **Mobile-First Responsive**: Terapkan breakpoint responsif standar (`sm:`, `md:`, `lg:`, `xl:`).
