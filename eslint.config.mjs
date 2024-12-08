import globals from 'globals'
import {
  configs as standard
} from '@sequencemedia/eslint-config-standard'
import {
  configs as typescript
} from '@sequencemedia/eslint-config-typescript'
import babelParser from '@babel/eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'

const reactParserOptions = {
  ecmaFeatures: {
    jsx: true
  }
}

const reactPlugins = {
  react: reactPlugin
}

const reactRules = {
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'React'
    }
  ],
  quotes: [
    'error',
    'single'
  ],
  'jsx-quotes': [
    'error',
    'prefer-single'
  ],
  'react/jsx-indent': [
    'error',
    2,
    {
      checkAttributes: true,
      indentLogicalExpressions: true
    }
  ]
}

const reactSettings = {
  react: {
    version: 'detect'
  }
}

export default [
  /**
   *  React config for all `jsx` and `tsx` files
   */
  {
    ...reactPlugin.configs.flat.recommended,
    files: [
      '**/*.{jsx,tsx}'
    ]
  },
  {
    ...standard.recommended,
    files: [
      '**/*.{mjs,cjs}'
    ],
    ignores: [
      'src',
      'stories'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...standard.recommended.globals,
        ...globals.node
      }
    }
  },
  {
    ...standard.recommended,
    files: [
      'src/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      globals: {
        ...standard.recommended.languageOptions.globals,
        ...globals.browser
      }
    }
  },
  /**
   *  Standard config for all `jsx` and `tsx` files
   */
  {
    ...standard.recommended,
    files: [
      '**/*.{jsx,tsx}'
    ],
    languageOptions: {
      ...standard.recommended.languageOptions,
      parser: babelParser,
      parserOptions: {
        ...standard.recommended.languageOptions.parserOptions,
        ...reactParserOptions
      },
      globals: {
        ...standard.recommended.globals,
        ...globals.browser
      }
    },
    plugins: {
      ...standard.recommended.plugins,
      ...reactPlugins
    },
    rules: {
      ...standard.recommended.rules,
      ...reactRules
    },
    settings: {
      ...standard.recommended.settings,
      ...reactSettings
    }
  },
  {
    ...typescript.recommended,
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'src',
      'stories'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      globals: {
        ...typescript.recommended.languageOptions.globals,
        ...globals.node
      }
    }
  },
  {
    ...typescript.recommended,
    files: [
      'src/**/*.{mts,cts}'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      globals: {
        ...typescript.recommended.languageOptions.globals,
        ...globals.browser
      }
    }
  },
  /**
   *  TypeScript config for only `tsx` files
   */
  {
    ...typescript.recommended,
    files: [
      'src/**/*.tsx'
    ],
    languageOptions: {
      ...typescript.recommended.languageOptions,
      parser: typescriptParser,
      parserOptions: {
        ...typescript.recommended.languageOptions.parserOptions,
        ...reactParserOptions
      },
      globals: {
        ...typescript.recommended.languageOptions.globals,
        ...globals.browser
      }
    },
    plugins: {
      ...typescript.recommended.plugins,
      ...reactPlugins
    },
    rules: {
      ...typescript.recommended.rules,
      ...reactRules
    },
    settings: {
      ...typescript.recommended.settings,
      ...reactSettings
    }
  }
]
