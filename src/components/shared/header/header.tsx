'use client';

import { useState, useEffect } from 'react';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useLocale } from 'next-intl';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Config from '@/config.json';

import Logo from '@/components/ui/logo';
import LanguageSwitcher from '@/components/ui/language-switcher';
import SocialMedia from '@/components/ui/social-media';
import DropdownMenu from '@/components/ui/dropdown-menu';
import { dataType } from '@/components/ui/dropdown-menu/dropdown-menu.type';

import './header.scss';

const socialMediaData = [
  {
    name: 'Twitter',
    href: Config.twitter,
    icon: faTwitter,
  },
  {
    name: 'Github',
    href: Config.github,
    icon: faGithub,
  },
];

const languages = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Türkçe',
    value: 'tr',
  },
];

const Header = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('general');
  const initialNavigationData = [
    {
      name: t('homePage'),
      value: 'home',
      onClick: () => router.push('/'),
      isSelected: pathname === '/',
    },
    {
      name: t('commitGenerator'),
      value: 'commit-generator',
      onClick: () => router.push('/commit-generator'),
      isSelected: pathname === '/commit-generator',
    },
  ];
  const [navigationData, setNavigationData] = useState<dataType[]>(initialNavigationData);
  const [selectedNavigationPage, setSelectedNavigationPage] = useState<string>('');

  useEffect(() => {
    if (pathname == '/') setSelectedNavigationPage(t('homePage'));
    if (pathname == '/commit-generator') setSelectedNavigationPage(t('commitGenerator'));

    setNavigationData(initialNavigationData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, pathname, t]);

  return (
    <header className="header">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-8 col-lg-6 d-flex align-items-center spacing spacing--small-x">
            <Logo theme="single" area="header-single" />

            <span className="header__brace">/</span>

            <div className="header__navigation">
              <DropdownMenu
                data={navigationData}
                settings={{ spacingFromTop: 0, spacingFromLeft: -11, closeOnSelect: true }}
              >
                <div className="header__navigation-inner">
                  <p className="header__navigation-text">{selectedNavigationPage}</p>

                  <div className="header__navigation-icon dropdown-menu__arrow-icon">
                    <CaretDown />
                  </div>
                </div>
              </DropdownMenu>
            </div>
          </div>

          <div className="col-4 col-lg-6 d-flex justify-content-end align-items-center">
            <SocialMedia data={socialMediaData} theme="ghost-dark" className="hidden--mobile" />
            <div className="header__horizontal-line hidden--mobile"></div>
            <LanguageSwitcher data={languages} defaultValue={locale} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
