# first fase
FROM node:lts-alpine as builder
WORKDIR /web-app

COPY ./package*.json ./tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

# second fase
FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /web-app/build /usr/share/nginx/html/investment-manager-app
EXPOSE 3000