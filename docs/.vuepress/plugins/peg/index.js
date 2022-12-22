/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'peg',

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
});
