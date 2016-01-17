FROM node:slim
MAINTAINER Denis Carriere <carriere.denis@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install bower -g
CMD ["bower", "install"]

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]
