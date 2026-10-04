import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { PersonJsonLd } from '@/components/PersonJsonLd';
import { site } from '@/lib/site';

const sans = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
};

// Runs synchronously before first paint so a dark-mode visitor never sees a light flash.
// Must stay in sync with getInitialTheme() in components/ThemeProvider.tsx:
// same storage key ('portfolio-theme') and same matchMedia query.
const themeInitScript = `(function(){try{var t=window.localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`;

// Framer Motion serializes `initial={{ opacity: 0 }}` into the static HTML; without JS
// those blocks would stay invisible forever, so force them visible when scripts are off.
const noScriptRevealCss = '[style*="opacity:0"]{opacity:1!important;transform:none!important}';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${sans.variable} font-sans`}>
        <noscript>
          <style>{noScriptRevealCss}</style>
        </noscript>
        <ThemeProvider>
          <SkipLink />
          <Navbar />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <PersonJsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
