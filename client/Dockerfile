FROM node:10.7.0-alpine AS build

LABEL maintainer="Portal-ui-team"

# set working directory
WORKDIR /usr/src/app/client

# install and cache app dependencies
ADD package.json /usr/src/app/client/package.json
ADD .npmrc /usr/src/app/client/.npmrc
RUN npm install --only=production

## add source code and build app
ADD public /usr/src/app/client/public
ADD src /usr/src/app/client/src
ADD config-overrides.js /usr/src/app/client
RUN npm run build && npm run build:replace:version && npm run build:replace:branch

EXPOSE 3000
CMD [ "npm", "run", "start:ci" ]
