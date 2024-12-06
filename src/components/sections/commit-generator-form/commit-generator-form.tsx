'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Info, FloppyDisk, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { commitGeneratorSchema } from '@/utils/schema';
import { commitTypes } from '@/utils/constants';
import { useLocalStorage } from 'usehooks-ts';
import { errorNotify, successNotify } from '@/utils/notification';
import { useReadLocalStorage } from 'usehooks-ts';
import Image from 'next/image';
import posthog from 'posthog-js';
import cx from 'classnames';

import Box from '@/components/ui/box';
import Input from '@/components/ui/input';
import Switch from '@/components/ui/switch';
import Badge from '@/components/ui/badge';
import Tooltip from '@/components/ui/tooltip';
import Button from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import SelectMenu from '@/components/ui/select-menu';
import Tabs from '@/components/ui/tabs';

import googleGeminiIcon from '@/assets/images/google-gemini-icon.svg';
import chatgptIcon from '@/assets/images/chatgpt-icon.svg';

const tabsCustomSettings = {
  switcher: {
    backgroundColor: '#f8f8f8',
    backgroundHoverColor: '#efefef',
    backgroundActiveColor: '#ffffff',
    seperatorColor: '#dadada',
    padding: '13px 20px',
    fullWidth: true,

    font: {
      size: 18,
      weight: 500,
    },
  },
  content: {
    padding: '20px 20px 0 20px',
    animationSpeed: 'medium',
  },
};

