import { useState, useEffect, useRef, FC } from 'react';
import { AnnouncementProps } from './announcement.type';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import Button from '@/components/ui/button';
import './announcement.scss';

const Announcement: FC<AnnouncementProps> = ({
  text,
  buttonText,
  buttonOnClick,
  closeOnButtonClick,
  useWithCookie,
  isClosed,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elHeight, setElHeight] = useState<number>(50);
  const [cookieValue, setCookieValue] = useLocalStorage('announcementClosed', false);
  const isLaptopOrDesktop = useMediaQuery('(min-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 992px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 576px)');

  const handleClose = () => {
    setElHeight(0);

    setTimeout(() => {
      ref.current?.classList.add('has-closed');
      if (useWithCookie) setCookieValue(true);
    }, 425);
  };

  const handleButtonOnClick = () => {
    if (closeOnButtonClick) handleClose();

    buttonOnClick();
  };

  // Responsive queries
  useEffect(() => {
    if (isSmallMobile) return setElHeight(120);
    if (isMobile) return setElHeight(100);
    if (isTablet) return setElHeight(75);
    if (isLaptopOrDesktop) return setElHeight(50);
  }, [isSmallMobile, isMobile, isTablet, isLaptopOrDesktop]);

  return (
    <>
      {cookieValue === false && (
        <>
          <div ref={ref} className="announcement" style={{ height: `${elHeight}px` }}>
            <div className="container">
              <div className="row g-2 g-xl-4 align-items-center">
                <div className="col-lg-8 text-center@mobile-or-tablet">
                  <p className="announcement__text">{text}</p>
                </div>

                <div className="col-lg-4 d-flex justify-content-center justify-content-lg-end align-items-center">
                  {buttonText && (
                    <Button onClick={handleButtonOnClick} theme="white" size="small">
                      {buttonText}
                    </Button>
                  )}
                  {isClosed && (
                    <div onClick={handleClose} className="announcement__close">
                      <X />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Announcement;
