'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
//   BASE_API: '"http://192.168.111.217:8040"'
  BASE_API: '"/api"'
})
