import { useTranslations } from 'next-intl';

import Hero from '@/components/ui/hero';
import Badge from '@/components/ui/badge';
import CommitGeneratorForm from '@/components/sections/commit-generator-form';
import CommitGeneratorFAQ from '@/components/sections/commit-generator-faq/commit-generator-faq';

const CommitGenerator = () => {
  const t = useTranslations('commitGenerator');
  const generalT = useTranslations('general');

  return (
    <>
      <Hero>
        <Badge theme="ghost-gradient-gemini" size="small" className="d-block" isRounded>
          {generalT.rich('supportedWithGeminiAndChatGPT', {
            strong: (chunks: any) => <strong className="text-medium">{chunks}</strong>,
          })}
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
