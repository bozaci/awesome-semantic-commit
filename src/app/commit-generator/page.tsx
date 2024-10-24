import type { Metadata } from 'next';
import Config from '@/config.json';

import CommitGenerator from '@/components/pages/commit-generator';

export const metadata: Metadata = {
  title: Config.meta.commitGenerator.title,
  description: Config.meta.commitGenerator.description,
  openGraph: {
    title: Config.meta.commitGenerator.title,
    description: Config.meta.commitGenerator.description,
  },
  twitter: {
    title: Config.meta.commitGenerator.title,
    description: Config.meta.commitGenerator.description,
  },
};

const CommitGeneratorPage = () => {
  return <CommitGenerator />;
};

export default CommitGeneratorPage;
