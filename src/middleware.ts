import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'] as const;
const defaultLocale = 'ar';

function getLocale(request: NextRequest): string {
  // 1. Check cookie first for user preference
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    return cookieLocale;
  }

  // 2. Parse Accept-Language header manually
  const acceptLanguageHeader = request.headers.get('accept-language') ?? '';
  const languages = acceptLanguageHeader
    .split(',')
    .map(lang => {
      const [code, quality] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(),
        quality: quality ? parseFloat(quality) : 1
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // 3. Find first matching locale
  for (const lang of languages) {
    if (locales.includes(lang.code as typeof locales[number])) {
      return lang.code;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If locale exists in URL, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get best matching locale
  const locale = getLocale(request);

  // Redirect to localized URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);

  // Set cookie for future visits
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

export const config = {
  matcher: [
    // Skip internal paths
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|.*\\..*).*)',
  ],
};
