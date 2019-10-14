import { SES as SdkSES, Request, PromiseResult, AWSError } from 'aws-sdk';

interface SesConfig {
  /** リージョン */
  region?: string;
  /** 送信元メールアドレス */
  sourceAddress?: string;
  /** テンプレートディレクトリのパス */
  templatePath?: string;
}

declare class SES {

  constructor(config: SesConfig);

  sendEmail(toAddresses: string, subject: string, body: string, options: any): Promise<PromiseResult<Request<SdkSES.Types.SendEmailResponse, AWSError>>>;

  /**
   * テンプレートメール送信
   * @param {array} toAddresses 送信先アドレス
   * @param {string} templateName テンプレート名
   * @param {*} prams パラメータ
   * @description
   * `templateName`に指定したファイルの拡張子が.htmlの場合はHTMLメールを送信します。
   * HTMLメールの場合は<title>タグがsubjectとなり、それ以外はファイルの1行目が`subject:`で始まっていれば:以降をsubjectとします。
   */
  sendMailTemplate(toAddresses: string[], templateName: string, prams?: any): Promise<PromiseResult<Request<SdkSES.Types.SendEmailResponse, AWSError>>>;
}