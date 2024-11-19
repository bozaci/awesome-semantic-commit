import React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field?: any;
  isDark?: boolean;
  className?: string;
}
