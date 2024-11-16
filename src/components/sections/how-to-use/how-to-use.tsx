import { useTranslations } from 'next-intl';

import HeadingTitle from '@/components/ui/heading-title';
import Box from '@/components/ui/box';
import Badge from '@/components/ui/badge';

const HowToUse = () => {
  const t = useTranslations('howToUse');

  return (
    <section className="how-to-use scroll-margin-top-medium" id="how-to-use">
      <div className="container">
        <HeadingTitle text={t('title')} />
        <Box>
          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemOne.title')}</Box.Title>
              <Box.Text>{t('items.itemOne.text')}</Box.Text>
            </Box.Group>

            <Box.Text>{t('items.itemOne.textTwo')}</Box.Text>
            <Badge theme="ghost-orange">git add .</Badge>

            <Box.Text>{t('items.itemOne.textThree')}</Box.Text>
            <Badge theme="ghost-orange">git add {`<${t('items.itemOne.fileName')}>`}</Badge>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemTwo.title')}</Box.Title>
              <Box.Text>{t('items.itemTwo.text')}</Box.Text>
            </Box.Group>

            <Badge theme="ghost-orange">
              git commit -m {`"<${t('items.itemTwo.commitMessage')}>"`}
            </Badge>

            <Box.Text>{t('items.itemTwo.textTwo')}</Box.Text>
            <Box.List>
              <Box.ListItem>
                <Box.Text>
                  <span className="text-medium">{t('items.itemTwo.list.listItemOne.title')}</span>
                  :&nbsp;
                  {t('items.itemTwo.list.listItemOne.text')}
                </Box.Text>
              </Box.ListItem>
              <Box.ListItem>
                <Box.Text>
                  <span className="text-medium">{t('items.itemTwo.list.listItemTwo.title')}</span>
                  :&nbsp;
                  {t('items.itemTwo.list.listItemTwo.text')}
                </Box.Text>
              </Box.ListItem>
              <Box.ListItem>
                <Box.Text>
                  <span className="text-medium">{t('items.itemTwo.list.listItemThree.title')}</span>
                  :&nbsp;{t('items.itemTwo.list.listItemThree.text')}
                </Box.Text>
              </Box.ListItem>
            </Box.List>

            <Box.Text>{t('items.itemTwo.exampleCommit')}:</Box.Text>
            <Badge theme="ghost-orange">
              git commit -m {'"feat(auth): add user login functionality"'}
            </Badge>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemThree.title')}</Box.Title>
              <Box.Text>{t('items.itemThree.text')}</Box.Text>
            </Box.Group>

            <Badge theme="ghost-orange">
              git push origin {`<${t('items.itemThree.branchName')}>`}
            </Badge>

            <Box.Text>{t('items.itemThree.textTwo')}</Box.Text>
            <Badge theme="ghost-orange">git push origin main</Badge>
          </Box.Group>
        </Box>
      </div>
    </section>
  );
};

export default HowToUse;
