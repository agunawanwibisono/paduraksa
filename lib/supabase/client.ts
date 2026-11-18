import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client untuk dipakai di Client Components ("use client").
 * Hanya menggunakan NEXT_PUBLIC_SUPABASE_ANON_KEY — key ini memang
 * didesain aman untuk browser karena akses datanya dibatasi oleh RLS
 * (lihat supabase/schema.sql). JANGAN PERNAH memasukkan service_role
 * key di sini atau di variabel NEXT_PUBLIC_*.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
