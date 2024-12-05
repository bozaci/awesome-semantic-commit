'use client';

import { useEffect, useRef, useCallback } from 'react';
import { modalData } from '@/modals/utils/modalData';
import { useModals, closeModal } from '@/modals/utils/modalHooks';
import { useOnClickOutside } from 'usehooks-ts';

import './modal.scss';

const Modal = () => {
  const refInner = useRef<HTMLDivElement>(null);
  const modal = useModals();
  const lastModalIndex = modal.length - 1;
  const lastModal = modal[lastModalIndex];

  const handleCloseModal = useCallback(
    (name: string) => {
      // Use document.querySelector instead of useRef,
      // because when using multiple modals,
      // useRef may return null after the last element is removed.
      const modalSelector = document.querySelector(`[data-modal="${lastModal?.name}"]`);

      if (!modalSelector) return closeModal(name);

      modalSelector.classList.remove('is-active');

      setTimeout(() => {
        document.body.classList.remove('has-none-scroll');
        modalSelector.classList.remove('is-show');
        closeModal(name);
      }, 225);
    },
    [lastModal?.name],
  );

  useEffect(() => {
    // Use document.querySelector instead of useRef,
    // because when using multiple modals,
    // useRef may return null after the last element is removed.
    const modalSelector = document.querySelector(`[data-modal="${lastModal?.name}"]`);

    if (!modalSelector) return;

    setTimeout(() => {
      modalSelector.classList.add('is-show');

      setTimeout(() => {
        modalSelector.classList.add('is-active');
      }, 25);
    }, 1);
  }, [lastModal?.name, modal]);

  useEffect(() => {
    const body = document.body;

    if (modal.length > 0) return body.classList.add('has-none-scroll');
  }, [modal]);

  // Close the modal when the ESC key is pressed
  useEffect(() => {
    if (modal.length === 0) return;

    const handleKeyDown = (e: any) => {
      if (e.key === 'Escape') handleCloseModal(lastModal?.name);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal, lastModal?.name, modal]);

  useOnClickOutside(refInner, () => handleCloseModal(lastModal?.name));

  if (modal.length === 0) return;

  return (
    <div className="modal">
      {modal.map((item, index) => {
        const m = modalData.find((m) => m.name === item.name);

        if (!m) return;

        return (
          <div
            key={index}
            className="modal__item"
            role="dialog"
            aria-label={m.name}
            data-modal={m.name}
          >
            <div ref={refInner} className="modal__inner">
              <m.element close={() => handleCloseModal(m.name)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Modal;
