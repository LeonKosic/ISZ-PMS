FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


#RUN npm run-script build

EXPOSE 3000 

ENV HOST=0.0.0.0

# For testing purposes with json-server
CMD [ "npm", "run", "all" ]
EXPOSE 3301

# Mitigate HMR console spam
EXPOSE 3003

# CMD [ "npm", "run", "dev" ]