import React from 'react';

export interface ButtonProps {
  theme: 'default' | 'primary' | 'white' | 'ghost-dark';
  size: 'default' | 'small';
  href?: string;
  type?: any;
  disabled?: boolean;
  onClick?: any;
  className?: string;
  children: React.ReactNode;
}
