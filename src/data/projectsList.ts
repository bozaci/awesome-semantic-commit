/**
 *
 * Example
 *
 * {
 *   id: 1, // Project unique identifier (increment by 1 for each new project)
 *   name: 'Example Project', // Project name
 *   description:
 *     'A sample project that demonstrates best practices in project management and code collaboration for efficient team workflows.', // max. 150 characters
 *   icon: '/projects-logo/example-icon.png', // 48x48 icon path
 *   website: 'https://example.com/', // Project website URL
 *   githubRepo: 'https://github.com/username/example-project', // GitHub repository URL
 *   level: 'medium', // Semantic commit compliance level, options are: 'low', 'medium', or 'high'
 *   featured: false, // Always false
 * },
 *
 */

export const projects = [
  {
    id: 1,
    name: 'Semantic Commit',
    description:
      'Learn best practices for clear, concise commit messages to improve project organization, code readability, team collaboration, and version control.',
    icon: '/projects-logo/semantic-commit.png',
    website: 'https://semanticcommit.com',
    githubRepo: 'https://github.com/bozaci/awesome-semantic-commit',
    level: 'high',
    featured: true,
  },
  {
    id: 2,
    name: 'React',
    description:
      'React enables the development of dynamic user interfaces with reusable components, enhancing performance and efficiency in web applications.',
    icon: '/projects-logo/react.png',
    website: 'https://react.dev',
    githubRepo: 'https://github.com/facebook/react',
    level: 'medium',
    featured: true,
  },
  {
    id: 3,
    name: 'Next.js',
    description:
      "Next.js allows you to build full-stack web applications using React's latest features and fast Rust-based JavaScript tooling, used by many large companies.",
    icon: '/projects-logo/nextjs.png',
    website: 'https://nextjs.org',
    githubRepo: 'https://github.com/vercel/next.js',
    level: 'low',
    featured: true,
  },
  {
    id: 4,
    name: 'Vue.js',
    description:
      'React enables the development of dynamic user interfaces with reusable components, enhancing performance and efficiency.',
    icon: '/projects-logo/vuejs.png',
    website: 'https://vuejs.org',
    githubRepo: 'https://github.com/vuejs/core',
    level: 'high',
    featured: true,
  },
  {
    id: 5,
    name: 'freeCodeCamp',
    description:
      'freeCodeCamp is a nonprofit platform offering free coding lessons and resources for web development and data science.',
    icon: '/projects-logo/freecodecamp.png',
    website: 'https://freecodecamp.org',
    githubRepo: 'https://github.com/freeCodeCamp/freeCodeCamp',
    level: 'high',
    featured: true,
  },
  {
    id: 6,
    name: 'Bootstrap',
    description:
      'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.',
    icon: '/projects-logo/bootstrap.png',
    website: 'https://getbootstrap.com',
    githubRepo: 'https://github.com/twbs/bootstrap',
    level: 'low',
    featured: true,
  },
  {
    id: 7,
    name: 'Electron.js',
    description: 'Build cross-platform desktop apps with JavaScript, HTML, and CSS',
    icon: '/projects-logo/electronjs.png',
    website: 'https://www.electronjs.org/',
    githubRepo: 'https://github.com/electron/electron',
    level: 'high',
  },
  {
    id: 8,
    name: 'Node.js',
    description: 'Node.js is an open-source, cross-platform JavaScript runtime environment.',
    icon: '/projects-logo/nodejs.png',
    website: 'https://nodejs.org/',
    githubRepo: 'https://github.com/nodejs/node',
    level: 'high',
  },
  {
    id: 9,
    name: 'Axios',
    description: 'Promise based HTTP client for the browser and node.js',
    icon: '/projects-logo/axios.png',
    website: 'https://axios-http.com/',
    githubRepo: 'https://github.com/axios/axios',
    level: 'high',
  },
];
