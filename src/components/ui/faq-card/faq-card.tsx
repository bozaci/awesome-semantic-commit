'use client';

import { useRef, FC } from 'react';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { FAQCardProps } from './faq-card.type';

import './faq-card.scss';

const FAQCard: FC<FAQCardProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const { title, content } = data;

  const handleToggle = () => {
    const allFAQCard = document.querySelectorAll('.faq-card');
    const heightContent = contentInnerRef.current?.offsetHeight;
    const isActive = ref.current?.classList.contains('is-active');

    if (isActive) {
      ref.current?.classList.remove('is-active');

      if (contentRef.current) {
        contentRef.current.style.height = '0px';
        contentRef.current.setAttribute('aria-hidden', 'false');
      }

      return;
    }

    allFAQCard.forEach((item) => {
      const content = item.childNodes[1] as HTMLElement;

      item.classList.remove('is-active');
      content.style.height = '0px';
      content.setAttribute('aria-hidden', 'false');
    });

    ref.current?.classList.add('is-active');
    if (contentRef.current) {
      contentRef.current.style.height = `${heightContent}px`;
      contentRef.current.setAttribute('aria-hidden', 'true');
    }
  };

  return (
    <div
      ref={ref}
      className="faq-card"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <div onClick={handleToggle} className="faq-card__header">
        <span className="faq-card__title" itemProp="name">
          {title}
        </span>

        <div className="faq-card__arrow-icon">
          <CaretDown />
        </div>
      </div>

      <div
        ref={contentRef}
        className="faq-card__main"
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        aria-hidden={true}
      >
        <div
          ref={contentInnerRef}
          className="faq-card__main-inner"
          dangerouslySetInnerHTML={{ __html: content }}
          itemProp="text"
        ></div>
      </div>
    </div>
  );
};

export default FAQCard;
