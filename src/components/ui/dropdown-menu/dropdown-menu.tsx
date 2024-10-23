import { useRef, FC } from 'react';
import { DropdownMenuProps } from './dropdown-menu.type';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classnames';

import './dropdown-menu.scss';

const initialSettings = {
  spacingFromTop: 5,
  spacingFromLeft: 0,
  closeOnSelect: true,
};

const DropdownMenu: FC<DropdownMenuProps> = ({
  data,
  settings = initialSettings,
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    ref.current?.classList.add('is-active');
  };

  const handleCloseMenu = () => {
    ref.current?.classList.remove('is-active');
  };

  const handleSelectItem = (item: any) => {
    if (settings.closeOnSelect) handleCloseMenu();
    item.onClick();
  };

  useOnClickOutside(ref, handleCloseMenu);

  return (
    <div
      ref={ref}
      className={cx('dropdown-menu', className)}
      style={
        {
          '--spacing-from-top': `${settings?.spacingFromTop}px`,
          '--spacing-from-left': `${settings?.spacingFromLeft}px`,
        } as React.CSSProperties
      }
    >
      <div onClick={handleShowMenu} className="dropdown-menu__inner">
        {children}
      </div>

      <div className="dropdown-menu__menu">
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className={cx('dropdown-menu__item', {
                'is-selected': item.isSelected,
              })}
            >
              <p className="dropdown-menu__text">{item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
