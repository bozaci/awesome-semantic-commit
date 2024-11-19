import React, { FC } from 'react';
import { IconButtonProps } from './icon-button.type';
import cx from 'classnames';

import './icon-button.scss';

const IconButton: FC<IconButtonProps> = ({
  size,
  icon,
  iconColor,
  iconHoverColor,
  onClick,
  className,
}) => {
  return (
    <span
      onClick={onClick}
      className={cx(
        'icon-button',
        {
          [`icon-button--size-${size}`]: size,
        },
        className,
      )}
      style={
        {
          '--icon-button-icon-color': iconColor,
          '--icon-button-icon-hover-color': iconHoverColor,
        } as React.CSSProperties
      }
      role="button"
    >
      {icon}
    </span>
  );
};

export default IconButton;
