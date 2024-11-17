import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { CSPostHogProvider } from './providers';
import { getTranslations } from 'next-intl/server';
import Config from '@/config.json';

const Header = dynamic(() => import('../components/shared/header'));
const Footer = dynamic(() => import('../components/shared/footer'));
import Headings from '@/components/ui/headings';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations();
  const headingsData = [
    {
      title: t('whyImportant.title'),
      href: '#why-is-it-important',
    },
    {
      title: t('commitMessageType.title'),
      href: '#commit-message-structure',
    },
    {
      title: t('howToUse.title'),
      href: '#how-to-use',
    },
    {
      title: t('howToNotUse.title'),
      href: '#how-to-not-use',
    },
    {
      title: t('projectsUsingSemanticCommit.title'),
      href: '#projects-using-semantic-commit',
    },
    {
      title: t('faq.title'),
      href: '#faq',
    },
  ];

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CSPostHogProvider>
            <Header />
            <Toaster containerClassName="toaster" />
            <Headings data={headingsData} activePathname="/" />
            <main className="main spacing--medium-y">{children}</main>
            <Footer />
            <Analytics />
          </CSPostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
