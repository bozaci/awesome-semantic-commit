import React, { useState, useEffect, useRef, FC } from 'react';
import { TooltipProps } from './tooltip.type';
import { useMediaQuery } from 'usehooks-ts';
import cx from 'classnames';

import './tooltip.scss';

const Tooltip: FC<TooltipProps> = ({
  position,
  content,
  responsive,
  innerHeightCustomValue,
  children,
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState<number | undefined>(10);
  const [tooltipPosition, setTooltipPosition] = useState<any>(position);
  const isLaptopOrDesktop = useMediaQuery('(min-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 992px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 576px)');

  useEffect(() => {
    const heightValue = innerRef.current?.offsetHeight;
    setInnerHeight(heightValue);
  }, []);

  // Responsive queries
  useEffect(() => {
    if (isSmallMobile) return setTooltipPosition(responsive?.smallMobilePosition || position);
    if (isMobile) return setTooltipPosition(responsive?.mobilePosition || position);
    if (isTablet) return setTooltipPosition(responsive?.tabletPosition || position);
    if (isLaptopOrDesktop)
      return setTooltipPosition(responsive?.laptopOrDesktopPosition || position);
  }, [isSmallMobile, isMobile, isTablet, isLaptopOrDesktop]);

  return (
    <div
      className={cx('tooltip', {
        [`tooltip--position-${tooltipPosition}`]: tooltipPosition,
      })}
      style={
        {
          '--inner-height': `${innerHeightCustomValue ? innerHeightCustomValue : innerHeight}px`,
        } as React.CSSProperties
      }
    >
      <div ref={innerRef} className="tooltip__inner">
        {children}
      </div>
      <div className="tooltip__menu" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Tooltip;
