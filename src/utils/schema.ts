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
      then: () => Yup.string().required(t('thisFieldRequired')),
    }),
    generateWithScope: Yup.boolean(),
    generateWithAI: Yup.boolean(),
  });
