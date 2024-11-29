import type { Metadata } from 'next';
import type { Viewport } from 'next';
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { CSPostHogProvider } from './providers';
import ReduxToolkitProvider from '@/providers/redux-toolkit-provider';
import Config from '@/config.json';

const Header = dynamic(() => import('../components/shared/header'));
const Footer = dynamic(() => import('../components/shared/footer'));
import Modal from '@/components/shared/modal';

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
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.jpg`,
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
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/twitter-meta-image.jpg`],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
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
        <ReduxToolkitProvider>
          <NextIntlClientProvider messages={messages}>
            <CSPostHogProvider>
              <Header />
              <Toaster containerClassName="toaster" />
              <Modal />

              <main className="main spacing--medium-y">{children}</main>
              <Footer />
              <Analytics />
            </CSPostHogProvider>
          </NextIntlClientProvider>
        </ReduxToolkitProvider>
      </body>
    </html>
  );
}
