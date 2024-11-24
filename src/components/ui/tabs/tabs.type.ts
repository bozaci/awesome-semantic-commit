import React from 'react';

type customSettingsType = {
  switcher: {
    backgroundColor?: string;
    backgroundHoverColor?: string;
    backgroundActiveColor?: string;
    seperatorColor?: string;
    padding?: string;
    fullWidth?: boolean;

    font?: {
      size?: number;
      weight?: number;
    };
  };
  content: {
    padding?: string;
    animationSpeed?: 'slow' | 'medium' | 'fast' | string;
  };
};

export interface TabsProps {
  defaultValue: string;
  customSettings?: customSettingsType;
  useWithCookie?: string;
  className?: string;
  children: React.ReactNode;
}

export interface TabsSwitchersProps {
  children: any;
  activeTab?: string;
  setActiveTab?: any;
}

export interface TabsSwitcherItemProps {
  value: string;
  isActive?: boolean;
  activeTab?: string;
  setActiveTab?: any;
  children: React.ReactNode;
}

export interface TabsContentsProps {
  activeTab?: string;
  children: any;
}

export interface TabsContentItemProps {
  value: string;
  isActive?: boolean;
  children: React.ReactNode;
}
