import React, { FC } from 'react';
import { TabsSwitchersProps } from '../tabs.type';

const TabsSwitchers: FC<TabsSwitchersProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="tabs__switcher">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          isActive: activeTab === child.props.value,
          setActiveTab,
        });
      })}
    </div>
  );
};

export default TabsSwitchers;
