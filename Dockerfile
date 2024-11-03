# Dockerfile
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]
