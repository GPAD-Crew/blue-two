FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY ./src ./src
COPY ./tsconfig.json ./

RUN npm run build

ENTRYPOINT [ "npm" , "start" ]