const AWS = require('aws-sdk');
const credentialProvider = new AWS.CredentialProviderChain();
const common = require('../common');
const fs = require('fs');
const path = require('path');

module.exports = class AwsSES {

  constructor(config = {}) {
    this.config = Object.assign({}, common.config.ses, config);
    this.ses = new AWS.SES({ region: this.config.region, credentialProvider });
  }

  /**
   * メール送信
   * @param {array} toAddresses 送信先アドレス
   * @param {string} subject 表題
   * @param {string} body 内容
   */
  async sendMail(toAddresses, subject, body, options = { isHtml: false }) {
    const Body = {};
    Body[options.isHtml ? 'Html' : 'Text'] = { Data: body, Charset: 'utf-8' };
    return this.ses.sendEmail({
      Source: this.config.sourceAddress,
      Destination: { ToAddresses: toAddresses },
      Message: {
        Subject: { Data: subject, Charset: 'utf-8' },
        Body,
      }
    }).promise();
  }

  /**
   * テンプレートメール送信
   * @param {array} toAddresses 送信先アドレス
   * @param {string} templateName テンプレート名
   * @param {*} prams パラメータ
   * @description
   * `templateName`に指定したファイルの拡張子が.htmlの場合はHTMLメールを送信します。
   * HTMLメールの場合は<title>タグがsubjectとなり、それ以外はファイルの1行目が`subject:`で始まっていれば:以降をsubjectとします。
   */
  async sendMailTemplate(toAddresses, templateName, prams = {}) {
    const htmlRegExp = new RegExp('.html$');
    const isHtml = htmlRegExp.test(templateName);

    // ファイルを取得
    let text = fs.readFileSync(path.join(this.config.templatePath, templateName), { encoding: 'utf-8' });
    if (!text) {
      throw new Error('Invalid mail template name.');
    }

    // パラメータをバインド
    Object.keys(prams).forEach(key => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), prams[key]);
    });
    text = text.replace(/{{[^}]+}}/g, '');

    let subject = 'doko';
    if (isHtml) {
      // HTMLの場合はタイトルタグをメールのsubjectにする
      const titleTag = text.match(/<title>.+<\/title>/);
      if (titleTag) {
        subject = titleTag[0].replace(/<(\/?)title>/g, '');
      }
    } else {
      // プレーンテキストの場合で1行目が「subject:」で始まる場合はメールのsubjectにする
      const matchTexts = text.match(/^subject:.+/);
      if (matchTexts) {
        subject = matchTexts[0].replace('subject:', '');
        text = text.replace(/^subject:.+\n/, '');
      }
    }

    // メール送信
    return this.sendMail(toAddresses, subject, text, { isHtml });
  }
}
