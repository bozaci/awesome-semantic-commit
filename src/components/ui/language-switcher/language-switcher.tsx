'use client';

import { useRef, useState, useEffect, FC } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react/dist/ssr';
import { LanguageSwitcherProps } from './language-switcher.type';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';
import { useOnClickOutside } from 'usehooks-ts';
import cx from 'classnames';

import Loader from '@/components/ui/loader';

import './language-switcher.scss';

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ data, defaultValue }) => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<any>({});
  const ref = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => {
    setShow(true);
    setTimeout(() => {
      ref.current?.classList.toggle('is-active');
    }, 1);
  };

  const handleCloseMenu = () => {
    ref.current?.classList.remove('is-active');

    setTimeout(() => {
      setShow(false);
    }, 325);
  };

  const handleSwitchLanguage = (value: string) => {
    const locale = value as Locale;

    handleCloseMenu();
    setUserLocale(locale);
  };

  useEffect(() => {
    if (!data) return;

    const selectedLang = data.filter((item) => item.value === defaultValue);
    setSelectedLanguage(selectedLang[0]);
  }, [data, defaultValue]);

  useOnClickOutside(ref, handleCloseMenu);

  return (
    <div ref={ref} className="language-switcher">
      <div onClick={handleOpenMenu} className="language-switcher__inner">
        <div className="language-switcher__inner-container">
          <span className="language-switcher__text">{selectedLanguage?.name || <Loader />}</span>
        </div>

        <div className="language-switcher__inner-icon">
          <div className="language-switcher__inner-icon-container">
            <CaretDown />
          </div>
        </div>
      </div>

      {show && (
        <div className="language-switcher__menu">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSwitchLanguage(item.value)}
              className={cx('language-switcher__menu-item', {
                'is-active': item.value == defaultValue,
              })}
            >
              <div className="language-switcher__menu-icon">
                {item.value == defaultValue && <Check />}
              </div>

              <p className="language-switcher__text text-regular">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
