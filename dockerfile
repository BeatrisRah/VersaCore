FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=3030

EXPOSE 3030

CMD [ "npm", "start" ]