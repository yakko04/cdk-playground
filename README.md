# cdk-playground

awsリソースをちょこっと試したいときに使うリポジトリ

## 使い方

基本的には、Stack単位でリソースを作り試すようにする

### 1. 検証用スタックの作成

- 下記コマンドでスタックを作成(テンプレートが生成)
```shell 
create-template {stack-name} #ex. create-template sample 
```

以下ディレクトリが生成される

src/stacks/{stack-name}Stack/  
  -app.ts  
  -{stack-name}Stack.ts  

### 2. リソースを追加する

Stack.tsにAWSリソースを記述する

### 3. diff/deploy/destroy

#### diff

```shell
STACK={stack-name}Stack npm run diff
```

#### deploy

```shell
STACK={stack-name}Stack npm run deploy
```

#### destroy

```shell
STACK={stack-name}Stack npm run destroy
```

## コマンド(補足)

diff
- `npm run cdk diff -- --app "npx ts-node --prefer-ts-exts src/stacks/{your stack}/app.ts"`

deploy
- `npm run cdk deploy -- --app "npx ts-node --prefer-ts-exts src/stacks/{your stack}/app.ts"`

destroy
- `npm run cdk destroy -- --app "npx ts-node --prefer-ts-exts src/stacks/{your stack}/app.ts"`