import { FC } from 'react';
import { HeadingTitleProps } from './heading-title.type';

import Transition from '@/components/ui/transition';

import './heading-title.scss';

const HeadingTitle: FC<HeadingTitleProps> = ({ text, titleChildrenAlign, titleChildren }) => {
  return (
    <div className="heading-title">
      {titleChildren ? (
        <div className="d-flex align-items-center">
          {titleChildrenAlign === 'left' && <>{titleChildren}</>}
          <span className="heading-title__text">
            <Transition>{text}</Transition>
          </span>
          {titleChildrenAlign === 'right' && <>{titleChildren}</>}
        </div>
      ) : (
        <span className="heading-title__text">
          <Transition>{text}</Transition>
        </span>
      )}
      <div className="heading-title__line"></div>
    </div>
  );
};

export default HeadingTitle;
