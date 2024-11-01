'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { projects } from '@/data/projectsList';
import Config from '@/config.json';

import HeadingTitle from '@/components/ui/heading-title';
import ProjectCard from '@/components/ui/project-card';
import Button from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import Transition from '@/components/ui/transition';

const ProjectsUsingSemanticCommit = () => {
  const [maxShowProjects, setMaxShowProjects] = useState(Config.maxShowProjects);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);
  const t = useTranslations('projectsUsingSemanticCommit');
  const generalT = useTranslations('general');
  const sortedProjects = projects.sort((a, b) => {
    const featuredA = Number(a.featured) ?? 0;
    const featuredB = Number(b.featured) ?? 0;

    return featuredB - featuredA;
  });
  const filteredProjects = sortedProjects.slice(0, maxShowProjects);

  const handleLoadMoreProject = () => {
    setIsLoadingProjects(true);

    setTimeout(() => {
      setMaxShowProjects((value) => value + Config.maxShowProjects);
      setIsLoadingProjects(false);
    }, 1000);
  };

  return (
    <section className="projects-using-semantic-commit">
      <div className="container">
        <HeadingTitle text={t('title')} />

        <Transition>
          <div className="row g-3 g-lg-4">
            {projects.length > 0 &&
              filteredProjects.map((project, index) => (
                <div key={index} className="col-xs-6 col-sm-6 col-md-6 col-lg-4">
                  <ProjectCard data={project} />
                </div>
              ))}
          </div>
        </Transition>

        {projects.length > Config.maxShowProjects && (
          <Transition>
            <div className="centered-elements mt-3">
              {projects.length > maxShowProjects ? (
                <Button
                  onClick={handleLoadMoreProject}
                  theme="ghost-gray"
                  size="default"
                  sizeAsFont="small"
                  rounded
                  disabled={isLoadingProjects}
                >
                  {isLoadingProjects ? (
                    <>
                      <Loader size="small" />
                      <span className="ms-1">{generalT('loadingProjects')}</span>
                    </>
                  ) : (
                    <>{generalT('loadMoreProject')}</>
                  )}
                </Button>
              ) : (
                <p className="section-text section-text--small">{generalT('reachedProjects')}</p>
              )}
            </div>
          </Transition>
        )}
      </div>
    </section>
  );
};

export default ProjectsUsingSemanticCommit;
