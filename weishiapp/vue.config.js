const path = require('path')
    // If your port is set to 80,
    // use administrator privileges to execute the command line.
    // For example, on Mac: sudo npm run / sudo yarn
const devServerPort = 8081 // TODO: get this variable from setting.ts
const name = 'Vue Typescript Admin' // TODO: get this variable from setting.ts

module.exports = {
    publicPath: './',
    lintOnSave: false,
    productionSourceMap: false,
}