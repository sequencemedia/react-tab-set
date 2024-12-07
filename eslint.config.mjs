import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/merge'
import typescript from '@sequencemedia/eslint-config-typescript/merge'
import parser from '@typescript-eslint/parser'
import eslint from '@typescript-eslint/eslint-plugin'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import n from 'eslint-plugin-n'
import p from 'eslint-plugin-promise'
import i from 'eslint-plugin-import'
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
      '@typescript-eslint': eslint,
      'eslint-comments': eslintComments,
      n,
      promise: p,
      import: i,
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
