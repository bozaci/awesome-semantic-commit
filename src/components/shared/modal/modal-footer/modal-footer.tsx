'use client';

import { FC } from 'react';
import { ModalFooterProps } from './modal-footer.type';
import cx from 'classnames';

const ModalFooter: FC<ModalFooterProps> = ({ isUsedInner, children }) => {
  return (
    <div
      className={cx('modal__footer', {
        'is-used-inner': isUsedInner,
      })}
    >
      {children}
    </div>
  );
};

export default ModalFooter;
