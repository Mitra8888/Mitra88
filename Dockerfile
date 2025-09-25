FROM node:19-alpine

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4200
EXPOSE 1234

CMD ["npm", "run", "start"]
