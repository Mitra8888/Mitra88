FROM node:19-alpine

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 4200

CMD ["npm", "run", "start"]