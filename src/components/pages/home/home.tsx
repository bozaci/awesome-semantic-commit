/* eslint-disable @next/next/no-img-element */
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

        <a
          href="https://www.producthunt.com/posts/awesome-semantic-commit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-awesome&#0045;semantic&#0045;commit"
          target="_blank"
          className="mt-4"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=648682&theme=light"
            alt="Awesome&#0032;Semantic&#0032;Commit - Guide&#0032;to&#0032;regular&#0032;commit&#0032;messages | Product Hunt"
            width={225}
            height={49}
          />
        </a>
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
