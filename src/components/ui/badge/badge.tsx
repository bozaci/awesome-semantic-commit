'use client';

import { useState, FC } from 'react';
import { BadgeProps } from './badge.type';
import { useCopyToClipboard } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import cx from 'classnames';

import './badge.scss';

const Badge: FC<BadgeProps> = ({
  theme = 'ghost-primary',
  size = 'default',
  icon,
  iconAlign,
  copyText,
  useWithCopyClipboard,
  isRounded,
  isDark,
  className,
  children,
}) => {
  const generalT = useTranslations('general');
  const [, copy] = useCopyToClipboard();
  const [copyClipboardText, setCopyClipboardText] = useState<string>(generalT('copy'));

  const handleCopyText = (text: string) => {
    copy(text)
      .then(() => {
        setCopyClipboardText(generalT('copied'));
        setTimeout(() => {
          setCopyClipboardText(generalT('copy'));
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span
      className={cx(
        'badge',
        {
          [`badge--theme-${theme}`]: theme,
          [`badge--size-${size}`]: size,
          'badge--with-copy-clipboard': useWithCopyClipboard,
          'has-rounded': isRounded,
          'is-dark': isDark,
        },
        className,
      )}
    >
      {iconAlign === 'left' && <div className="badge__icon badge__icon--align-left">{icon}</div>}
      {children}
      {iconAlign === 'right' && <div className="badge__icon badge__icon--align-right">{icon}</div>}
      {useWithCopyClipboard && (
        <span onClick={() => handleCopyText(copyText || '')} className="badge__copy-button">
          {copyClipboardText}
        </span>
      )}
    </span>
  );
};

export default Badge;
