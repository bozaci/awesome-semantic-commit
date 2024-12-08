'use client';

import { useTranslations } from 'next-intl';
import Config from '@/config.json';

import ModalHeader from '@/components/shared/modal/modal-header';
import ModalBody from '@/components/shared/modal/modal-body';

import LinkComp from '@/components/ui/link';

const ResourcesUtilisedModal = ({ close }: { close: any }) => {
  const t = useTranslations('modal.resourcesUtilised');

  return (
    <>
      <ModalHeader title={t('title')} closeOnClick={close} />
      <ModalBody>
        <p className="modal__text is-with-spacing">{t('text')}</p>
        <p className="modal__text is-with-spacing">{t('textTwo')}</p>

        {Config.resourcesUtilised.length > 0 && (
          <ul className="modal__list is-with-spacing">
            {Config.resourcesUtilised.map((item, index) => (
              <li key={index} className="modal__list-item">
                <LinkComp
                  href={item.href}
                  variant="gray"
                  size="medium"
                  className="modal__text"
                  isExternalLink
                >
                  {item.name}
                </LinkComp>
              </li>
            ))}
          </ul>
        )}
      </ModalBody>
    </>
  );
};

export default ResourcesUtilisedModal;
