require('@babel/register')({
  ignore: [
    /node_modules\/(?!react-tab-set)/
  ],
  extensions: [
    '.mts',
    '.cts',
    '.tsx'
  ]
})

const {
  default: component
} = require('./index.mts')

module.exports = component
