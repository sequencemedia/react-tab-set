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

module.exports = require('./is-tab-panel.mts')
