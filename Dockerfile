FROM node
MAINTAINER Denis Carriere <carriere.denis@gmail.com>

WORKDIR /
ADD . /pacgeo
WORKDIR /pacgeo
RUN npm install -g browserify
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]