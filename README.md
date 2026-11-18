# Gelar Karya Si Lele Bahagia — Media Belajar Anak PAUD Lamongan

SILELE: Sarana Inovasi Literasi, Eksplorasi, dan Lingkungan Edukasi Bahagia.

## Status
Tahap 1: arsitektur, setup project, layout/navigasi, dan Home page.
Menyusul: Wisata, Makanan, Budaya, Game Kelompokkan Warna, Game Matching, integrasi Supabase penuh.

## Instalasi

```bash
# 1. Install dependency
npm install

# 2. Salin environment variable
cp .env.local.example .env.local
# lalu isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
# dari Supabase Project Settings > API

# 3. (Opsional, saat Supabase sudah dipakai) jalankan schema
# Buka Supabase SQL editor lalu jalankan isi supabase/schema.sql

# 4. Jalankan development server
npm run dev
```

Buka http://localhost:3000

## Catatan Data
Konten wisata, makanan, dan budaya ada di `/data/*.ts`.

## Struktur
Lihat penjelasan arsitektur lengkap di pesan pengembang / dokumentasi proyek.
