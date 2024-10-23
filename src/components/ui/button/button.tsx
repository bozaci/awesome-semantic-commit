import { FC } from 'react';
import { ButtonProps } from './button.type';
import Link from 'next/link';
import cx from 'classnames';

import './button.scss';

const Button: FC<ButtonProps> = ({
  theme,
  size,
  href,
  type,
  disabled,
  onClick,
  className,
  children,
}) => {
  if (href)
    return (
      <Link
        onClick={onClick}
        href={href}
        className={cx(
          'button',
          {
            [`button--theme-${theme}`]: theme,
            [`button--size-${size}`]: size,
          },
          className,
        )}
      >
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      type={type}
      className={cx(
        'button',
        {
          [`button--theme-${theme}`]: theme,
          [`button--size-${size}`]: size,
        },
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
