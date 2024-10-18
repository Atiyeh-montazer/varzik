
"use client"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import './globals.css';
import { Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from '../providers/auth_provider';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }) {
  return (
    <CacheProvider>
      <html lang="en">
        <body className={["h-screen overflow-hidden min-h-screen max-w-[430px] min-w-[350px] mx-auto flex flex-col justify-between", roboto.variable]}>
          <AppRouterCacheProvider>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                <Header />
                <main className="h-full bg-[url(../../public/images/45562.png)] bg-no-repeat bg-right-top bg-cover overflow-y-auto scroll-hidden">
                  {/* Overlay */}
                  <div className="bg-gray-500 bg-cover bg-opacity-75 h-full overflow-y-auto scroll-hidden px-5">
                    <div className="h-full">
                      {children}
                    </div>
                  </div>
                </main>
                <Footer />
              </ThemeProvider>
            </AuthProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </CacheProvider>
  );
}
