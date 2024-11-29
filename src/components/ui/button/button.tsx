import { FC } from 'react';
import { ButtonProps } from './button.type';
import Link from 'next/link';
import cx from 'classnames';

import './button.scss';

const Button: FC<ButtonProps> = ({
  theme,
  size,
  sizeAsFont,
  icon,
  iconAlign,
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
        {iconAlign === 'left' && (
          <div className="button__icon button__icon--align-left">{icon}</div>
        )}
        {children}
        {iconAlign === 'right' && (
          <div className="button__icon button__icon--align-right">{icon}</div>
        )}
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
      {iconAlign === 'left' && <div className="button__icon button__icon--align-left">{icon}</div>}
      {children}
      {iconAlign === 'right' && (
        <div className="button__icon button__icon--align-right">{icon}</div>
      )}
    </button>
  );
};

export default Button;
