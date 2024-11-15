import React from 'react';

export interface ButtonProps {
  theme: 'default' | 'primary' | 'white' | 'gray' | 'ghost-dark' | 'ghost-gray' | 'gemini';
  size: 'default' | 'small' | 'medium';
  sizeAsFont?: 'small';
  href?: string;
  externalLink?: boolean;
  type?: any;
  disabled?: boolean;
  rounded?: boolean;
  onClick?: any;
  className?: string;
  children: React.ReactNode;
}
