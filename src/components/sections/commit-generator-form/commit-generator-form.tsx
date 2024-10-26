'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Formik, Form, Field } from 'formik';
import { Info, FloppyDisk } from '@phosphor-icons/react/dist/ssr';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { commitGeneratorSchema } from '@/utils/schema';
import { commitGeneratePrompt, commitTypes } from '@/utils/constants';
import { useLocalStorage } from 'usehooks-ts';
import { errorNotify, successNotify } from '@/utils/notification';
import { track } from '@vercel/analytics/react';
import cx from 'classnames';

import Box from '@/components/ui/box';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';
import Badge from '@/components/ui/badge';
import Tooltip from '@/components/ui/tooltip';
import Button from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import SelectMenu from '@/components/ui/select-menu';

const CommitGeneratorForm = () => {
  const [animationParent] = useAutoAnimate();
  const generalT = useTranslations('general');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAIEnabled, setIsAIEnabled] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [typeData, setTypeData] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [apiKeyInLocalStorage, setApiKeyInLocalStorage] = useLocalStorage('googleGeminiApiKey', '');
  const [generationMethod, setGenerationMethod] = useState<string>('');
  const commitMessageWithGitCopyText = `git add .
git commit -m "${commitMessage}"
git push origin main`;

  const handleFormSubmit = async (values: any) => {
    const { type, scope, subject, summary, googleGeminiApiKey, generateWithScope, generateWithAI } =
      values;

    setError('');
    setCommitMessage('');
    setIsLoading(true);
    setGenerationMethod('');

    // Generate as Manuel
    if (!generateWithAI && (type || subject)) {
      setCommitMessage(
        scope ? `${selectedType}(${scope}): ${subject}` : `${selectedType}: ${subject}`,
      );

      setTimeout(() => {
        setIsLoading(false);
        setIsCompleted(true);
        setGenerationMethod('manual');
        track('Manual Commit Generation', {}, { flags: ['manual-commit-generation'] });
      }, 1000);
    }

    // Generate with AI
    if (generateWithAI && (summary || googleGeminiApiKey)) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleGeminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: commitGeneratePrompt(summary) }],
                },
              ],
            }),
          },
        );
        const data = await response.json();
        setGenerationMethod('ai');

        if (data?.error) {
          setError(data.error.message);
          setIsLoading(false);
          setIsCompleted(true);
          return;
        }

        const replacedCommitData = data.candidates[0].content.parts[0].text
          .replace(/```json\s*/g, '')
          .replace(/```/g, '')
          .replace(/'/g, '"');
        const parsedCommitData = JSON.parse(replacedCommitData);

        setIsLoading(false);
        setIsCompleted(true);
        setCommitMessage(
          generateWithScope ? parsedCommitData.contentWithScope : parsedCommitData.content,
        );
        track('AI Commit Generation', {}, { flags: ['ai-commit-generation'] });
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
        setIsCompleted(true);
        console.error(error);
      }
    }
  };

  const handleResetCommitGenerate = () => {
    if (generationMethod === 'manual') setIsAIEnabled(false);
    if (generationMethod === 'ai') setIsAIEnabled(true);

    setIsCompleted(false);
    setIsLoading(false);
    setCommitMessage('');
  };

  const handleSaveAPIKey = (googleGeminiApiKey: string) => {
    if (!googleGeminiApiKey) return errorNotify(generalT('saveAPIKeyErrorMessage'));
    if (googleGeminiApiKey === apiKeyInLocalStorage)
      return errorNotify(generalT('saveAPIKeyAlreadyMessage'));

    setApiKeyInLocalStorage(googleGeminiApiKey);
    successNotify(generalT('saveAPIKeySuccessMessage'));
  };

  useEffect(() => {
    const formattedCommitTypes: any[] = [];

    commitTypes.forEach((item, index) => {
      const newData = {
        name: item,
        value: item,
        isSelected: index === 0,
      };
      formattedCommitTypes.push(newData);
    });

    setTypeData(formattedCommitTypes);
    setSelectedType(formattedCommitTypes[0]?.name);
  }, []);

  useEffect(() => {
    if (!typeData) return;

    const selected = typeData.filter((item) => item.isSelected);
    setSelectedType(selected[0]?.name);
  }, [typeData]);

  return (
    <section className="commit-generator-form">
      <div className="container">
        <Box
          className={cx({
            'overflow-initial': !isCompleted,
          })}
        >
          {isCompleted ? (
            <>
              {!error && commitMessage ? (
                <>
                  <Box.Title size="medium" className="text-dark-green">
                    {generalT('generateCommitSuccessTitle')}
                  </Box.Title>
                  <Box.Line />
                  <Box.Group className="spacing spacing--xsmall-y">
                    <Box.Title>{generalT('semanticCommitMessage')}</Box.Title>
                    <Badge
                      theme="dashed-orange"
                      size="medium"
                      copyText={commitMessage}
                      useWithCopyClipboard
                    >
                      {commitMessage}
                    </Badge>
                  </Box.Group>
                  <Box.Group>
                    <Box.Text>{generalT('or')}</Box.Text>
                  </Box.Group>
                  <Box.Group>
                    <Box.Title>{generalT('semanticCommitWithGit')}</Box.Title>
                    <Box.Text>{generalT('semanticCommitCopyCode')}</Box.Text>

                    <Box.Group className="mt-1">
                      <Badge
                        theme="dashed-orange"
                        size="medium"
                        copyText={commitMessageWithGitCopyText}
                        useWithCopyClipboard
                      >
                        git add . <br />
                        git commit -m &quot;{commitMessage}&quot; <br />
                        git push origin main
                      </Badge>
                    </Box.Group>
                  </Box.Group>
                  <Box.Group>
                    <Button onClick={handleResetCommitGenerate} theme="primary" size="small">
                      {generalT('generateCommitAgain')}
                    </Button>
                  </Box.Group>
                </>
              ) : (
                <>
                  <Box.Title size="medium" className="text-red">
                    {generalT('generateCommitErrorTitle')}
                  </Box.Title>
                  <Box.Line />
                  <Box.Group>
                    <Box.Text>{error}</Box.Text>
                  </Box.Group>
                  <Box.Group>
                    <Button onClick={handleResetCommitGenerate} theme="primary" size="small">
                      {generalT('generateCommitAgain')}
                    </Button>
                  </Box.Group>
                </>
              )}
            </>
          ) : (
            <Formik
              initialValues={{
                type: selectedType,
                scope: '',
                subject: '',
                summary: '',
                googleGeminiApiKey: apiKeyInLocalStorage,
                generateWithScope: true,
                generateWithAI: isAIEnabled,
              }}
              onSubmit={(values) => handleFormSubmit(values)}
              validationSchema={commitGeneratorSchema(generalT)}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ values, errors, touched }) => (
                <Form ref={animationParent} className="form">
                  {!values.generateWithAI ? (
                    <>
                      <label className="form__group">
                        <span className="form__label">
                          {' '}
                          <span className="text-red">*</span>
                          &nbsp;{generalT('type')}
                        </span>
                        <Field
                          id="type"
                          name="type"
                          type="text"
                          component={SelectMenu}
                          options={typeData}
                          setOptions={setTypeData}
                        />
                        {errors.type && touched.type && (
                          <p className="form__help-message form__help-message--error">
                            {errors.type}
                          </p>
                        )}
                      </label>

                      <label className="form__group">
                        <span className="form__label d-flex align-items-center spacing spacing--xsmall-x">
                          <p>{generalT('scope')}</p>
                          <Badge theme="ghost-gray" size="small" iconAlign="right" isRounded>
                            {generalT('optional')}
                          </Badge>
                        </span>
                        <Field
                          id="scope"
                          name="scope"
                          type="text"
                          component={Input}
                          as="input"
                          hasError={errors.scope && touched.scope}
                        />
                        {errors.scope && touched.scope && (
                          <p className="form__help-message form__help-message--error">
                            {errors.scope}
                          </p>
                        )}
                      </label>

                      <label className="form__group">
                        <p className="form__label">
                          <span className="text-red">*</span>
                          &nbsp;
                          {generalT('subject')}
                        </p>
                        <Field
                          id="subject"
                          name="subject"
                          type="text"
                          component={Input}
                          as="input"
                          hasError={errors.subject && touched.subject}
                        />
                        {errors.subject && touched.subject && (
                          <p className="form__help-message form__help-message--error">
                            {errors.subject}
                          </p>
                        )}
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="form__group">
                        <p className="form__label d-flex align-items-center">
                          <span className="text-red">*</span>
                          &nbsp;
                          {generalT('summary')}
                          <Tooltip
                            position="top"
                            content={`<p class="tooltip__text">${generalT('summaryTooltip')}</p>`}
                          >
                            <Info className="ms-1" />
                          </Tooltip>
                        </p>
                        <Field
                          id="summary"
                          name="summary"
                          type="text"
                          component={Input}
                          as="input"
                          hasError={errors.summary && touched.summary}
                        />
                        {errors.summary && touched.summary && (
                          <p className="form__help-message form__help-message--error">
                            {errors.summary}
                          </p>
                        )}
                      </label>

                      <label className="form__group">
                        <p className="form__label">
                          <span className="text-red">*</span>
                          &nbsp;Google Gemini API Key
                        </p>
                        <Field
                          id="googleGeminiApiKey"
                          name="googleGeminiApiKey"
                          type="text"
                          component={Input}
                          buttons={[
                            {
                              icon: <FloppyDisk />,
                              name: 'Save API Key',
                              tooltipText: generalT('saveAPIKeyTooltip'),
                              onClick: () => handleSaveAPIKey(values.googleGeminiApiKey),
                            },
                          ]}
                          as="input"
                          hasError={errors.googleGeminiApiKey && touched.googleGeminiApiKey}
                        />
                        {errors.googleGeminiApiKey && touched.googleGeminiApiKey && (
                          <p className="form__help-message form__help-message--error">
                            {errors.googleGeminiApiKey}
                          </p>
                        )}
                      </label>

                      <div className="form__group">
                        <label className="form__group form__group--row form__group--between flex-wrap spacing spacing--xsmall-two">
                          <div className="d-flex flex-wrap align-items-center spacing spacing--xsmall-two">
                            <p className="form__label mb-0">{generalT('generateWithScope')}</p>
                            <Badge theme="ghost-gray" size="small" isRounded>
                              {generalT('optional')}
                            </Badge>
                          </div>

                          <div className="d-flex justify-content-end align-items-center">
                            <Field
                              id="generateWithScope"
                              name="generateWithScope"
                              component={Switch}
                            />
                          </div>
                        </label>
                      </div>
                    </>
                  )}

                  <div className="form__group">
                    <label className="form__group form__group--row form__group--between flex-wrap spacing spacing--xsmall-two">
                      <div className="d-flex flex-wrap align-items-center spacing spacing--xsmall-two">
                        <p className="form__label mb-0">{generalT('generateWithAI')}</p>
                        <Badge
                          theme="ghost-gray"
                          size="small"
                          icon={
                            <Tooltip
                              position="top"
                              content={`
                              <div class="tooltip__item">
                                <p class="tooltip__text">${generalT('generateWithAITooltipText')}</p>
                              </div>
                                
                              <div class="tooltip__item">
                                <span class="tooltip__text text-uppercase text-medium text-light-red">${generalT('information')}</span>
                                <p class="tooltip__text">${generalT('generateWithAITooltipTextTwo')}</p>
                              </div>
                              `}
                            >
                              <Info />
                            </Tooltip>
                          }
                          iconAlign="right"
                          isRounded
                        >
                          {generalT('optional')}
                        </Badge>
                      </div>

                      <div className="d-flex justify-content-end align-items-center">
                        <Field id="generateWithAI" name="generateWithAI" component={Switch} />
                      </div>
                    </label>
                  </div>

                  <div className="form__group form__group--row">
                    <Button
                      theme="default"
                      size="default"
                      type="submit"
                      className={cx({
                        'button--theme-primary': !isLoading,
                        'button--theme-ghost-dark': isLoading,
                      })}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader className="me-1" />
                          {generalT('generatingCommit')}
                        </>
                      ) : (
                        generalT('generateCommit')
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </div>
    </section>
  );
};

export default CommitGeneratorForm;
