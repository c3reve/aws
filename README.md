# @c3reve/aws

## installation
```bash
npm install @c3reve/aws
```

## usage
JavaScript
```javascript
const AWS = require('@c3reve/aws');

AWS.setConfig({
  region: 'us-east-1'
});
```

TypeScript
```typescript
import * as AWS from '@c3reve/aws';

AWS.setConfig({
  region: 'us-west-2'
});
```

### SES
```javascript
this.ses = new AWS.SES({
  region: process.env.AWS_SES_REGION || 'us-west-2',
  sourceAddress: process.env.AWS_SES_SOURCE_ADDRESS,
  templatePath: join(__dirname, '../../assets/mail-template'),
});

this.ses.sendMailTemplate({ to: 'hoge@c3reve.co.jp' }, 'template.txt', { user: 'Taro' });
```
