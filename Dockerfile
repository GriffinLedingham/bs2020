FROM node:carbon

RUN npm install -g mocha
COPY package.json package.json
RUN npm install

COPY . .
RUN npm run tsc
