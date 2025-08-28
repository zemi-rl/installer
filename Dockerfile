# Base image
FROM node:18-alpine

# Install bash & openssl
RUN apk add --no-cache bash openssl

WORKDIR /app

# Copy project files
COPY start.sh .
COPY server.js .
COPY package.json .

# Install dependencies
RUN npm install

# Make start.sh executable
RUN chmod +x start.sh

# Expose port
EXPOSE 443

# Run start.sh
CMD ["./start.sh"]
