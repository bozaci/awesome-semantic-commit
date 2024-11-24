import type { Metadata } from 'next';
import Config from '@/config.json';

import CommitGenerator from '@/components/pages/commit-generator';

export const metadata: Metadata = {
  title: Config.meta.commitGenerator.title,
  description: Config.meta.commitGenerator.description,
  openGraph: {
    title: Config.meta.commitGenerator.title,
    description: Config.meta.commitGenerator.description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/commit-generator-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Guide to regular commit messages',
      },
    ],
  },
  twitter: {
    title: Config.meta.commitGenerator.title,
    description: Config.meta.commitGenerator.description,
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/commit-generator-twitter-meta-image.jpg`],
  },
};

const CommitGeneratorPage = () => {
  return <CommitGenerator />;
};

export default CommitGeneratorPage;
