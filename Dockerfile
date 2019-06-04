################################################################################################################
#  Author: Elias Summermatter & Jan Friedli
#  Date: 28.05.2019
#
#  Licence:
#  This file is part of BloSQL.
#  BloSQL is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  BloSQL is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with BloSQL.  If not, see <http://www.gnu.org/licenses/>.
#
#  External Content:
#  Code adapted from:
#    - https://github.com/rexuli/docker-compose-vue/blob/master/Dockerfile (Rewritten for ngnix run)
################################################################################################################

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

