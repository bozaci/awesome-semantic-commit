import { XCircle } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import HeadingTitle from '@/components/ui/heading-title';
import Box from '@/components/ui/box';
import Badge from '@/components/ui/badge';

const HowToNotUse = () => {
  const t = useTranslations('howToNotUse');
  const generalT = useTranslations('general');

  return (
    <section className="commit-message-type scroll-margin-top-medium" id="how-to-not-use">
      <div className="container">
        <HeadingTitle text={t('title')} />
        <Box>
          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemOne.title')}</Box.Title>
              <Box.Text>{t('items.itemOne.text')}</Box.Text>
            </Box.Group>

            <Box.Text>{t('items.itemOne.textTwo')}</Box.Text>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="red" className="me-1">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('wrongUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">eklenen özellik</Badge>,
              <Badge theme="ghost-primary">güncellenen sayfa</Badge>,
              <Badge theme="ghost-primary">değiştirilen kod</Badge>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="green" className="me-1">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('correctUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">feat: add new search feature</Badge>,
              <Badge theme="ghost-primary">fix: update login page</Badge>,
              <Badge theme="ghost-primary">refactor: improve validation logic</Badge>
            </Box.Group>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemTwo.title')}</Box.Title>
              <Box.Text>{t('items.itemTwo.text')}</Box.Text>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="red">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('wrongUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">feat: added new button</Badge>,
              <Badge theme="ghost-primary">fix: updated validation</Badge>,
              <Badge theme="ghost-primary">refactor: changed structure</Badge>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="green">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('correctUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">feat: add new button</Badge>,
              <Badge theme="ghost-primary">fix: improve validation logic</Badge>,
              <Badge theme="ghost-primary">refactor: change component structure</Badge>
            </Box.Group>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemThree.title')}</Box.Title>
              <Box.Text>{t('items.itemThree.text')}</Box.Text>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="red">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('wrongUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">fix: add user authentication</Badge>,
              <Badge theme="ghost-primary">feat: fix payment gateway issue</Badge>,
              <Badge theme="ghost-primary">fix: optimize the code</Badge>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="green">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('correctUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">feat: add user authentication</Badge>,
              <Badge theme="ghost-primary">fix: payment gateway issue</Badge>,
              <Badge theme="ghost-primary">refactor: optimize the code</Badge>
            </Box.Group>
          </Box.Group>

          <Box.Group className="spacing spacing--xsmall-y">
            <Box.Group>
              <Box.Title>{t('items.itemFour.title')}</Box.Title>
              <Box.Text>{t('items.itemFour.text')}</Box.Text>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="red">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('wrongUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">FEAT: NEW LOGIN SYSTEM IMPLEMENTED!!!</Badge>,
              <Badge theme="ghost-primary">FIX: NULL POINTER EXCEPTION FIXED</Badge>,
              <Badge theme="ghost-primary">REFACTOR: IMPROVED CODE PERFORMANCE!!!</Badge>
            </Box.Group>

            <Box.Group className="d-flex align-items-center">
              <Box.Icon color="green">
                <XCircle />
              </Box.Icon>
              <Box.Text>
                <span className="text-medium">{generalT('correctUsage')}</span>:
              </Box.Text>
            </Box.Group>
            <Box.Group className="d-inline-flex flex-wrap align-items-center spacing spacing--xsmall">
              <Badge theme="ghost-primary">feat: implement new login system</Badge>,
              <Badge theme="ghost-primary">fix: resolve null pointer exception</Badge>,
              <Badge theme="ghost-primary">refactor: improve code performance</Badge>
            </Box.Group>
          </Box.Group>
        </Box>
      </div>
    </section>
  );
};

export default HowToNotUse;
