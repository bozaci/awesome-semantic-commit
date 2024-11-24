import React from 'react';

type buttonsType = {
  icon: any;
  name: string;
  tooltipText?: string;
  onClick: any;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  buttons?: buttonsType[];
  hasError?: boolean;
  isDark?: boolean;
  className?: string;
}
