'use client';

import { useTranslations } from 'next-intl';

import ModalHeader from '@/components/shared/modal/modal-header';
import ModalBody from '@/components/shared/modal/modal-body';

const DisclaimerModal = ({ close }: { close: any }) => {
  const t = useTranslations('modal.disclaimer');

  return (
    <>
      <ModalHeader title={t('title')} closeOnClick={close} />
      <ModalBody>
        <p className="modal__text is-with-spacing">{t('text')}</p>

        <span className="modal__title modal__title--small is-with-spacing">Posthog</span>
        <p className="modal__text">{t('postHogText')}</p>

        <span className="modal__title modal__title--small is-with-spacing">Sentry</span>
        <p className="modal__text">{t('sentryText')}</p>

        <span className="modal__title modal__title--small is-with-spacing">Vercel Analytics</span>
        <p className="modal__text">{t('vercelAnalyticsText')}</p>

        <p className="modal__text is-with-spacing">{t('textTwo')}</p>
        <p className="modal__text is-with-spacing">{t('textThree')}</p>
      </ModalBody>
    </>
  );
};

export default DisclaimerModal;
