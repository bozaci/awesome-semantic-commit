'use client';

import { FC } from 'react';
import { ModalHeaderProps } from './modal-header.type';
import { X } from '@phosphor-icons/react/dist/ssr';

const ModalHeader: FC<ModalHeaderProps> = ({ title, closeOnClick }) => {
  return (
    <div className="modal__header">
      <span className="modal__title">{title}</span>

      <div onClick={closeOnClick} className="modal__close">
        <X />
      </div>
    </div>
  );
};

export default ModalHeader;
