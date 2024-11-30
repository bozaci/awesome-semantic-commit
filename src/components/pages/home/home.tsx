'use client';

import { useTranslations } from 'next-intl';
import { Sparkle } from '@phosphor-icons/react/dist/ssr';
import Config from '@/config.json';

import Hero from '@/components/ui/hero';
import WhyImportant from '@/components/sections/why-important';
import CommitMessageType from '@/components/sections/commit-message-type';
import HowToUse from '@/components/sections/how-to-use';
import HowToNotUse from '@/components/sections/how-to-not-use';
import ProjectsUsingSemanticCommit from '@/components/sections/projects-using-semantic-commit';
import FAQ from '@/components/sections/faq';
import Badge from '@/components/ui/badge';

const Home = () => {
  const t = useTranslations();

  return (
    <>
      <Hero>
        <a href={Config.github} target="_blank" rel="noreferrer">
          <Badge
            theme="outline-gradient-dark-gray"
            size="small"
            icon={<Sparkle />}
            iconAlign="left"
            isLink
            isRounded
          >
            <p className="badge__text-gradient">
              {t.rich('general.starOnGithub', {
                strong: (chunks) => <strong className="text-medium">{chunks}</strong>,
              })}
            </p>
          </Badge>
        </a>

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
