# first fase
FROM node:lts-alpine as builder
WORKDIR /web-app

COPY ./package*.json ./tsconfig.json .
RUN npm install

COPY . .
RUN npm run build

# second fase
FROM nginx:stable-alpine
COPY from=builder /app/build /usr/share/nginx/html
EXPOSE 80