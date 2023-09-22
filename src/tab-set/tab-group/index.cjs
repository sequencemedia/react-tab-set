require('@babel/register')({
  ignore: [
    /node_modules\/(?!react-tab-set)/
  ]
})

const debug = require('debug')

const log = debug('react-tab-set/tab-set/tab-group')

log('`react-tab-set` is awake')

const {
  default: component
} = require('./index.jsx')

module.exports = component
