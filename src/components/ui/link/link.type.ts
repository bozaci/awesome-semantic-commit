import React from 'react';

export interface LinkProps {
  href: string;
  variant?: 'primary-bottom-line' | 'gray';
  size?: 'default' | 'small' | 'medium';
  isExternalLink?: boolean;
  className?: string;
  children: React.ReactNode;
}
