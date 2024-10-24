import React, { FC } from 'react';
import { HeroProps } from './hero.type';
import Transition from '@/components/ui/transition';

import './hero.scss';

const Hero: FC<HeroProps> & {
  Title: FC<{ children: React.ReactNode }>;
  Text: FC<{ children: React.ReactNode }>;
  ButtonContainer: FC<{ children: React.ReactNode }>;
} = ({ children }) => {
  return (
    <section className="hero">
      <div className="container container--medium">
        <Transition>
          <div className="hero__inner">{children}</div>
        </Transition>
      </div>
    </section>
  );
};

Hero.Title = ({ children }) => {
  return <span className="hero__title">{children}</span>;
};
Hero.Title.displayName = 'HeroTitle';

Hero.Text = ({ children }) => {
  return <p className="hero__text">{children}</p>;
};
Hero.Text.displayName = 'HeroText';

Hero.ButtonContainer = ({ children }) => {
  return <div className="hero__button-container">{children}</div>;
};
Hero.ButtonContainer.displayName = 'HeroButtonContainer';

export default Hero;
