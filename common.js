/**
 * @typedef {Object} Config
 * @property {string} region  リージョン
 */
exports.config = {
  region: 'ap-northeast-1',
}

/**
 * @param {Config} config 設定値
 */
exports.setConfig = (config) => {
  this.config = config;
}

exports.config.ses = {
  region: 'us-east-1' || this.config.region,
  sourceAddress: '',
  templatePath: '',
}
