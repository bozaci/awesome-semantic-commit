import { FC } from 'react';
import { SocialMediaProps } from './social-media.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import './social-media.scss';

const SocialMedia: FC<SocialMediaProps> = ({ data, theme, className }) => {
  return (
    <div
      className={cx(
        'social-media',
        {
          [`social-media--theme-${theme}`]: theme,
        },
        className,
      )}
    >
      {data.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          className={cx('social-media__item', {
            'social-media__item--with-text': item.isWithText,
          })}
          aria-label={item.name}
        >
          <div className="social-media__icon">
            <FontAwesomeIcon icon={item.icon} />
          </div>
          {item.isWithText && <p className="social-media__text">{item.name}</p>}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
