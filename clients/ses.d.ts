import { SES as SdkSES, Request, PromiseResult, AWSError } from 'aws-sdk';

interface SesConfig {
  /** リージョン */
  region?: string;
  /** 送信元メールアドレス */
  sourceAddress?: string;
  /** テンプレートディレクトリのパス */
  templatePath?: string;
}

interface Addresses {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
}

declare class SES {

  constructor(config: SesConfig);

  /**
   * メール送信
   * @param toAddresses 送信先アドレス
   * @param subject 表題
   * @param body 本文
   * @param options オプション
   */
  sendEmail(addresses: Addresses, subject: string, body: string, options: any): Promise<PromiseResult<Request<SdkSES.Types.SendEmailResponse, AWSError>>>;

  /**
   * テンプレートメール送信
   * @param toAddresses 送信先アドレス
   * @param templateName テンプレート名
   * @param prams パラメータ
   * @description
   * `templateName`に指定したファイルの拡張子が.htmlの場合はHTMLメールを送信します。
   * HTMLメールの場合は<title>タグがsubjectとなり、それ以外はファイルの1行目が`subject:`で始まっていれば:以降をsubjectとします。
   */
  sendMailTemplate(addresses: Addresses, templateName: string, prams?: any): Promise<PromiseResult<Request<SdkSES.Types.SendEmailResponse, AWSError>>>;
}