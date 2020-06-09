FROM node:10-alpine

RUN apk add --no-cache bash

WORKDIR /src
COPY package*.json ./

RUN npm install

COPY . .