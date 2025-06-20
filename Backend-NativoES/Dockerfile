FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ENV NODE_OPTIONS=--max-old-space-size=2048

RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]