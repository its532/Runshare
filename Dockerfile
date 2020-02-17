FROM node:8.16.0-alpine  

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g create-react-app

