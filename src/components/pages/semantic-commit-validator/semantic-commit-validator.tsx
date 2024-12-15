import { useTranslations } from 'next-intl';

import Hero from '@/components/ui/hero';
import Badge from '@/components/ui/badge';
import SemanticCommitValidatorForm from '@/components/sections/semantic-commit-validator-form';
import SemanticCommitValidatorFAQ from '@/components/sections/semantic-commit-validator-faq/semantic-commit-validator-faq';

const SemanticCommitValidator = () => {
  const t = useTranslations('semanticCommitValidator');
  const generalT = useTranslations('general');

  return (
    <>
      <Hero>
        <Badge theme="ghost-gradient-gemini" size="small" className="d-block" isRounded>
          {generalT.rich('supportedWithGemini', {
            strong: (chunks: any) => <strong className="text-medium">{chunks}</strong>,
          })}
        </Badge>
        <Hero.Title>{t('title')}</Hero.Title>
        <Hero.Text>{t('text')}</Hero.Text>
      </Hero>

      <SemanticCommitValidatorForm />
      <SemanticCommitValidatorFAQ />
    </>
  );
};

export default SemanticCommitValidator;
