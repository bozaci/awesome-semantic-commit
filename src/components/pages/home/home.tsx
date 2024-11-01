'use client';

import { useTranslations } from 'next-intl';

import Hero from '@/components/ui/hero';
import WhyImportant from '@/components/sections/why-important';
import CommitMessageType from '@/components/sections/commit-message-type';
import HowToUse from '@/components/sections/how-to-use';
import HowToNotUse from '@/components/sections/how-to-not-use';
import ProjectsUsingSemanticCommit from '@/components/sections/projects-using-semantic-commit';
import FAQ from '@/components/sections/faq';

const Home = () => {
  const t = useTranslations();

  return (
    <>
      <Hero>
        <Hero.Title>{t('hero.title')}</Hero.Title>
        <Hero.Text>{t('hero.text')}</Hero.Text>
      </Hero>

      <WhyImportant />
      <CommitMessageType />
      <HowToUse />
      <HowToNotUse />
      <ProjectsUsingSemanticCommit />
      <FAQ />
    </>
  );
};

export default Home;
