'use client';

import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTranslations } from 'next-intl';
import { openModal } from '@/modals/utils/modalHooks';
import Config from '@/config.json';

import Logo from '@/components/ui/logo';
import LinkComp from '@/components/ui/link';
import SocialMedia from '@/components/ui/social-media/social-media';
import Transition from '@/components/ui/transition';

import './footer.scss';

const socialMediaData = [
  {
    name: 'Twitter',
    href: Config.twitter,
    icon: faTwitter,
    isWithText: true,
  },
  {
    name: 'Github',
    href: Config.github,
    icon: faGithub,
    isWithText: true,
  },
];

const Footer = () => {
  const t = useTranslations();
  const navigationData = [
    {
      name: t('general.resourcesUtilised'),
      onClick: () => openModal({ name: 'resources-utilised' }),
    },
    {
      name: t('general.disclaimer'),
      onClick: () => openModal({ name: 'disclaimer' }),
    },
  ];

  return (
    <footer className="footer">
      <Transition>
        <div className="container container--medium centered-elements">
          <Logo theme="black" />
          <p className="footer__text mt-2">
            {t('footer.text')} {''}
            <LinkComp href="https://github.com/bozaci/awesome-semantic-commit" isExternalLink>
              {t('general.contribute')}
            </LinkComp>
          </p>

          {navigationData.length > 0 && (
            <ul className="footer__navigation">
              {navigationData.map((item, index) => (
                <li key={index} onClick={item.onClick} className="footer__navigation-item">
                  <p className="footer__navigation-text">{item.name}</p>
                </li>
              ))}
            </ul>
          )}

          <SocialMedia data={socialMediaData} theme="ghost-gray" />
        </div>
      </Transition>
    </footer>
  );
};

export default Footer;