const CommitGeneratorForm = () => {
  const [animationParent] = useAutoAnimate();
  const generalT = useTranslations('general');
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAIEnabled, setIsAIEnabled] = useState<boolean>(false);
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [typeData, setTypeData] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [apiKeyInLocalStorage, setApiKeyInLocalStorage] = useLocalStorage('api-key', {
    googleGemini: '',
    openAI: '',
  });
  const [generationMethod, setGenerationMethod] = useState<string>('');
  const [apiKeyByAIServiceType, setApiKeyByAIServiceType] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isValidateLoading, setIsValidateLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      type: selectedType || commitTypes[0],
      scope: '',
      subject: '',
      summary,
      googleGeminiApiKey: apiKeyInLocalStorage?.googleGemini || '',
      openAIApiKey: apiKeyInLocalStorage?.openAI || '',
      generateWithScope: true,
      generateWithAI: isAIEnabled,
    },
    onSubmit: (values, params) => handleFormSubmit(values, params),
    validationSchema: commitGeneratorSchema(generalT),
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });
  const aiService = useReadLocalStorage('commit-generator-active-tab');
  const commitMessageWithGitCopyText = `git add .
git commit -m "${commitMessage}"
git push origin main`;

  const handleFormSubmit = async (values: any, params: any) => {
    const {
      type,
      scope,
      subject,
      summary,
      googleGeminiApiKey,
      openAIApiKey,
      generateWithScope,
      generateWithAI,
    } = values;

    setError('');
    setCommitMessage('');
    setIsLoading(true);
    setGenerationMethod('');

    if (aiService !== 'google-gemini' && aiService !== 'openai') {
      setError('AI Service wasn’t validated.');
      setIsLoading(false);
      setIsCompleted(true);
      return;
    }

    // Generate as Manuel
    if (!generateWithAI && (type || subject)) {
      setCommitMessage(
        scope ? `${selectedType}(${scope}): ${subject}` : `${selectedType}: ${subject}`,
      );

      setTimeout(() => {
        setIsLoading(false);
        setIsCompleted(true);
        setGenerationMethod('manual');
        params.resetForm();
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'production')
          posthog.capture('manual-commit-generation');
      }, 1000);
    }

    // Generate with AI
    if (generateWithAI && (summary || googleGeminiApiKey || openAIApiKey)) {
      try {
        const response = await fetch(
          `/api/generate-commit/${aiService}/?apiKey=${apiKeyByAIServiceType}&summary=${summary}`,
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
        setGenerationMethod('ai');

        if (data?.status === 'error') {
          setError(data.message);
          setIsLoading(false);
          setIsCompleted(true);
          return;
        }

        setSummary('');
        setIsLoading(false);
        setIsCompleted(true);
        setCommitMessage(generateWithScope ? data.body.contentWithScope : data.body.content);
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'production')
          posthog.capture('ai-commit-generation');
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

  const handleValidateCommitMessage = () => {
    setIsValidateLoading(true);

    router.push(
      `/semantic-commit-validator/?apiKey=${formik.values.googleGeminiApiKey}&commitMessage=${commitMessage}&submit=true`,
    );
  };

  const handleSaveAPIKey = (aiService: 'google-gemini' | 'openai', apiKey: string) => {
    if (!apiKey) return errorNotify(generalT('saveAPIKeyErrorMessage'));
    if (apiKey === apiKeyInLocalStorage.googleGemini || apiKey === apiKeyInLocalStorage.openAI)
      return errorNotify(generalT('saveAPIKeyAlreadyMessage'));

    if (aiService === 'google-gemini')
      setApiKeyInLocalStorage({ googleGemini: apiKey, openAI: apiKeyInLocalStorage.openAI });
    if (aiService === 'openai')
      setApiKeyInLocalStorage({ googleGemini: apiKeyInLocalStorage.googleGemini, openAI: apiKey });

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

  useEffect(() => {
    if (!aiService) return;

    if (aiService === 'google-gemini')
      return setApiKeyByAIServiceType(apiKeyInLocalStorage.googleGemini);
    if (aiService === 'openai') return setApiKeyByAIServiceType(apiKeyInLocalStorage.openAI);
  }, [aiService, apiKeyInLocalStorage.googleGemini, apiKeyInLocalStorage.openAI]);

  useEffect(() => {
    if (!apiKeyInLocalStorage.googleGemini && aiService === 'google-gemini')
      return setApiKeyByAIServiceType(formik.values.googleGeminiApiKey);
    if (!apiKeyInLocalStorage.openAI && aiService === 'openai')
      return setApiKeyByAIServiceType(formik.values.openAIApiKey);
  }, [aiService, apiKeyInLocalStorage.googleGemini, apiKeyInLocalStorage.openAI, formik.values]);

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
                  <Box.Group className="d-flex flex-wrap spacing spacing--xsmall-two">
                    {generationMethod === 'ai' ? (
                      <Button onClick={handleResetCommitGenerate} theme="gemini" size="small">
                        {generalT('generateCommitAgain')}
                      </Button>
                    ) : (
                      <Button onClick={handleResetCommitGenerate} theme="primary" size="small">
                        {generalT('generateCommitAgain')}
                      </Button>
                    )}

                    <Button
                      onClick={handleValidateCommitMessage}
                      theme="green"
                      size="small"
                      icon={<ShieldCheck />}
                      iconAlign="left"
                      disabled={isValidateLoading}
                    >
                      {isValidateLoading ? (
                        <>{generalT('checkCommitMessageWithValidatorLoading')}</>
                      ) : (
                        <>{generalT('checkCommitMessageWithValidator')}</>
                      )}
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
                    {generationMethod === 'ai' ? (
                      <Button onClick={handleResetCommitGenerate} theme="gemini" size="small">
                        {generalT('generateCommitAgain')}
                      </Button>
                    ) : (
                      <Button onClick={handleResetCommitGenerate} theme="primary" size="small">
                        {generalT('generateCommitAgain')}
                      </Button>
                    )}
                  </Box.Group>
                </>
              )}
            </>
          ) : (
            <form ref={animationParent} onSubmit={formik.handleSubmit} className="form">
              {!formik.values.generateWithAI ? (
                <>
                  <label className="form__group">
                    <span className="form__label">
                      {' '}
                      <span className="text-red">*</span>
                      &nbsp;{generalT('type')}
                    </span>
                    <SelectMenu options={typeData} setOptions={setTypeData} />
                    {formik.errors.type && formik.touched.type && (
                      <p className="form__help-message form__help-message--error">
                        {formik.errors.type}
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
                    <Input
                      id="scope"
                      name="scope"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.scope}
                      hasError={formik.errors.scope ? true : false}
                    />
                    {formik.errors.scope && formik.touched.scope && (
                      <p className="form__help-message form__help-message--error">
                        {formik.errors.scope}
                      </p>
                    )}
                  </label>

                  <label className="form__group">
                    <p className="form__label">
                      <span className="text-red">*</span>
                      &nbsp;
                      {generalT('subject')}
                    </p>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.subject}
                      hasError={formik.errors.subject ? true : false}
                    />
                    {formik.errors.subject && formik.touched.subject && (
                      <p className="form__help-message form__help-message--error">
                        {formik.errors.subject}
                      </p>
                    )}
                  </label>
                </>
              ) : (
                <>
                  <Tabs
                    defaultValue="google-gemini"
                    customSettings={tabsCustomSettings}
                    useWithCookie="commit-generator-active-tab"
                    className="box__tabs box__tabs--commit-generator"
                  >
                    <Tabs.Switchers>
                      <Tabs.SwitcherItem value="google-gemini">
                        <Image
                          src={googleGeminiIcon}
                          width={24}
                          height={24}
                          alt="Google Gemini Icon"
                          className="me-1"
                        />
                        Google Gemini
                        <Badge
                          theme="ghost-gray"
                          size="small"
                          icon={
                            <Tooltip
                              position="top"
                              content={`<p class="tooltip__text">${generalT('googleGeminiInfoTooltip')}</p>`}
                            >
                              <Info />
                            </Tooltip>
                          }
                          iconAlign="right"
                          className="ms-1"
                          isRounded
                        >
                          {generalT('free')}
                        </Badge>
                      </Tabs.SwitcherItem>
                      <Tabs.SwitcherItem value="openai">
                        <Image
                          src={chatgptIcon}
                          width={22}
                          height={22}
                          alt="ChatGPT Icon"
                          className="me-1"
                        />
                        ChatGPT
                        <Badge
                          theme="ghost-green"
                          size="small"
                          icon={
                            <Tooltip
                              position="top"
                              content={`<p class="tooltip__text">${generalT('openAIInfoTooltip')}</p>`}
                            >
                              <Info />
                            </Tooltip>
                          }
                          iconAlign="right"
                          className="ms-1"
                          isRounded
                        >
                          {generalT('paid')}
                        </Badge>
                      </Tabs.SwitcherItem>
                    </Tabs.Switchers>

                    <Tabs.Contents>
                      <Tabs.ContentItem value="google-gemini">
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
                                  handleSaveAPIKey(
                                    'google-gemini',
                                    formik.values.googleGeminiApiKey,
                                  ),
                              },
                            ]}
                          />
                          {formik.errors.googleGeminiApiKey &&
                            formik.touched.googleGeminiApiKey && (
                              <p className="form__help-message form__help-message--error">
                                {formik.errors.googleGeminiApiKey}
                              </p>
                            )}
                        </label>
                      </Tabs.ContentItem>

                      <Tabs.ContentItem value="openai">
                        <label className="form__group">
                          <p className="form__label">
                            <span className="text-red">*</span>
                            &nbsp;OpenAI API Key
                          </p>
                          <Input
                            id="openAIApiKey"
                            name="openAIApiKey"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.openAIApiKey}
                            hasError={formik.errors.openAIApiKey ? true : false}
                            buttons={[
                              {
                                icon: <FloppyDisk />,
                                name: 'Save API Key',
                                tooltipText: generalT('saveAPIKeyTooltip'),
                                onClick: () =>
                                  handleSaveAPIKey('google-gemini', formik.values.openAIApiKey),
                              },
                            ]}
                          />
                          {formik.errors.openAIApiKey && formik.touched.openAIApiKey && (
                            <p className="form__help-message form__help-message--error">
                              {formik.errors.openAIApiKey}
                            </p>
                          )}
                        </label>
                      </Tabs.ContentItem>
                    </Tabs.Contents>
                  </Tabs>

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
                    <Input
                      id="summary"
                      name="summary"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.summary}
                      hasError={formik.errors.summary ? true : false}
                    />
                    {formik.errors.summary && formik.touched.summary && (
                      <p className="form__help-message form__help-message--error">
                        {formik.errors.summary}
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
                        <Switch
                          id="generateWithScope"
                          name="generateWithScope"
                          value={formik.values.generateWithScope.toString()}
                          onChange={formik.handleChange}
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
                    <Switch
                      id="generateWithAI"
                      name="generateWithAI"
                      onChange={formik.handleChange}
                      value={formik.values.generateWithAI.toString()}
                    />
                  </div>
                </label>
              </div>

              <div className="form__group form__group--row">
                <Button
                  theme="default"
                  size="default"
                  type="submit"
                  className={cx({
                    'button--theme-primary': !isLoading && !formik.values.generateWithAI,
                    'button--theme-gemini':
                      (isLoading || !isLoading) && formik.values.generateWithAI,
                    'button--theme-ghost-dark': isLoading && !formik.values.generateWithAI,
                  })}
                  disabled={
                    isLoading ||
                    (formik.values.generateWithAI &&
                      (!formik.values.summary ||
                      (!formik.values.googleGeminiApiKey && !formik.values.openAIApiKey)
                        ? true
                        : false)) ||
                    (!formik.values.generateWithAI &&
                      (!formik.values.type || !formik.values.subject ? true : false))
                  }
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
            </form>
          )}
        </Box>
      </div>
    </section>
  );
};

export default CommitGeneratorForm;
