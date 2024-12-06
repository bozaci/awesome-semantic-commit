'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useFormik } from 'formik';
import {
  Info,
  FloppyDisk,
  ShieldCheck,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react/dist/ssr';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { semanticCommitValidatorSchema } from '@/utils/schema';
import { useLocalStorage } from 'usehooks-ts';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { errorNotify, successNotify } from '@/utils/notification';
import posthog from 'posthog-js';
import cx from 'classnames';

import Box from '@/components/ui/box';
import Input from '@/components/ui/input';
import Badge from '@/components/ui/badge';
import Tooltip from '@/components/ui/tooltip';
import Button from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import Accordion from '@/components/ui/accordion';

type dataType = {
  commitMessage: string;
  fixedCommitMessage: string;
  tips: {
    tr: string[];
    en: string[];
  };
  status: 'valid' | 'not-valid' | string;
};

const initialData = {
  commitMessage: '',
  fixedCommitMessage: '',
  tips: {
    tr: [],
    en: [],
  },
  status: '', // valid, not-valid
};

const SemanticCommitValidatorForm = () => {
  const [animationParent] = useAutoAnimate();
  const generalT = useTranslations('general');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [formSubmitCount, setFormSubmitCount] = useState<number>(0);
  const [data, setData] = useState<dataType>(initialData);
  const [apiKeyInLocalStorage, setApiKeyInLocalStorage] = useLocalStorage('api-key', {
    googleGemini: '',
    openAI: '',
  });
  const [googleGeminiApiKey, setGoogleGeminiApiKey] = useState<string>(
    apiKeyInLocalStorage?.googleGemini,
  );
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const commitMessageWithGitCopyText = `git add .
git commit -m "${data?.fixedCommitMessage}"
git push origin main`;
  const formik = useFormik({
    initialValues: {
      googleGeminiApiKey: googleGeminiApiKey || '',
      commitMessage: commitMessage || '',
      purpose,
    },
    onSubmit: (values) => handleFormSubmit(values),
    validationSchema: semanticCommitValidatorSchema(generalT),
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  const handleFormSubmit = async (values: any) => {
    const { googleGeminiApiKey, commitMessage, purpose } = values;

    setError('');
    setData(initialData);
    setIsLoading(true);

    if (!googleGeminiApiKey || !commitMessage) {
      setError(`Google Gemini API Key and Commit Message is required.`);
      setIsLoading(false);
      setIsCompleted(true);
      return;
    }

    try {
      const response = await fetch(
        `/api/validator/?apiKey=${googleGeminiApiKey}&commitMessage=${commitMessage}&purpose=${purpose}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 404) {
        setError('Failed to fetch.');
        setIsLoading(false);
        setIsCompleted(true);
        return;
      }

      const data = await response.json();

      if (data?.status === 'error') {
        setError(data.message);
        setIsLoading(false);
        setIsCompleted(true);
        return;
      }

      if (
        data?.commitMessage ||
        data?.fixedCommitMessage ||
        data?.tips?.tr ||
        data?.tips?.en ||
        (data?.status === 'valid' && data?.status === 'not-valid')
      ) {
        setError(
          'The artificial intelligence service generated an error while performing semantic commit validation.',
        );
        setIsLoading(false);
        setIsCompleted(true);
        return;
      }

      setPurpose('');
      setData(data.body);
      setIsLoading(false);
      setIsCompleted(true);
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'production')
        posthog.capture('semantic-commit-validation');
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
      setIsCompleted(true);
      console.error(error);
    }
  };

  const handleResetValidation = () => {
    setData(initialData);
    setCommitMessage('');
    setIsCompleted(false);
    setIsLoading(false);
  };

  const handleSaveAPIKey = (aiService: 'google-gemini' | 'openai', apiKey: string) => {
    if (!apiKey) return errorNotify(generalT('saveAPIKeyErrorMessage'));
    if (apiKey === apiKeyInLocalStorage.googleGemini || apiKey === apiKeyInLocalStorage.openAI)
      return errorNotify(generalT('saveAPIKeyAlreadyMessage'));

    if (aiService === 'google-gemini')
      setApiKeyInLocalStorage({ googleGemini: apiKey, openAI: apiKeyInLocalStorage.openAI });
    if (aiService === 'openai')
      setApiKeyInLocalStorage({
        googleGemini: apiKeyInLocalStorage.googleGemini,
        openAI: apiKey,
      });
    successNotify(generalT('saveAPIKeySuccessMessage'));
  };

  useEffect(() => {
    if (!searchParams) return;

    const apiKey = searchParams.get('apiKey');
    const commitMessage = searchParams.get('commitMessage');
    const submit = searchParams.get('submit');

    if (!apiKey || !commitMessage) return;
    if (formSubmitCount >= 1) return;
    setFormSubmitCount((value) => value + 1);

    setGoogleGeminiApiKey(apiKey);
    setCommitMessage(commitMessage);

    if (submit === 'true') {
      setTimeout(() => {
        formik.submitForm();
      }, 500);
    }
  }, [formSubmitCount, formik, formik.values, searchParams]);

  return (
    <section className="semantic-commit-validator-form">
      <div className="container">
        <Box
          className={cx({
            'overflow-initial': !isCompleted,
          })}
        >
          {isCompleted ? (
            <>
              {!error && data ? (
                <>
                  <Box.Title size="medium" className="text-dark-green">
                    {generalT('validationSuccessTitle')}
                  </Box.Title>
                  <Box.Line />
                  <Box.Group className="flex-column spacing spacing--xsmall-y">
                    <Box.Title>{generalT('conclusion')}</Box.Title>

                    <div className="d-flex align-items-center spacing spacing--xsmall-two">
                      {data?.status === 'valid' && (
                        <>
                          <CheckCircle size={18} color="#00BC3B" />
                          <Box.Text>
                            {generalT.rich('validCommitMessage', {
                              commitMessage: `"${formik.values.commitMessage}"`,
                              strong: (chunks: any) => (
                                <strong className="text-medium">{chunks}</strong>
                              ),
                            })}
                          </Box.Text>
                        </>
                      )}
                      {data?.status === 'not-valid' && (
                        <>
                          <XCircle size={18} color="#D10000" />
                          <Box.Text>
                            {generalT.rich('notValidCommitMessage', {
                              commitMessage: `"${formik.values.commitMessage}"`,
                              strong: (chunks: any) => (
                                <strong className="text-medium">{chunks}</strong>
                              ),
                            })}
                          </Box.Text>
                        </>
                      )}
                    </div>
                  </Box.Group>
                  {data?.status === 'not-valid' && (
                    <Box.Group className="flex-column spacing spacing--xsmall-y">
                      <Box.Title>{generalT('errorsOfCommitMessage')}</Box.Title>
                      {locale === 'en' && data?.tips?.en.length > 0 && (
                        <Box.List type="line">
                          {data?.tips?.en.map((item, index) => (
                            <Box.ListItem key={index}>
                              <Box.Text>{item}</Box.Text>
                            </Box.ListItem>
                          ))}
                        </Box.List>
                      )}
                      {locale === 'tr' && data?.tips?.tr.length > 0 && (
                        <Box.List type="line">
                          {data?.tips?.tr.map((item, index) => (
                            <Box.ListItem key={index}>
                              <Box.Text>{item}</Box.Text>
                            </Box.ListItem>
                          ))}
                        </Box.List>
                      )}
                    </Box.Group>
                  )}
                  <Accordion
                    title={generalT('fixedCommitMessage')}
                    content={
                      <>
                        <Box.Group className="spacing spacing--xsmall-y">
                          <Box.Title>{generalT('semanticCommitMessage')}</Box.Title>
                          <Badge
                            theme="dashed-orange"
                            size="medium"
                            copyText={data?.fixedCommitMessage}
                            useWithCopyClipboard
                          >
                            {data?.fixedCommitMessage}
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
                              git commit -m &quot;{data?.fixedCommitMessage}&quot; <br />
                              git push origin main
                            </Badge>
                          </Box.Group>
                        </Box.Group>
                      </>
                    }
                  />
                  <Box.Group>
                    <Button
                      onClick={handleResetValidation}
                      theme="green"
                      size="small"
                      icon={<ShieldCheck />}
                      iconAlign="left"
                    >
                      {generalT('validationAgain')}
                    </Button>
                  </Box.Group>
                </>
              ) : (
                <>
                  <Box.Title size="medium" className="text-red">
                    {generalT('validationErrorTitle')}
                  </Box.Title>
                  <Box.Line />
                  <Box.Group>
                    <Box.Text>{error}</Box.Text>
                  </Box.Group>
                  <Box.Group>
                    <Button
                      onClick={handleResetValidation}
                      theme="green"
                      size="small"
                      icon={<ShieldCheck />}
                      iconAlign="left"
                    >
                      {generalT('validationAgain')}
                    </Button>
                  </Box.Group>
                </>
              )}
            </>
          ) : (
            <form ref={animationParent} onSubmit={formik.handleSubmit} className="form">
              <label className="form__group">
                <p className="form__label">
                  <span className="text-red">*</span>
                  &nbsp;Google Gemini API Key
                </p>
                <Input
                  id="googleGeminiApiKey"
                  name="googleGeminiApiKey"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.googleGeminiApiKey}
                  hasError={formik.errors.googleGeminiApiKey ? true : false}
                  buttons={[
                    {
                      icon: <FloppyDisk />,
                      name: 'Save API Key',
                      tooltipText: generalT('saveAPIKeyTooltip'),
                      onClick: () =>
                        handleSaveAPIKey('google-gemini', formik.values.googleGeminiApiKey),
                    },
                  ]}
                />
                {formik.errors.googleGeminiApiKey && formik.touched.googleGeminiApiKey && (
                  <p className="form__help-message form__help-message--error">
                    {formik.errors.googleGeminiApiKey}
                  </p>
                )}
              </label>

              <label className="form__group">
                <p className="form__label">
                  <span className="text-red">*</span>
                  &nbsp;{generalT('commitMessage')}
                </p>
                <Input
                  id="commitMessage"
                  name="commitMessage"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.commitMessage}
                  hasError={formik.errors.commitMessage ? true : false}
                />
                {formik.errors.commitMessage && formik.touched.commitMessage && (
                  <p className="form__help-message form__help-message--error">
                    {formik.errors.commitMessage}
                  </p>
                )}
              </label>

              <label className="form__group">
                <span className="form__label d-flex align-items-center spacing spacing--xsmall-two">
                  <p className="form__label mb-0">{generalT('purposeChanges')}</p>

                  <Badge
                    theme="ghost-gray"
                    size="small"
                    icon={
                      <Tooltip
                        position="top"
                        content={`
                          <div class="tooltip__item">
                            <p class="tooltip__text">${generalT('purposeChangesTooltipText')}</p>
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
                </span>
                <Input
                  id="purpose"
                  name="purpose"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.purpose}
                  hasError={formik.errors.purpose ? true : false}
                />
                {formik.errors.purpose && formik.touched.purpose && (
                  <p className="form__help-message form__help-message--error">
                    {formik.errors.purpose}
                  </p>
                )}
              </label>

              <div className="form__group form__group--row">
                <Button
                  theme="default"
                  size="default"
                  type="submit"
                  icon={!isLoading ? <ShieldCheck /> : null}
                  iconAlign="left"
                  className={cx({
                    'button--theme-green': !isLoading,
                    'button--theme-ghost-dark': isLoading,
                  })}
                  disabled={
                    isLoading ||
                    (!formik.values.googleGeminiApiKey || !formik.values.commitMessage
                      ? true
                      : false)
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader className="me-1" />
                      {generalT('validationInProgress')}
                    </>
                  ) : (
                    generalT('startValidation')
                  )}
                </Button>
              </div>
            </form>
          )}
        </Box>
      </div>
    </section>
  );
};

export default SemanticCommitValidatorForm;
