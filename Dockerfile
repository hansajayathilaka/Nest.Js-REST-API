# Base image
FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install bcrypt

# Bundle app source
COPY . .

# # Creates a "dist" folder with the production build
# RUN npm run build

# # Start the server using the production build
# CMD [ "node", "dist/main.js" ]

CMD [ "npm", "run", "start:dev"]
