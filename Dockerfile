FROM node:14-alpine

WORKDIR /app

ENV NODE_ENV=dev

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./ .

EXPOSE 3000
CMD ["npm", "start"]

