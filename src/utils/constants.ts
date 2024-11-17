export const commitGeneratePrompt = (summary: string) => {
  return `Return the summary in English and follow the semantic rules of the provided summary. Implement the content so that only the type is fixed, while the content itself is dynamic. The structure should strictly follow the format provided below. For instance, the type must be:
  - 'feat' for new feature additions,
  - 'fix' for bug fixes,
  - 'docs' for documentation changes,
  - 'style' for formatting changes (like CSS or code style updates),
  - 'chore' for maintenance tasks like upgrading libraries, refactoring code, or handling internal tooling,
  - 'refactor' for restructuring the code without changing its functionality,
  - 'test' for adding or updating tests,
  - 'perf' for changes made solely to improve performance without altering functionality,
  - 'ci' for changes related to continuous integration configuration (e.g., changes to the CI/CD pipeline),
  - 'build' for changes related to the build system or dependency management,
  - 'revert' for reverting the effects of a previous commit.

  Words like "added", "resolved", etc., should be transformed into their infinitive form, such as "add", "resolve", etc., according to the correct context. Do not include additional words or transformations outside of the provided semantic structure.

  1. **Clarify Handling of Multiple Changes in One Commit**: If multiple changes are included in a single commit, ensure that each change is represented correctly by its own type. For example, if a commit includes both a bug fix and a new feature, it should be split into two entries: one for the bug fix and one for the new feature. If they are not split, ensure both aspects are clearly conveyed.
  2. **Support for Multiple Scopes**: If the commit affects multiple scopes, the scope should be reflected accordingly. For example, if a commit affects both 'auth' and 'ui' parts of the system, use:  
     'feat(auth, ui): add login and dashboard UI updates'.

  For example:
  - If the summary is "added sentry for monitoring", the type should be 'feat' (since it's adding a new feature).
  - If the summary is "upgrade next.js to latest version", the type should be 'chore' (since it’s a maintenance task).
  
  Return the data strictly in JSON format as shown in the example, and do not include headers or text outside of the JSON data.
  
  Summary: ${summary}.

  Example:
  {
    "content": "chore: upgrade next.js to latest version",
    "contentWithScope": "chore(next.js): upgrade next.js to latest version"
  }
`;
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
