import React, { useState, useEffect, useRef, FC } from 'react';
import { TooltipProps } from './tooltip.type';
import cx from 'classnames';

import './tooltip.scss';

const Tooltip: FC<TooltipProps> = ({ position, content, children }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState<number | undefined>(10);

  useEffect(() => {
    const heightValue = innerRef.current?.offsetHeight;
    setInnerHeight(heightValue);
  }, []);

  return (
    <div
      className={cx('tooltip', {
        [`tooltip--position-${position}`]: position,
      })}
      style={{ '--inner-height': `${innerHeight}px` } as React.CSSProperties}
    >
      <div ref={innerRef} className="tooltip__inner">
        {children}
      </div>
      <div className="tooltip__menu" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Tooltip;
