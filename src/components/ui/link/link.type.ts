import React from 'react';

export interface LinkProps {
  href: string;
  isExternalLink?: boolean;
  children: React.ReactNode;
}
