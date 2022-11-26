/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => ({
  name: 'calc',

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
});
