FROM node:lts-alpine as builder

ENV PROJECT_DIR=/vue3-antd-admin

WORKDIR $PROJECT_DIR

# 安装依赖
COPY package.json $PROJECT_DIR
# 若网络不通，可以使用淘宝源
RUN yarn config set registry https://registry.npmmirror.com
RUN yarn install

# 构建项目
COPY ./ $PROJECT_DIR
RUN rm -rf .env.* && yarn build


FROM nginx:alpine as production

# 后端 API 端口
ENV SERVER_PORT 7001
# websocket 服务端口
ENV WS_PORT 7002

COPY  --from=builder /vue3-antd-admin/dist/ /usr/share/nginx/html
COPY ./default.conf.template /etc/nginx/templates/

EXPOSE 80
