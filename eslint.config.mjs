// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'Literal[value=/#(?:[\\da-fA-F]{3}|[\\da-fA-F]{4}|[\\da-fA-F]{6}|[\\da-fA-F]{8})|rgba?\\(|hsla?\\(/]',
          message: '하드코딩 컬러 대신 app/globals.css의 @theme 컬러 토큰을 사용하세요.',
        },
        {
          selector:
            'Literal[value=/\\b(?:text|bg|border|fill|stroke)-\\[[^\\]]*(?:#|rgba?\\(|hsla?\\()[^\\]]*\\]/]',
          message: 'Tailwind 임의 색상 클래스 대신 app/globals.css의 토큰 클래스만 사용하세요.',
        },
        {
          selector:
            'TemplateElement[value.raw=/\\b(?:text|bg|border|fill|stroke)-\\[[^\\]]*(?:#|rgba?\\(|hsla?\\()[^\\]]*\\]/]',
          message: 'Tailwind 임의 색상 클래스 대신 app/globals.css의 토큰 클래스만 사용하세요.',
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  ...storybook.configs['flat/recommended'],
]);

export default eslintConfig;

        {
          selector:
            "Literal[value=/\\b(?:w|h|min-w|min-h|max-w|max-h|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-x|space-y|text|leading|tracking|rounded|top|right|bottom|left|inset|inset-x|inset-y)-\\[[^\\]]*(?:px|rem|em|vh|vw|%)\\]/]",
          message:
            "크기는 Tailwind 기본 scale 클래스를 우선 사용하세요. (예: h-10, px-4, text-sm, rounded-md)",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(?:w|h|min-w|min-h|max-w|max-h|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-x|space-y|text|leading|tracking|rounded|top|right|bottom|left|inset|inset-x|inset-y)-\\[[^\\]]*(?:px|rem|em|vh|vw|%)\\]/]",
          message:
            "크기는 Tailwind 기본 scale 클래스를 우선 사용하세요. (예: h-10, px-4, text-sm, rounded-md)",
        },
