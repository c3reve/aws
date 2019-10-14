const common = require('./common');

/**
 * @param {common.config} config 設定値
 */
exports.setConfig = (config) => {
  common.setConfig(config);
}

exports.SES = require('./clients/ses');
