import { FC } from 'react';
import { ButtonGroupProps } from './button-group.type';
import cx from 'classnames';

import './button-group.scss';

const ButtonGroup: FC<ButtonGroupProps> = ({ radiusType, children }) => {
  return (
    <div
      className={cx('button-group', {
        [`button-group--radius-type-${radiusType}`]: radiusType,
      })}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
