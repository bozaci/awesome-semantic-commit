import React from 'react';

type positionType = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';

type responsiveType = {
  smallMobilePosition: positionType;
  mobilePosition: positionType;
  tabletPosition: positionType;
  laptopOrDesktopPosition: positionType;
};

export interface TooltipProps {
  position: positionType;
  content: any;
  responsive?: responsiveType;
  innerHeightCustomValue?: number;
  children: React.ReactNode;
}
