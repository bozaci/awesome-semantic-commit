import { useTranslations } from 'next-intl';

import Hero from '@/components/ui/hero';
import Button from '@/components/ui/button';

const NotFound = () => {
  const t = useTranslations('notFound');
  const tGeneral = useTranslations('general');

  return (
    <>
      <Hero>
        <Hero.Title>{t('title')}</Hero.Title>
        <Hero.Text>{t('text')}</Hero.Text>

        <Hero.ButtonContainer>
          <Button theme="ghost-dark" size="default" href="mailto:hi@sematiccommit.com">
            {tGeneral('contactUs')}
          </Button>
          <Button theme="primary" size="default" href="/">
            {tGeneral('goToHomepage')}
          </Button>
        </Hero.ButtonContainer>
      </Hero>
    </>
  );
};

export default NotFound;
