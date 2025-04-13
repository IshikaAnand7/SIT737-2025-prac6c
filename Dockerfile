# Use an official Node.js image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose application port
EXPOSE 3001

# Start the app
CMD ["node", "server.js"]
