FROM node:9.6.1-alpine AS build

LABEL maintainer="Portal-ui-team"

# set working directory
WORKDIR /usr/src/app/client

ARG BUILD_NUMBER
ARG BRANCH_NAME
ARG ARTIFACTORY_USERNAME
ARG ARTIFACTORY_PASS

# add bash dependencies since this is an alpine image
RUN apk add --no-cache git \
    openssh \
    curl

# install and cache app dependencies
ADD package.json /usr/src/app/client/package.json
ADD .npmrc /usr/src/app/client/.npmrc
RUN mkdir -p /root/.ssh
ADD git_key /root/.ssh/git_key
### Set up known_hosts
RUN /bin/su root
RUN ssh-keyscan -t rsa -H git.corp.adobe.com >> /root/.ssh/known_hosts && \
    chmod 600 /root/.ssh/git_key && eval "$(ssh-agent)" && ssh-add /root/.ssh/git_key && \
    echo "    IdentityFile /root/.ssh/git_key" >> /root/.ssh/config && \
    echo " Host git.corp.adobe.com" >> /root/.ssh/config && \
    echo " User root" >> /root/.ssh/config
RUN touch /root/.npmrc && \
    curl -u $ARTIFACTORY_USERNAME:$ARTIFACTORY_PASS https://artifactory.corp.adobe.com/artifactory/api/npm/auth > /root/.npmrc
RUN npm install --only=production --unsafe-perm

## add source code and build app
ADD public /usr/src/app/client/public
ADD src /usr/src/app/client/src
ADD config-overrides.js /usr/src/app/client
RUN npm run build && npm run build:replace:version && npm run build:replace:branch

EXPOSE 3000
CMD [ "npm", "run", "start:ci" ]
