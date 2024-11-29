import { Metadata } from 'next';
import Config from '@/config.json';

import SemanticCommitValidator from '@/components/pages/semantic-commit-validator';

export const metadata: Metadata = {
  title: Config.meta.semanticCommitValidator.title,
  description: Config.meta.semanticCommitValidator.description,
  openGraph: {
    title: Config.meta.semanticCommitValidator.title,
    description: Config.meta.semanticCommitValidator.description,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/semantic-commit-validator-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Semantic commit validator',
      },
    ],
  },
  twitter: {
    title: Config.meta.semanticCommitValidator.title,
    description: Config.meta.semanticCommitValidator.description,
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/semantic-commit-validator-twitter-meta-image.jpg`,
    ],
  },
};

const SemanticCommitValidatorPage = () => {
  return <SemanticCommitValidator />;
};

export default SemanticCommitValidatorPage;
