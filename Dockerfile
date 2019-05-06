FROM node:lts-alpine

# Install ngnix
RUN apk add nginx

# Install tools to manage service
RUN apk add openrc

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Copy ngnix default conf to right place
COPY ./nginx_config/default.conf /etc/nginx/conf.d/default.conf

# build app for production with minification
RUN npm run build

# Chown
RUN chown -R nginx: /app/dist

# Expose port
EXPOSE 8080

# Restart nginx
CMD ["nginx", "-g", "'pid /tmp/nginx.pid; daemon off;'"]

