# cdk-playground

awsリソースをちょこっと試したいときに使うリポジトリ

## 使い方

- stacks配下にスタック単位でフォルダを切って使う
  - デプロイもそれごと

## コマンド

diff
- `npm run cdk diff -- --app "npx ts-node --prefer-ts-exts src/stacks/{your stack}/app.ts"`
deploy
- `npm run cdk deploy -- --app "npx ts-node --prefer-ts-exts src/stacks/{your stack}/app.ts"`
destroy
- `npm run cdk destroy -- --app "npx ts-node --prefer-ts-exts src/stacks/{your stack}/app.ts"`