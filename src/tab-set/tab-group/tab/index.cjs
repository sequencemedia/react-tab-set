require('@babel/register')({
  ignore: [
    /node_modules\/(?!react-tab-set)/
  ]
})

const {
  default: component
} = require('./index.jsx')

module.exports = component
