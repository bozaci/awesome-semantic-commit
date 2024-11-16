import { useTranslations } from 'next-intl';

import HeadingTitle from '@/components/ui/heading-title';
import Box from '@/components/ui/box';
import Badge from '@/components/ui/badge';

const CommitMessageType = () => {
  const t = useTranslations('commitMessageType');
  const generalT = useTranslations('general');

  return (
    <section className="commit-message-type scroll-margin-top-medium" id="commit-message-structure">
      <div className="container">
        <HeadingTitle text={t('title')} />
        <Box>
          <Box.Group>
            <Box.Text>{t('text')}</Box.Text>
          </Box.Group>

          <Box.Group>
            <Box.Title>{t('items.itemOne.title')}</Box.Title>
            <Box.Text>{t('items.itemOne.text')}</Box.Text>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">feat</Badge>
              <Box.Text>{t('items.itemOne.featText')}</Box.Text>
            </div>

            <div className="d-flex flex-column f">
              <Badge theme="ghost-primary">fix</Badge>
              <Box.Text>{t('items.itemOne.fixText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">docs</Badge>
              <Box.Text>{t('items.itemOne.docsText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">style</Badge>
              <Box.Text>{t('items.itemOne.styleText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">chore</Badge>
              <Box.Text>{t('items.itemOne.choreText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">refactor</Badge>
              <Box.Text>{t('items.itemOne.refactorText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">test</Badge>
              <Box.Text>{t('items.itemOne.testText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">perf</Badge>
              <Box.Text>{t('items.itemOne.perfText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">ci</Badge>
              <Box.Text>{t('items.itemOne.ciText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">build</Badge>
              <Box.Text>{t('items.itemOne.buildText')}</Box.Text>
            </div>

            <div className="d-flex flex-column">
              <Badge theme="ghost-primary">revert</Badge>
              <Box.Text>{t('items.itemOne.revertText')}</Box.Text>
            </div>
          </Box.Group>

          <Box.Group>
            <Box.Title className="d-flex align-items-center">
              {t('items.itemTwo.title')}
              <Badge theme="ghost-gray" size="small" className="ms-1" isRounded>
                {generalT('optional')}
              </Badge>
            </Box.Title>
            <Box.Text>{t('items.itemTwo.text')}</Box.Text>
          </Box.Group>

          <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
            <Badge theme="ghost-primary">feat(auth)</Badge>,
            <Badge theme="ghost-primary">fix(ui)</Badge>,
            <Badge theme="ghost-primary">docs(readme)</Badge>,
            <Badge theme="ghost-primary">style(header)</Badge>,
            <Badge theme="ghost-primary">chore(deps)</Badge>,
            <Badge theme="ghost-primary">refactor(api)</Badge>,
            <Badge theme="ghost-primary">test(login)</Badge>,
            <Badge theme="ghost-primary">perf(image-loader)</Badge>,
            <Badge theme="ghost-primary">ci(travis)</Badge>,
            <Badge theme="ghost-primary">build(webpack)</Badge>,
            <Badge theme="ghost-primary">revert(api)</Badge>
          </Box.Group>

          <Box.Group>
            <Box.Title>{t('items.itemThree.title')}</Box.Title>
            <Box.Text>{t('items.itemThree.text')}</Box.Text>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <Badge theme="ghost-primary">feat(auth): add login functionality</Badge>
            <Badge theme="ghost-primary">fix(ui): resolve button alignment issue</Badge>
            <Badge theme="ghost-primary">docs(readme): update installation instructions</Badge>
            <Badge theme="ghost-primary">style(header): fix indentation</Badge>
            <Badge theme="ghost-primary">chore(deps): update axios to v0.21.1</Badge>
            <Badge theme="ghost-primary">refactor(api): optimize fetch method</Badge>
            <Badge theme="ghost-primary">test(login): add unit tests for login function</Badge>
            <Badge theme="ghost-primary">
              perf(image-loader): optimize image loading for faster page speed
            </Badge>
            <Badge theme="ghost-primary">ci(travis): add deployment step to pipeline</Badge>
            <Badge theme="ghost-primary">
              build(webpack): update webpack configuration for faster builds
            </Badge>
            <Badge theme="ghost-primary">
              revert(api): revert API changes that caused issues with data fetching
            </Badge>
          </Box.Group>
        </Box>
      </div>
    </section>
  );
};

export default CommitMessageType;
