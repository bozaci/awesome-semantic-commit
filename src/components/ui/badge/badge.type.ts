import React from 'react';

export interface BadgeProps {
  theme:
    | 'ghost-primary'
    | 'ghost-orange'
    | 'ghost-gray'
    | 'ghost-gradient-gemini'
    | 'outline-gradient-dark-gray'
    | 'ghost-green'
    | 'dashed-orange';
  size?: 'default' | 'small' | 'medium';
  icon?: any;
  iconAlign?: 'left' | 'right';
  copyText?: string;
  useWithCopyClipboard?: boolean;
  isRounded?: boolean;
  isDark?: boolean;
  isLink?: boolean;
  className?: string;
  children: React.ReactNode;
}
