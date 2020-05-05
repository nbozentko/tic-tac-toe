FROM node:10

# Copy all our files
COPY . .

# Install webpack
RUN npm install webpack

# Install dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Run build and start
CMD npm start