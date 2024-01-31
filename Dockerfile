
# https://stackoverflow.com/questions/53681522/share-variable-in-multi-stage-dockerfile-arg-before-from-not-substituted
ARG PROJECT_DIR=/vue3-antdv-admin

FROM node:20-slim as builder
ARG PROJECT_DIR
WORKDIR $PROJECT_DIR

# 安装pnpm
RUN npm install -g pnpm

COPY . ./
# 安装依赖
# 若网络不通，可以使用淘宝源
# RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm install

# 构建项目
ENV VITE_BASE_URL=/
RUN pnpm build


FROM nginx:alpine as production
ARG PROJECT_DIR

COPY --from=builder $PROJECT_DIR/dist/ /usr/share/nginx/html
# COPY --from=builder $PROJECT_DIR/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
