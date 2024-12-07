import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'
import typescript from '@sequencemedia/eslint-config-typescript/merge'
import babelParser from '@babel/eslint-parser'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'

const reactParserOptions = {
  ecmaFeatures: {
    jsx: true
  }
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
  {
    files: [
      '**/*.tsx',
      '**/*.jsx'
    ],
    ...reactPlugin.configs.flat.recommended
  },
  ...standard({
    files: [
      '**/*.{mjs,cjs}'
    ],
    ignores: [
      'src',
      'stories'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...standard({
    files: [
      'src/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  ...standard({
    files: [
      'stories/**/*.jsx'
    ],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ...reactParserOptions
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...reactRules
    },
    settings: {
      ...reactSettings
    }
  }),
  ...typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'src'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  ...typescript({
    files: [
      'src/**/*.{mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  ...typescript({
    files: [
      'src/**/*.tsx'
    ],
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ...reactParserOptions,
        project: 'tsconfig.json'
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...reactRules
    },
    settings: {
      ...reactSettings
    }
  })
]
