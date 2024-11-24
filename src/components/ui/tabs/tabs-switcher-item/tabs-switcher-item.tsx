import React, { FC } from 'react';
import { TabsSwitcherItemProps } from '../tabs.type';
import cx from 'classnames';

const TabsSwitcherItem: FC<TabsSwitcherItemProps> = ({
  value,
  isActive,
  setActiveTab,
  children,
}) => {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cx('tabs__switcher-item', {
        'is-active': isActive,
      })}
      disabled={isActive}
    >
      {children}
    </button>
  );
};

export default TabsSwitcherItem;
