import { FC } from 'react';
import { LinkProps } from './link.type';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

import './link.scss';

const LinkComp: FC<LinkProps> = ({ href, isExternalLink, children }) => {
  return (
    <Link href={href} target={isExternalLink ? '_blank' : ''} className="link">
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
