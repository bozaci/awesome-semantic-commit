import React from 'react';

type buttonsType = {
  icon: any;
  name: string;
  tooltipText?: string;
  onClick: any;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field?: any;
  buttons?: buttonsType[];
  className?: string;
}
