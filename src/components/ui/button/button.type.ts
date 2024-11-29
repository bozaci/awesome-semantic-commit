import React from 'react';

export interface ButtonProps {
  theme:
    | 'default'
    | 'primary'
    | 'white'
    | 'gray'
    | 'green'
    | 'ghost-dark'
    | 'ghost-gray'
    | 'gemini';
  size: 'default' | 'small' | 'medium';
  sizeAsFont?: 'small';
  icon?: any;
  iconAlign?: 'left' | 'right';
  href?: string;
  externalLink?: boolean;
  type?: any;
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  onClick?: any;
  className?: string;
  children: React.ReactNode;
}
