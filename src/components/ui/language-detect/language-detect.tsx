'use client';

import { useState, useEffect } from 'react';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/i18n/config';
import browserLang from 'browser-lang';
import Cookies from 'js-cookie';

import Announcement from '@/components/ui/announcement';

const LanguageDetect = () => {
  const [localeLang, setLocaleLang] = useState<any>('');
  const myLanguage = browserLang({
    languages: ['tr', 'en'],
    fallback: 'en',
  });

  const handleSwitchLang = (value: string) => {
    const locale = value as Locale;
    setUserLocale(locale);
  };

  useEffect(() => {
    const cookie = Cookies.get('NEXT_LOCALE');
    setLocaleLang(cookie);
  }, []);

  return (
    <>
      {localeLang === 'en' && myLanguage === 'tr' && (
        <Announcement
          text="Şu anda İngilizce diliyle görüntülüyorsunuz, dilerseniz Türkçe’ye geçiş yapabilirsiniz."
          buttonText="Türkçe'ye Geçiş Yap"
          buttonOnClick={() => handleSwitchLang('tr')}
          closeOnButtonClick
          useWithCookie
          isClosed
        />
      )}
      {localeLang === 'tr' && myLanguage === 'en' && (
        <Announcement
          text="You are currently viewing in Turkish, if you wish, you can switch to English."
          buttonText="Switch to English"
          useWithCookie
          isClosed
        />
      )}
    </>
  );
};

export default LanguageDetect;
