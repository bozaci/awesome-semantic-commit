import { FC } from 'react';
import { HeadingTitleProps } from './heading-title.type';

import Transition from '@/components/ui/transition';

import './heading-title.scss';

const HeadingTitle: FC<HeadingTitleProps> = ({ text }) => {
  return (
    <div className="heading-title">
      <span className="heading-title__text">
        <Transition>{text}</Transition>
      </span>
      <div className="heading-title__line"></div>
    </div>
  );
};

export default HeadingTitle;
