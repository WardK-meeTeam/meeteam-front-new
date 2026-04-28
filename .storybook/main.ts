import type { StorybookConfig } from '@storybook/nextjs-vite';
import { resolve } from 'node:path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    const githubLoginIconMock = resolve(process.cwd(), '.storybook/mocks/GithubLoginIcon.tsx');
    const alias = config.resolve?.alias;
    const aliasEntries = Array.isArray(alias)
      ? alias
      : Object.entries(alias ?? {}).map(([find, replacement]) => ({ find, replacement }));

    config.plugins = [
      {
        name: 'meeteam-github-login-icon-mock',
        enforce: 'pre',
        resolveId(source) {
          const [sourcePath] = source.split('?');

          if (
            sourcePath === '@/assets/GithubLogin.svg' ||
            sourcePath.endsWith('/assets/GithubLogin.svg')
          ) {
            return githubLoginIconMock;
          }

          return null;
        },
      },
      ...(config.plugins ?? []),
    ];

    config.resolve = {
      ...(config.resolve ?? {}),
      alias: [
        {
          find: '@/assets/GithubLogin.svg',
          replacement: githubLoginIconMock,
        },
        ...aliasEntries,
      ],
    };

    return config;
  },
};
export default config;
