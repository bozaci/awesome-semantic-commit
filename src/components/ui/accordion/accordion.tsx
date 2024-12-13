import { useState, useRef, FC } from 'react';
import { AccordionProps } from './accordion.type';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import './accordion.scss';

const Accordion: FC<AccordionProps> = ({ title, content, contentPaddingTop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleShowContent = () => {
    const innerHeight = contentInnerRef.current?.offsetHeight;

    if (!contentRef.current) return console.error(`Accordion: contentRef is not defined.`);
    if (show) {
      ref.current?.classList.remove('is-active');
      contentRef.current.style.height = '0px';
      setShow(false);

      return;
    }

    ref.current?.classList.add('is-active');
    contentRef.current.style.height = `${innerHeight}px`;
    setShow(true);
  };

  return (
    <div
      ref={ref}
      className="accordion"
      style={
        {
          '--accordion-content-padding-top': contentPaddingTop ? `${contentPaddingTop}px` : null,
        } as React.CSSProperties
      }
    >
      <div onClick={handleShowContent} className="accordion__inner">
        <span className="accordion__title">{title}</span>
        <div className="accordion__arrow-icon">
          <CaretDown />
        </div>
      </div>

      <div ref={contentRef} className="accordion__content" aria-hidden={!show}>
        <div ref={contentInnerRef} className="accordion__content-inner">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
