
From node:24-alpine 

WORKDIR /backend2.0

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5002

CMD ["node", "src/index.js"]