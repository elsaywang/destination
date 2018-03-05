FROM node:9.6.1-alpine AS build

LABEL maintainer="Portal-ui-team"

# set working directory
WORKDIR /usr/src/app/server

# install and cache app dependencies
ADD ./package.json /usr/src/app/server/package.json
RUN npm install --only=production

ADD ./ /usr/src/app/server
# start app
CMD ["npm", "start"]
