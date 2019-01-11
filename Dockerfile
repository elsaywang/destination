FROM node:10.15.0-alpine AS build

LABEL maintainer="Portal-ui-team"

# set working directory
WORKDIR /usr/src/app/

ARG BUILD_NUMBER
ARG BRANCH_NAME
ARG ARTIFACTORY_USERNAME
ARG ARTIFACTORY_PASS
ARG NPM_TOKEN

RUN echo "node version" && node --version && npm --version

# add bash dependencies since this is an alpine image
RUN apk add --no-cache git \
    openssh \
    curl

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .
COPY lerna.json .
ADD packages /usr/src/app/packages
RUN mkdir -p /root/.ssh
COPY git_key /root/.ssh/git_key
### Set up known_hosts
RUN /bin/su root
RUN ssh-keyscan -t rsa -H git.corp.adobe.com >> /root/.ssh/known_hosts && \
    chmod 600 /root/.ssh/git_key && eval "$(ssh-agent)" && ssh-add /root/.ssh/git_key && \
    echo "    IdentityFile /root/.ssh/git_key" >> /root/.ssh/config && \
    echo " Host git.corp.adobe.com" >> /root/.ssh/config && \
    echo " User root" >> /root/.ssh/config
RUN touch /root/.npmrc && \
    curl -u $ARTIFACTORY_USERNAME:$ARTIFACTORY_PASS https://artifactory.corp.adobe.com/artifactory/api/npm/auth > /root/.npmrc && \
    echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> /root/.npmrc

RUN npm ci
RUN npx lerna bootstrap --no-ci -- --production
RUN npx lerna run postinstall
RUN npx lerna run build && npx lerna run build:replace:version && npx lerna run build:replace:branch

EXPOSE 3000
CMD [ "npx", "lerna", "run", "start:ci" ]
