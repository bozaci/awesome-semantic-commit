export const commitGeneratePrompt = (summary: string) => {
  return `Return the data in English, follow the semantic rules of the summary to be given to you, return the data in JSON format in accordance with the structure given below. For example, the type must be fixed and the content must be implemented that will not be fixed in the content, also follow this rule. Just return the JSON data as in the example, absolutely no header and text!

  Summary: ${summary}.

  {
    "content": "feat: add new login page",
    "contentWithScope": "feat(login): add new login page",
  }`;
};

export const commitTypes = [
  'feat',
  'fix',
  'docs',
  'style',
  'chore',
  'refactor',
  'test',
  'perf',
  'ci',
  'build',
  'revert',
];
