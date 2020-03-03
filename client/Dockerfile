# Use an existing docker image as a base
FROM node:alpine as builder

WORKDIR /usr/app

# Download and install a dependency
COPY package.json .
RUN npm install

COPY . .

# Tell the image what to do when it starts
# as a container
RUN npm run build

FROM nginx
# EXPOSE 3000 - This doesn't do nothing for us if we dont use elastic beanstalk, but if we do it tells it on which port to deploy this app.
COPY --from=builder /usr/app/build /usr/share/nginx/html