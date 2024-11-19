'use client';

import { FC } from 'react';
import { ProjectCardProps } from './project-card.type';
import { Link } from '@phosphor-icons/react/dist/ssr';
import { normalizeWebsiteUrl } from '@/utils/normalizeWebsiteUrl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import cx from 'classnames';

import Tooltip from '../tooltip';
import Button from '@/components/ui/button';
import ButtonGroup from '@/components/ui/button-group';

import './project-card.scss';

const ProjectCard: FC<ProjectCardProps> = ({ data }) => {
  const { name, description, icon, website, githubRepo, level } = data;
  const t = useTranslations('projectsUsingSemanticCommit');

  return (
    <div className="project-card">
      <div className="project-card__head">
        <div className="project-card__logo">
          <Image src={icon} alt={name} width={48} height={48} className="project-card__logo-img" />
          <Tooltip
            position="top"
            responsive={{
              smallMobilePosition: 'top-left',
              mobilePosition: 'top-left',
              tabletPosition: 'top',
              laptopOrDesktopPosition: 'top',
            }}
            innerHeightCustomValue={50}
            content={`
              <p class="tooltip__text text-center">
                ${level === 'low' ? t('levelLowTooltipText') : ''}
                ${level === 'medium' ? t('levelMediumTooltipText') : ''}
                ${level === 'high' ? t('levelHighTooltipText') : ''}
              </p>
            `}
          >
            <span
              className={cx('project-card__level', {
                [`project-card__level--${level}`]: level,
              })}
            ></span>
          </Tooltip>
        </div>

        <div className="d-flex flex-column">
          <span className="project-card__title">{name}</span>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="project-card__link"
          >
            <div className="project-card__icon project-card__icon--link">
              <Link />
            </div>

            <p className="project-card__link-text">{normalizeWebsiteUrl(website)}</p>
          </a>
        </div>
      </div>

      <div className="project-card__body">
        <p className="project-card__text">{description}</p>
      </div>

      <div className="project-card__footer">
        <ButtonGroup radiusType="square">
          <Button href={website} theme="gray" size="medium" sizeAsFont="small" externalLink>
            Website
          </Button>

          <Button href={githubRepo} theme="gray" size="medium" sizeAsFont="small" externalLink>
            Github Repo
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProjectCard;
