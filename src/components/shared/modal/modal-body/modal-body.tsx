'use client';

import { FC } from 'react';
import { ModalBodyProps } from './modal-body.type';

const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return <div className="modal__body">{children}</div>;
};

export default ModalBody;
