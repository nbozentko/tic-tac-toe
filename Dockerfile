FROM node:12-alpine

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all our files
COPY . ./

# Expose port 8080
EXPOSE 8080

# Run build and start
CMD npm start
