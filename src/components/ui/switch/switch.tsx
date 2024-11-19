'use client';

import { FC } from 'react';
import { SwitchProps } from './switch.type';
import cx from 'classnames';

import './switch.scss';

const Switch: FC<SwitchProps> = ({ field, isDark, className, ...res }) => {
  return (
    <label className={cx('switch', { 'is-dark': isDark }, className)}>
      <input type="checkbox" className="switch__input" {...field} {...res} />

      <div className="switch__inner">
        <div className="switch__circle"></div>
      </div>
    </label>
  );
};

export default Switch;
