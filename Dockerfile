FROM node:14
RUN mkdir -p /usr/scr/app
WORKDIR /usr/scr/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
