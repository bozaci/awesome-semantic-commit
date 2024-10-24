import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import Config from '@/config.json';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer/footer';
import LanguageDetect from '@/components/ui/language-detect';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '@/styles/main.scss';

export const metadata: Metadata = {
  title: Config.meta.general.title,
  description: Config.meta.general.description,
  openGraph: {
    title: Config.meta.general.title,
    description: Config.meta.general.description,
    siteName: 'Awesome Semantic Commit',
    images: [
      {
        url: `${process.env.BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Guide to regular commit messages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: Config.meta.general.title,
    description: Config.meta.general.description,
    images: [`${process.env.BASE_URL}/twitter-meta-image.jpg`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LanguageDetect />
          <Header />
          <Toaster containerClassName="toaster" />
          <main className="main spacing--medium-y">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
