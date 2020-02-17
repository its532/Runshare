FROM node:8.16.0-alpine  

ENV NODE_ENV=production

WORKDIR /app

COPY /run-share/package*.json ./

RUN npm install

RUN npm install -g create-react-app


COPY . .