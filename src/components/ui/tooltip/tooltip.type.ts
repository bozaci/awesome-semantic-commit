import React from 'react';

export interface TooltipProps {
  position: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  content: any;
  children: React.ReactNode;
}
