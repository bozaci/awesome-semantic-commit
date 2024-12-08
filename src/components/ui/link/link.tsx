import { FC } from 'react';
import { LinkProps } from './link.type';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import cx from 'classnames';

import './link.scss';

const LinkComp: FC<LinkProps> = ({
  href,
  variant = 'primary-bottom-line',
  size = 'default',
  isExternalLink,
  className,
  children,
}) => {
  return (
    <Link
      href={href}
      target={isExternalLink ? '_blank' : ''}
      className={cx(
        'link',
        {
          [`link--variant-${variant}`]: variant,
          [`link--size-${size}`]: size,
        },
        className,
      )}
    >
      {children}
      {isExternalLink && (
        <span className="link__icon">
          <ArrowUpRight />
        </span>
      )}
    </Link>
  );
};

export default LinkComp;
