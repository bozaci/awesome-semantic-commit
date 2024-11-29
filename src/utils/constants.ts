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
  2. **Support for Multiple Scopes**: If the commit affects multiple scopes, the scopes should be reflected accordingly and separated by a space after the comma. For example:
   'feat(auth, ui): add login and dashboard UI updates'. Also, when specifying a scope, use hyphenated names like 'select-menu', 'user-auth', etc., instead of spaces.

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

export const semanticCommitValidatePrompt = (commitMessage: string, purpose?: string) => {
  return `Evaluate the provided commit message and purpose of changes according to semantic commit rules. Return the result in JSON format with the following structure:
  commitMessage: The exact commit message provided.
  fixedCommitMessage: The corrected version of the commit message if it does not follow the rules. The fixed message must always include a scope when relevant. If it already follows the rules, return the original message.
  tips: An object containing explanations for issues with the commit message, in multiple languages if applicable (e.g., \"en\" for English and \"tr\" for Turkish). If any quotes are used within the tips, ensure to escape them with a backslash (e.g., \\\"example\\\"). Leave this empty if there are no issues. If quotes are used within the tips, ensure all apostrophes (') are escaped properly (e.g., "it\"s" instead of "it's") to avoid JSON parsing errors.
  status: 'valid' if the commit message follows semantic commit rules, 'not-valid' otherwise.

  Rules: 
  1. Type Validation: Ensure the type matches the intent:
  - 'feat' for new feature additions,
  - 'fix' for bug fixes,
  - 'docs' for documentation changes,
  - 'style' for formatting changes (like CSS or code style updates),
  - 'chore' for maintenance tasks (e.g., upgrading libraries, refactoring code, or handling internal tooling),
  - 'refactor' for restructuring code without changing functionality,
  - 'test' for adding or updating tests,
  - 'perf' for performance improvements without altering functionality,
  - 'ci' for changes to continuous integration (e.g., CI/CD pipeline updates),
  - 'build' for changes related to the build system or dependencies,
  - 'revert' for reverting the effects of a previous commit.

  2. Infinitive Verbs: Use verbs in their infinitive forms, such as 'add' instead of 'added'.
  3. Multiple Changes: If multiple changes are included in one commit, ensure all are accurately represented in the type and scope.
  4. Scope Usage: Specify the scope when relevant, using hyphenated names (e.g., 'user-auth', 'select-menu'). Separate multiple scopes with a space after the comma (e.g., 'feat(auth, ui): add login and dashboard UI updates').
  5. **IMPORTANT: Quotes inside tips should be handled correctly: If the explanation within the tips contains quotes, you **must** escape them with a backslash (e.g., \"example\"). If you have quotes within double quotes (""), replace those with single quotes ('). This is **critical**, as failing to do so will result in JSON parsing errors.**
  6. "I" and "I've" should be written as "I have" in the explanations.
  7. **Escape Double Quotes (\"\) in Strings:**  
     - Whenever a string contains double quotes, ensure the double quotes are escaped with a backslash (\`\\\"\`).  
     - **Example:**  
       - Incorrect: "The word "example" is unclear."
       - Correct: "The word \\\"example\\\" is unclear."

  8. **Avoid Nested Double Quotes:**  
     - When double quotes are used inside another pair of double quotes, replace the inner double quotes with backticks (\`\`).  
     - **Example:**  
       - Incorrect: "The term "feature" is ambiguous."  
       - Correct: "The term \\\"feature\\\" is ambiguous."

  9. **Apostrophe Usage:**  
     - Escape apostrophes in strings when they appear as part of contractions like \`it's\` or \`don't\`.  
     - **Example:**  
       - Incorrect: "It's not descriptive enough."
       - Correct: "It\\'s not descriptive enough."  

  Example Output:
  
  If the input does not follow semantic commit rules:
  {
    "commitMessage": "feat: updated new versions",
    "fixedCommitMessage": "feat(next.js): update to new versions",
    "tips": {
      "en": [
        "The commit message lacked a scope. I have added \"(components)\" as a placeholder. Please specify the actual scope.",
        "The commit message was not descriptive enough. I have added a type and scope to make it more meaningful. I have assumed that \"124\" refers to a build number update, thus using \"chore\" as the type. If it refers to a different kind of update, please adjust the type accordingly.",
        "The commit message lacked a scope. I have added \"(mobile)\" as a placeholder. Please specify the actual scope if \"mobile\" is too generic.",
        "I have corrected the verb to its infinitive form (\"add\" instead of \"added\").",
        "The word \"componentsss\" appears to have extra \"s\" characters. Please review and correct spelling errors."
      ],
      "tr": [
        "Commit mesajı bir kapsam eksikti. Yer tutucu olarak \"(components)\" ekledim. Lütfen gerçek kapsamı belirtin.",
        "Commit mesajı yeterince açıklayıcı değildi. Daha anlamlı hale getirmek için bir tür ve kapsam ekledim. \"124\" sayısının bir derleme numarası güncellemesini ifade ettiğini varsaydım, bu nedenle \"chore\" türünü kullandım. Farklı bir güncelleme türünü ifade ediyorsa, lütfen türü buna göre ayarlayın.",
        "Commit mesajı bir kapsam eksikti. Yer tutucu olarak \"(mobile)\" ekledim. Eğer \"mobile\" çok genel bir ifade ise lütfen daha spesifik bir kapsam belirtin.",
        "Fiili, çekimsiz halini kullanacak şekilde düzelttim (\"added\" yerine \"add\").",
        "\"componentsss\" kelimesinin fazladan \"s\" karakterleri var gibi görünüyor. Lütfen yazım hatalarını inceleyin ve düzeltin."
      ]
    },
    "status": "not-valid"
  }

  If the input follows semantic commit rules:
  {
    "commitMessage": "feat(auth, ui): add login and dashboard UI updates",
    "fixedCommitMessage": "feat(auth, ui): add login and dashboard UI updates",
    "tips": [],
    "status": "valid"
  }

  Input Format:
  - Commit Message: ${commitMessage}
  - Purpose of Changes: ${purpose || 'null'}
  Return the evaluation strictly in JSON format and do not include additional text or explanations.
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
