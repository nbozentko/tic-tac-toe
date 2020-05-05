FROM node:10

# Copy all our files
COPY . .

# Install webpack
RUN npm install webpack

# Install dependencies
RUN npm install

# Run build and start
CMD npm start