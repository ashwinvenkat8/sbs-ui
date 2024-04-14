FROM node:20.11.1-alpine3.19
WORKDIR /app
COPY public /app
COPY src /app
COPY package.json /app
RUN npm install
ENTRYPOINT exec npm run start