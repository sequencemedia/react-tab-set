const debug = require('debug')

const log = debug('react-tab-set')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`react-tab-set` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current',
        browsers: [
          'last 4 versions',
          'safari >= 9',
          'ios >= 8',
          'ie >= 9',
          '> 2%'
        ]
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = [
  [
    'module-resolver', {
      alias: {
        /**
         *  ESlint for Storybook `jsx`
         */
        'react-tab-set': './src'
      }
    }
  ]
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets,
    plugins
  }
}
