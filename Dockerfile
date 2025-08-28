FROM node:18-alpine

RUN apk add --no-cache bash openssl

WORKDIR /app

COPY start.sh .
COPY server.js .
COPY package.json .

RUN npm install
RUN chmod +x start.sh

EXPOSE 443

CMD ["./start.sh"]
