import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Gerbang login: semua halaman wajib login. Pengguna yang belum masuk
 * selalu diarahkan ke /login; yang sudah masuk tidak perlu ke /login lagi.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === '/login';

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({ request });
  let loggedIn = false;

  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        get: (name: string) => request.cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove: (name: string, options: CookieOptions) => {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    });
    const { data } = await supabase.auth.getUser();
    loggedIn = Boolean(data.user);
  }

  if (!loggedIn && !isLogin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (loggedIn && isLogin) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return response;
}

export const config = {
  // Lewati aset statis (_next, gambar/audio/video, favicon, dll.)
  matcher: ['/((?!_next/static|_next/image|brand/|.*\\.[a-zA-Z0-9]+$).*)'],
};
