import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Hero from '@/components/ui/hero';
import Badge from '@/components/ui/badge';
import CommitGeneratorForm from '@/components/sections/commit-generator-form';
import CommitGeneratorFAQ from '@/components/sections/commit-generator-faq/commit-generator-faq';

import geminiLogo from '@/assets/images/google-gemini-logo.png';

const CommitGenerator = () => {
  const t = useTranslations('commitGenerator');
  const generalT = useTranslations('general');

  return (
    <>
      <Hero>
        <Badge theme="ghost-gradient-gemini" size="small" isRounded>
          <>
            <Image src={geminiLogo} alt="" className="badge__img badge__img--gemini-logo" />
            &nbsp;{generalT('supportedWithGemini')}
          </>
        </Badge>
        <Hero.Title>{t('title')}</Hero.Title>
        <Hero.Text>{t('text')}</Hero.Text>
      </Hero>

      <CommitGeneratorForm />
      <CommitGeneratorFAQ />
    </>
  );
};

export default CommitGenerator;
