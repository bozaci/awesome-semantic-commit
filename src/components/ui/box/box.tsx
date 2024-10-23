import { FC } from 'react';
import { BoxProps } from './box.type';
import cx from 'classnames';

import './box.scss';

const Box: FC<BoxProps> & {
  Title: FC<{ size?: 'default' | 'medium'; className?: string; children: React.ReactNode }>;
  Text: FC<{ className?: string; children: React.ReactNode }>;
  Group: FC<{ className?: string; children: React.ReactNode }>;
  List: FC<{ className?: string; children: React.ReactNode }>;
  ListItem: FC<{ className?: string; children: React.ReactNode }>;
  Icon: FC<{ color: 'black' | 'red' | 'green'; className?: string; children: React.ReactNode }>;
  Line: FC<{ className?: string }>;
} = ({ className, children }) => {
  return <div className={cx('box', className)}>{children}</div>;
};

Box.Title = ({ className, size = 'default', children }) => {
  return (
    <span
      className={cx(
        'box__title',
        {
          [`box__title--size-${size}`]: size,
        },
        className,
      )}
    >
      {children}
    </span>
  );
};
Box.Title.displayName = 'BoxTitle';

Box.Text = ({ className, children }) => {
  return <p className={cx('box__text', className)}>{children}</p>;
};
Box.Text.displayName = 'BoxText';

Box.Group = ({ className, children }) => {
  return <div className={cx('box__group', className)}>{children}</div>;
};
Box.Group.displayName = 'BoxGroup';

Box.List = ({ className, children }) => {
  return <ul className={cx('box__list', className)}>{children}</ul>;
};
Box.List.displayName = 'BoxList';

Box.ListItem = ({ className, children }) => {
  return <li className={cx('box__list-item', className)}>{children}</li>;
};
Box.ListItem.displayName = 'BoxListItem';

Box.Icon = ({ color = 'black', className, children }) => {
  return (
    <div
      className={cx(
        'box__icon',
        {
          [`box__icon--${color}`]: color,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
Box.Icon.displayName = 'BoxIcon';

Box.Line = ({ className }) => {
  return <div className={cx('box__line', className)}></div>;
};
Box.Line.displayName = 'BoxLine';

export default Box;
