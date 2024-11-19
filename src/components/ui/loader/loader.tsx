'use client';

import { FC } from 'react';
import { LoaderProps } from './loader.type';
import { RotatingLines } from 'react-loader-spinner';
import cx from 'classnames';

import './loader.scss';

const Loader: FC<LoaderProps> = ({ theme = 'gray', size = 'defualt', text, className }) => {
  const widthSize = () => {
    if (size == 'default') return '20';
    if (size == 'small') return '16';

    return '20';
  };
  const widthValue = widthSize();

  return (
    <div className={cx('loader', className)}>
      <RotatingLines strokeColor={theme} strokeWidth="4" width={widthValue} />
      {text && <span className="loader__text">{text}</span>}
    </div>
  );
};

export default Loader;
