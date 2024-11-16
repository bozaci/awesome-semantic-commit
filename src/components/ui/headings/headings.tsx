'use client';

import { useState, useEffect, useRef, FC } from 'react';
import { HeadingsProps } from './headings.type';
import posthog from 'posthog-js';

import './headings.scss';

const Headings: FC<HeadingsProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState<number>(0);

  const handleLogging = () => {
    if (clickCount >= 1) return;

    setClickCount((value) => value + 1);
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') posthog.capture('headings-inner-click');
  };

  const handleScroll = (e: Event) => {
    const window = e.currentTarget as Window;
    const scrollY = window.scrollY;

    if (scrollY > 125) {
      ref.current?.classList.add('is-active');
    } else {
      ref.current?.classList.remove('is-active');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div ref={ref} className="headings hidden@mobile">
      <div onClick={handleLogging} className="headings__inner">
        {data.map((item, index) => (
          <a key={index} href={item.href} className="headings__item" aria-label={item.title}>
            <div className="headings__circle"></div>
            <p className="headings__text">{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Headings;
