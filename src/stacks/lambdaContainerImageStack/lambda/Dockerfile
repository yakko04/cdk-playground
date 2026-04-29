# --- Build Stage ---
FROM mcr.microsoft.com/playwright:v1.50.0-noble AS build-image

# RICのビルドに必要なツール
RUN apt-get update && apt-get install -y \
    g++ make cmake unzip libcurl4-openssl-dev autoconf automake libtool python3-setuptools

WORKDIR /var/task
COPY package.json ./
RUN npm install
COPY . .

# --- Final Stage ---
FROM mcr.microsoft.com/playwright:v1.50.0-noble

WORKDIR /var/task
# ビルド済み資材をコピー（node_modules や index.mjs, tests/ を含む）
COPY --from=build-image /var/task ./

# 日本語フォントの追加
RUN apt-get update && apt-get install -y fonts-noto-cjk && rm -rf /var/lib/apt/lists/*

# Lambda Runtime Interface Client をエントリーポイントに指定
ENTRYPOINT [ "/usr/bin/npx", "aws-lambda-ric" ]
CMD [ "index.handler" ]