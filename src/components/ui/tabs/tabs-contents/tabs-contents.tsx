import React, { FC } from 'react';
import { TabsContentsProps } from '../tabs.type';

const TabsContents: FC<TabsContentsProps> = ({ activeTab, children }) => {
  return (
    <div className="tabs__content">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          isActive: activeTab === child.props.value,
        });
      })}
    </div>
  );
};

export default TabsContents;
