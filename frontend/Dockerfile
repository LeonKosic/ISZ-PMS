FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .



#RUN npm run-script build

EXPOSE 3000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ]