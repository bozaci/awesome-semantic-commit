import React, { useState, useEffect, FC } from 'react';
import {
  TabsProps,
  TabsSwitchersProps,
  TabsSwitcherItemProps,
  TabsContentsProps,
  TabsContentItemProps,
} from './tabs.type';
import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { findChildByDisplayName } from '@/utils/find-child-by-displayname';
import { cloneElementWithProps } from '@/utils/clone-element-with-props';
import cx from 'classnames';

import TabsSwitchers from './tabs-switchers';
import TabsContents from './tabs-contents';
import TabsSwitcherItem from './tabs-switcher-item';
import TabsContentItem from './tabs-content-item';

import './tabs.scss';

const Tabs: FC<TabsProps> & {
  Switchers: FC<TabsSwitchersProps>;
  SwitcherItem: FC<TabsSwitcherItemProps>;
  Contents: FC<TabsContentsProps>;
  ContentItem: FC<TabsContentItemProps>;
} = ({ defaultValue, customSettings, useWithCookie, className, children }) => {
  const [activeTab, setActiveTab] = useState<string>(useWithCookie ? '' : defaultValue);
  const [cookieValue, setCookieValue] = useLocalStorage(useWithCookie || 'active-tab', '');
  const searchParams = useSearchParams();

  const switchers = findChildByDisplayName('Tabs.Switchers', children);
  const contents = findChildByDisplayName('Tabs.Contents', children);

  useEffect(() => {
    if (!activeTab) return;
    if (useWithCookie) return setCookieValue(activeTab);

    window.history.pushState({}, '', `/?activeTab=${activeTab}`);
  }, [activeTab, setCookieValue, useWithCookie]);

  useEffect(() => {
    if (useWithCookie) return;

    const searchParamsActiveTab = searchParams.get('activeTab');

    if (!searchParamsActiveTab) return;

    setActiveTab(searchParamsActiveTab);
  }, [searchParams, setActiveTab, useWithCookie]);

  useEffect(() => {
    if (!cookieValue) return;

    setActiveTab(cookieValue);
  }, [cookieValue]);

  useEffect(() => {
    if (!defaultValue) return;
    if (cookieValue) return;
    if (searchParams.get('activeTab')) return;

    setActiveTab(defaultValue);
  }, [defaultValue, searchParams, cookieValue]);

  return (
    <div
      className={cx(
        'tabs',
        {
          [`tabs--content-animation-speed-${customSettings?.content.animationSpeed}`]:
            customSettings?.content.animationSpeed,
          'tabs--switcher-full-width': customSettings?.switcher.fullWidth,
        },
        className,
      )}
      style={
        {
          '--tabs-switcher-background-color': customSettings?.switcher.backgroundColor,
          '--tabs-switcher-background-hover-color': customSettings?.switcher.backgroundHoverColor,
          '--tabs-switcher-background-active-color': customSettings?.switcher.backgroundActiveColor,
          '--tabs-switcher-seperator-color': customSettings?.switcher.seperatorColor,
          '--tabs-switcher-padding': customSettings?.switcher.padding,
          '--tabs-switcher-font-size': `${customSettings?.switcher?.font?.size}px`,
          '--tabs-switcher-font-weight': customSettings?.switcher?.font?.weight,
          '--tabs-content-padding': customSettings?.content.padding,
        } as React.CSSProperties
      }
    >
      {cloneElementWithProps(switchers, { activeTab, setActiveTab })}
      {cloneElementWithProps(contents, { activeTab })}
    </div>
  );
};

Tabs.Switchers = TabsSwitchers;
TabsSwitchers.displayName = 'Tabs.Switchers';

Tabs.SwitcherItem = TabsSwitcherItem;
TabsSwitcherItem.displayName = 'Tabs.SwitcherItem';

Tabs.Contents = TabsContents;
TabsContents.displayName = 'Tabs.Contents';

Tabs.ContentItem = TabsContentItem;
TabsContentItem.displayName = 'Tabs.ContentItem';

export default Tabs;
