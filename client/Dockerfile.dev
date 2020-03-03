# Use an existing docker image as a base
FROM node:alpine as builder

WORKDIR /usr/app

# Download and install a dependency
COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]