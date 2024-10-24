import { useTranslations } from 'next-intl';

import HeadingTitle from '@/components/ui/heading-title';
import FAQCard from '@/components/ui/faq-card';
import Transition from '@/components/ui/transition';

const CommitGeneratorFAQ = () => {
  const t = useTranslations('commitGeneratorFAQ');
  const FAQData = [
    {
      title: t('items.itemOne.title'),
      content: `
        <p class="faq-card__text">${t('items.itemOne.text')}</p>
      `,
    },
    {
      title: t('items.itemTwo.title'),
      content: `
        <p class="faq-card__text mb-2">${t('items.itemTwo.text')}</p>
        <ul class="faq-card__list spacing spacing--xsmall-y">
          <li class="faq-card__list-item">
            <p class="faq-card__text"><span class="text-medium">${t('items.itemTwo.list.listItemOne.title')}</span> ${t('items.itemTwo.list.listItemOne.text')}</p>
          </li>
  
          <li class="faq-card__list-item">
            <p class="faq-card__text"><span class="text-medium">${t('items.itemTwo.list.listItemTwo.title')}</span> ${t('items.itemTwo.list.listItemTwo.text')}</p>
          </li>
  
          <li class="faq-card__list-item">
            <p class="faq-card__text"><span class="text-medium">${t('items.itemTwo.list.listItemThree.title')}</span> ${t('items.itemTwo.list.listItemThree.text')}</p>
          </li>
        </ul>
        <p class="faq-card__text mt-2">${t('items.itemTwo.textTwo')}</p>
      `,
    },
  ];

  return (
    <section className="commit-generator-faq">
      <div className="container">
        <HeadingTitle text={t('title')} />

        <div className="faq__main row g-2 g-lg-3">
          {FAQData.length > 0 &&
            FAQData.map((item, index) => (
              <div key={index} className="col-lg-6">
                <Transition>
                  <FAQCard data={item} />
                </Transition>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CommitGeneratorFAQ;
