'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { addProjectSchema } from '@/utils/schema';
import { useTranslations } from 'next-intl';
import { X, Check } from '@phosphor-icons/react/dist/ssr';
import { errorNotify } from '@/utils/notification';
import cx from 'classnames';

import ModalHeader from '@/components/shared/modal/modal-header';
import ModalBody from '@/components/shared/modal/modal-body';
import ModalFooter from '@/components/shared/modal/modal-footer';

import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import IconContainer from '@/components/ui/icon-container';

const AddProjectModal = ({ close }: { close: any }) => {
  const generalT = useTranslations('general');
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (values: any) => {
    const { name, logoURL, website, githubRepoURL, projectOwner } = values;

    setError('');
    setIsSuccess(false);
    setIsLoading(true);

    if (!name || !logoURL || !website || !githubRepoURL)
      return errorNotify(generalT('fillAllRequiredFields'));

    try {
      const response = await fetch('/api/add-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          logoURL,
          website,
          githubRepoURL,
          projectOwner,
        }),
      });

      if (!response?.ok) {
        setIsLoading(false);
        setError('Unable to add the project due to an API request failure.');
        return;
      }

      const data = await response.json();

      if (data?.status === 'error') {
        setIsLoading(false);
        setError(data.message);
        return;
      }

      setIsLoading(false);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAddingProject = () => {
    setError('');
    setIsSuccess(false);
    setIsLoading(false);
  };

  return (
    <>
      <ModalHeader title={generalT('addProjectTitle')} closeOnClick={close} />
      <ModalBody>
        {!error && !isSuccess && (
          <Formik
            initialValues={{
              name: '',
              logoURL: '',
              website: '',
              githubRepoURL: '',
              projectOwner: false,
            }}
            onSubmit={(values) => handleFormSubmit(values)}
            validationSchema={addProjectSchema(generalT)}
          >
            {({ values, errors, touched }) => (
              <Form className="form is-dark">
                <label className="form__group">
                  <span className="form__label">{generalT('projectName')}</span>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    component={Input}
                    as="input"
                    hasError={errors.name && touched.name}
                    isDark
                  />
                  {errors.name && touched.name && (
                    <p className="form__help-message form__help-message--error">{errors.name}</p>
                  )}
                </label>

                <label className="form__group">
                  <span className="form__label">{generalT('projectLogoURL')}</span>
                  <Field
                    id="logoURL"
                    name="logoURL"
                    type="text"
                    component={Input}
                    as="input"
                    hasError={errors.logoURL && touched.logoURL}
                    isDark
                  />
                  {errors.logoURL && touched.logoURL && (
                    <p className="form__help-message form__help-message--error">{errors.logoURL}</p>
                  )}
                </label>

                <label className="form__group">
                  <span className="form__label">{generalT('projectWebsite')}</span>
                  <Field
                    id="website"
                    name="website"
                    type="text"
                    component={Input}
                    as="input"
                    hasError={errors.website && touched.website}
                    isDark
                  />
                  {errors.website && touched.website && (
                    <p className="form__help-message form__help-message--error">{errors.website}</p>
                  )}
                </label>

                <label className="form__group">
                  <span className="form__label">{generalT('projectGithubRepoURL')}</span>
                  <Field
                    id="githubRepoURL"
                    name="githubRepoURL"
                    type="text"
                    component={Input}
                    as="input"
                    hasError={errors.githubRepoURL && touched.githubRepoURL}
                    isDark
                  />
                  {errors.githubRepoURL && touched.githubRepoURL && (
                    <p className="form__help-message form__help-message--error">
                      {errors.githubRepoURL}
                    </p>
                  )}
                </label>

                <label className="form__group">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center spacing spacing--xsmall-two">
                      <span className="form__label mb-0">{generalT('projectOwner')}</span>
                      <Badge theme="ghost-gray" size="small" isDark isRounded>
                        {generalT('optional')}
                      </Badge>
                    </div>

                    <Field id="projectOwner" name="projectOwner" component={Switch} isDark />
                  </div>
                </label>

                <ModalFooter isUsedInner>
                  <Button
                    theme="default"
                    size="medium"
                    type="submit"
                    className={cx({
                      'button--theme-primary': !isLoading,
                      'button--theme-gray': isLoading,
                    })}
                    disabled={
                      isLoading ||
                      !values.name ||
                      !values.logoURL ||
                      !values.website ||
                      !values.githubRepoURL
                        ? true
                        : false
                    }
                    fullWidth
                  >
                    {isLoading && <Loader theme="white" className="me-1" />}
                    {generalT('addProject')}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        )}
        {error && !isSuccess && (
          <div className="centered-elements py-3">
            <IconContainer
              size="medium"
              backgroundColor="#DD4949"
              icon={<X />}
              iconColor="#000000"
              hasRounded
              className="mb-3"
            />

            <span className="modal__title modal__title--medium">
              {generalT('addProjectErrorTitle')}
            </span>
            <p className="modal__text">{error}</p>

            <Button onClick={handleResetAddingProject} theme="gray" size="small" className="mt-3">
              {generalT('tryAgainAddProject')}
            </Button>
          </div>
        )}
        {isSuccess && !error && (
          <div className="centered-elements py-3">
            <IconContainer
              size="medium"
              backgroundColor="#49DD7F"
              icon={<Check />}
              iconColor="#000000"
              hasRounded
              className="mb-3"
            />

            <span className="modal__title modal__title--medium">
              {generalT('addProjectSuccessTitle')}
            </span>
            <p className="modal__text">{generalT('addProjectSuccessText')}</p>
          </div>
        )}
      </ModalBody>
    </>
  );
};

export default AddProjectModal;
