import React, { useEffect, useRef, FC } from 'react';
import { TabsContentItemProps } from '../tabs.type';

const TabsContentItem: FC<TabsContentItemProps> = ({ isActive, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    setTimeout(() => {
      ref.current?.classList.add('is-active');
    }, 1);
  }, [isActive]);

  if (!isActive) return;

  return (
    <div ref={ref} className="tabs__content-item">
      {children}
    </div>
  );
};

export default TabsContentItem;
