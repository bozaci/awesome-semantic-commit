import { Metadata } from 'next';
import Config from '@/config.json';

import NotFound from '@/components/pages/not-found';

export const metadata: Metadata = {
  title: Config.meta.notFound.title,
  description: Config.meta.notFound.description,
  openGraph: {
    title: Config.meta.notFound.title,
    description: Config.meta.notFound.description,
    images: [],
  },
  twitter: {
    title: Config.meta.notFound.title,
    description: Config.meta.notFound.description,
    images: [''],
  },
};

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;
