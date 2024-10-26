import React, { useState, useEffect, useRef, FC } from 'react';
import { InputProps } from './input.type';
import cx from 'classnames';

import Tooltip from '@/components/ui/tooltip';

import './input.scss';

const Input: FC<InputProps> = ({ field, buttons = [], hasError, className, ...res }) => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [buttonsWidth, setButtonsWidth] = useState<number | undefined>(23);

  useEffect(() => {
    if (buttonsWidth === undefined) return setButtonsWidth(23);

    const widthValue = buttonsRef.current?.offsetWidth;
    setButtonsWidth(widthValue ? widthValue : 23);
  }, [buttonsWidth]);

  return (
    <div
      className={cx('input-container', {
        'input-container--with-buttons': buttons.length > 0,
        'has-error': hasError,
      })}
      style={{ '--buttons-width': `${buttonsWidth}px` } as React.CSSProperties}
    >
      <input
        type="text"
        className={cx('input input-container__input', className)}
        {...field}
        {...res}
      />

      {buttons.length > 0 && (
        <div ref={buttonsRef} className="input-container__buttons">
          {buttons?.map((item, index) => (
            <Tooltip
              key={index}
              position="top-right"
              content={`<p class="tooltip__text">${item.tooltipText}</p>`}
            >
              <div onClick={item.onClick} className="input-container__button-item">
                {item.icon}
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
