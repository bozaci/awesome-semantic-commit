import { FC } from 'react';
import { IconContainerProps } from './icon-container.type';
import cx from 'classnames';

import './icon-container.scss';

const IconContainer: FC<IconContainerProps> = ({
  size,
  backgroundColor,
  icon,
  iconColor,
  hasRounded,
  className,
}) => {
  return (
    <div
      className={cx(
        'icon-container',
        {
          [`icon-container--size-${size}`]: size,
          'has-rounded': hasRounded,
        },
        className,
      )}
      style={
        {
          '--icon-container-background-color': backgroundColor,
          '--icon-container-icon-color': iconColor,
        } as React.CSSProperties
      }
    >
      {icon}
    </div>
  );
};

export default IconContainer;
