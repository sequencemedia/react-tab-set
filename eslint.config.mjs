import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'
import typescript from '@sequencemedia/eslint-config-typescript/merge'
import parser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'

export default [
  ...standard({
    files: [
      '**/*.{mjs,cjs}'
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
      react
    },
    languageOptions: {
      parser,
      parserOptions: {
        project: 'tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    }
  })
]
