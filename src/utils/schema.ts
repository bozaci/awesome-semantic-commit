import * as Yup from 'yup';

export const commitGeneratorSchema = (t: any) =>
  Yup.object().shape({
    type: Yup.string().when('generateWithAI', {
      is: false,
      then: () => Yup.string(),
    }),
    scope: Yup.string().when('generateWithAI', {
      is: false,
      then: () => Yup.string(),
    }),
    subject: Yup.string().when('generateWithAI', {
      is: false,
      then: () => Yup.string().required(t('thisFieldRequired')),
    }),
    summary: Yup.string().when('generateWithAI', {
      is: true,
      then: () => Yup.string().required(t('thisFieldRequired')),
    }),
    googleGeminiApiKey: Yup.string().when('generateWithAI', {
      is: true,
      then: () => Yup.string(),
    }),
    openAIApiKey: Yup.string().when('generateWithAI', {
      is: true,
      then: () => Yup.string(),
    }),
    generateWithScope: Yup.boolean(),
    generateWithAI: Yup.boolean(),
  });

export const addProjectSchema = (t: any) =>
  Yup.object().shape({
    name: Yup.string().required(t('thisFieldRequired')),
    logoURL: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        t('enterValidURL'),
      )
      .required(t('thisFieldRequired')),
    website: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        t('enterValidURL'),
      )
      .required(t('thisFieldRequired')),
    githubRepoURL: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        t('enterValidURL'),
      )
      .required(t('thisFieldRequired')),
    projectOwner: Yup.boolean(),
  });

export const semanticCommitValidatorSchema = (t: any) =>
  Yup.object().shape({
    googleGeminiApiKey: Yup.string().required(t('thisFieldRequired')),
    commitMessage: Yup.string().required(t('thisFieldRequired')),
    purpose: Yup.string(),
  });
