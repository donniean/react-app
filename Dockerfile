FROM --platform=$BUILDPLATFORM node:26-slim AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install --global "$(node --print 'require("./package.json").packageManager')"

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM nginx:stable-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
