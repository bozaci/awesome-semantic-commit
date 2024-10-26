'use client';

import { useState, useEffect, useRef, FC } from 'react';
import { SelectMenuProps, optionsType } from './select-menu.type';
import { CaretDown, Check } from '@phosphor-icons/react/dist/ssr';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classnames';

import './select-menu.scss';

const SelectMenu: FC<SelectMenuProps> = ({ options = [], setOptions }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<optionsType>(options[0]);

  const handleShowMenu = () => {
    ref.current?.classList.toggle('is-active');
  };

  const handleCloseMenu = () => {
    ref.current?.classList.remove('is-active');
  };

  const handleSelectItem = (item: any) => {
    const newOptions = [...options];
    options.forEach((option) => {
      option.isSelected = false;
    });
    setOptions(newOptions);
    item.isSelected = true;
    handleCloseMenu();
    setSelected(item);
  };

  useEffect(() => {
    if (!options) return;

    const selected = options.filter((item) => item.isSelected);
    setSelected(selected[0]);
  }, [options]);

  useOnClickOutside(ref, handleCloseMenu);

  return (
    <div ref={ref} className="select-menu">
      <div onClick={handleShowMenu} className="select-menu__inner">
        <span className="select-menu__text">{selected?.name}</span>

        <div className="select-menu__arrow-icon">
          <CaretDown />
        </div>
      </div>

      <div className="select-menu__menu">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelectItem(option)}
            className={cx('select-menu__item', {
              'is-selected': option.isSelected,
            })}
          >
            <span className="select-menu__text select-menu__text--white">{option.name}</span>

            {option.isSelected && (
              <div className="select-menu__select-icon">
                <Check />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMenu;
