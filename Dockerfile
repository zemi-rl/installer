# Use Node.js LTS
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy all files into container
COPY . .

# Make start.sh executable
RUN chmod +x start.sh

# Expose HTTPS port
EXPOSE 443

# Start server
CMD ["./start.sh"]
