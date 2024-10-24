import { useTranslations } from 'next-intl';

import HeadingTitle from '@/components/ui/heading-title';
import FAQCard from '@/components/ui/faq-card';
import Transition from '@/components/ui/transition';

const FAQ = () => {
  const t = useTranslations('faq');
  const FAQData = [
    {
      title: t('items.itemOne.title'),
      content: `
        <ul class="faq-card__list">
          <li class="faq-card__list-item">
            <p class="faq-card__text"><span class="text-medium">${t('items.itemOne.list.listItemOne.title')}</span>: ${t('items.itemOne.list.listItemOne.text')}</p>
          </li>
  
          <li class="faq-card__list-item">
            <p class="faq-card__text"><span class="text-medium">${t('items.itemOne.list.listItemTwo.title')}</span>: ${t('items.itemOne.list.listItemTwo.text')}</p>
          </li>
  
          <li class="faq-card__list-item">
            <p class="faq-card__text"><span class="text-medium">${t('items.itemOne.list.listItemThree.title')}</span>: ${t('items.itemOne.list.listItemThree.text')}</p>
          </li>
        </ul>
      `,
    },
    {
      title: t('items.itemTwo.title'),
      content: `
        <p class="faq-card__text">${t('items.itemTwo.text')}</p>
      `,
    },
    {
      title: t('items.itemThree.title'),
      content: `
        <p class="faq-card__text">${t('items.itemThree.text')}</p>
      `,
    },
    {
      title: t('items.itemFour.title'),
      content: `
        <ul class="faq-card__list">
          <li class="faq-card__list-item">
            <p class="faq-card__text">${t('items.itemFour.text')}</p>
          </li>
  
          <li class="faq-card__list-item flex-column">
            <p class="faq-card__text">${t('items.itemFour.textTwo')}</p>
            <span class="badge badge--theme-ghost-orange">git reset --soft HEAD~1</span>
            <p class="faq-card__text faq-card__text--small mt-1">${t('items.itemFour.textTwoSmall')}</p>
          </li>
  
          <li class="faq-card__list-item flex-column">
            <p class="faq-card__text">${t('items.itemFour.textThree')}</p>
            <span class="badge badge--theme-ghost-orange">git reset --hard HEAD~1</span>
            <p class="faq-card__text faq-card__text--small mt-1">${t('items.itemFour.textThreeSmall')}</p>
          </li>
  
          <li class="faq-card__list-item flex-column">
            <p class="faq-card__text">${t('items.itemFour.textFour')}</p>
            <span class="badge badge--theme-ghost-orange">git revert <commit_id></span>
            <p class="faq-card__text faq-card__text--small mt-1">${t('items.itemFour.textFourSmall')}</p>
          </li>
        </ul>
      `,
    },
    {
      title: t('items.itemFive.title'),
      content: `
        <p class="faq-card__text">${t('items.itemFive.text')}</p>
      `,
    },
    {
      title: t('items.itemSix.title'),
      content: `
        <p class="faq-card__text">${t('items.itemSix.text')}</p>
      `,
    },
  ];

  return (
    <section className="faq">
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

export default FAQ;
