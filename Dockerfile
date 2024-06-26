FROM node:16.6.1-stretch-slim AS build

RUN npm install -g npm@10.8.1

WORKDIR /src
COPY . .

RUN npm config set registry https://registry.npmjs.org/
RUN npm install
RUN npm run build

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/build /usr/share/caddy
