import { useTranslations } from 'next-intl';

import HeadingTitle from '@/components/ui/heading-title';
import Box from '@/components/ui/box';

const WhyImportant = () => {
  const t = useTranslations('whyImportant');

  return (
    <section className="why-important scroll-margin-top-medium" id="why-is-it-important">
      <div className="container">
        <HeadingTitle text={t('title')} />
        <Box>
          <Box.Group>
            <Box.Title>{t('items.itemOne.title')}</Box.Title>
            <Box.Text>{t('items.itemOne.text')}</Box.Text>
          </Box.Group>

          <Box.Group>
            <Box.Title>{t('items.itemTwo.title')}</Box.Title>
            <Box.Text>{t('items.itemTwo.text')}</Box.Text>
          </Box.Group>

          <Box.Group>
            <Box.Title>{t('items.itemThree.title')}</Box.Title>
            <Box.Text>{t('items.itemThree.text')}</Box.Text>
          </Box.Group>

          <Box.Group>
            <Box.Title>{t('items.itemFour.title')}</Box.Title>
            <Box.Text>{t('items.itemFour.text')}</Box.Text>
          </Box.Group>

          <Box.Group>
            <Box.Title>{t('items.itemFive.title')}</Box.Title>
            <Box.Text>{t('items.itemFive.text')}</Box.Text>
          </Box.Group>
        </Box>
      </div>
    </section>
  );
};

export default WhyImportant;
