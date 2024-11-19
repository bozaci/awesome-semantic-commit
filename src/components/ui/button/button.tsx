import { FC } from 'react';
import { ButtonProps } from './button.type';
import Link from 'next/link';
import cx from 'classnames';

import './button.scss';

const Button: FC<ButtonProps> = ({
  theme,
  size,
  sizeAsFont,
  href,
  externalLink,
  type,
  disabled,
  rounded,
  fullWidth,
  onClick,
  className,
  children,
}) => {
  if (href)
    return (
      <Link
        onClick={onClick}
        href={href}
        target={externalLink ? '_blank' : ''}
        rel={externalLink ? 'noopenner noreferrer nofollow' : ''}
        className={cx(
          'button',
          {
            [`button--theme-${theme}`]: theme,
            [`button--size-${size}`]: size,
            [`button--size-as-font-${sizeAsFont}`]: sizeAsFont,
            'has-rounded': rounded,
            'has-full-width': fullWidth,
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
          [`button--size-as-font-${sizeAsFont}`]: sizeAsFont,
          'has-rounded': rounded,
          'has-full-width': fullWidth,
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
