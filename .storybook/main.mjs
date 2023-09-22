/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const MTS_RULE = {
  test: /\.mts?$/,
  use: {
    loader: 'babel-loader'
  },
  exclude: /node_modules/
}

const MTS_EXTENSION = '.mts'

export default {
  stories: [
    '../**/*.stories.@(mjs|cjs|jsx|mts|tsx|cts)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal (config) {
    const {
      module: {
        rules = []
      } = {},
      resolve: {
        extensions = []
      } = {}
    } = config

    rules.push(MTS_RULE)
    extensions.push(MTS_EXTENSION)

    return config
  }
}
