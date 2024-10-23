import React from 'react';

export interface BadgeProps {
  theme:
    | 'ghost-primary'
    | 'ghost-orange'
    | 'ghost-gray'
    | 'dashed-orange'
    | 'ghost-gradient-gemini';
  size?: 'default' | 'small' | 'medium';
  icon?: any;
  iconAlign?: 'left' | 'right';
  copyText?: string;
  useWithCopyClipboard?: boolean;
  isRounded?: boolean;
  className?: string;
  children: React.ReactNode;
}
