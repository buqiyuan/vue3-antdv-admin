FROM node:22-bookworm-slim AS builder
WORKDIR /vue3-antdv-admin
RUN npm install -g pnpm@10.10.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm exec vp build

FROM nginx:alpine AS production
COPY --from=builder /vue3-antdv-admin/dist/ /usr/share/nginx/html
EXPOSE 80
