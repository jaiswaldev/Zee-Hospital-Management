
FROM node:24-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5001

CMD ["node", "index.js"]