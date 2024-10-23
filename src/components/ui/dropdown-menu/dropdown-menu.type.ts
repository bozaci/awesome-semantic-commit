import React from 'react';

export type dataType = {
  name: string;
  value: string;
  onClick?: any;
  isSelected?: boolean;
};

type settingsType = {
  spacingFromTop?: number;
  spacingFromLeft?: number;
  closeOnSelect?: boolean;
};

export interface DropdownMenuProps {
  data: dataType[];
  settings?: settingsType;
  className?: string;
  children: React.ReactNode;
}
