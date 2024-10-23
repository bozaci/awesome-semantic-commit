import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogoProps } from './logo.type';
import cx from 'classnames';

import logoBlack from '@/assets/images/logo-black.svg';
import logoWhite from '@/assets/images/logo-white.svg';
import singeLogo from '@/assets/images/single-logo.svg';

import './logo.scss';

const Logo: FC<LogoProps> = ({ theme, area = 'general' }) => {
  return (
    <div
      className={cx('logo', {
        [`logo--area-${area}`]: area,
      })}
    >
      <Link href="/" className="logo__link">
        {theme === 'black' && (
          <Image src={logoBlack} className="logo__img" alt="Awesome Semantic Commit" />
        )}
        {theme === 'white' && (
          <Image src={logoWhite} className="logo__img" alt="Awesome Semantic Commit" />
        )}
        {theme === 'single' && (
          <Image src={singeLogo} className="logo__img" alt="Awesome Semantic Commit" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
