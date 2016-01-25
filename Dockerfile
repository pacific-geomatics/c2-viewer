FROM mhart/alpine-node
MAINTAINER Denis Carriere <carriere.denis@gmail.com>

# Stormpath Credentials
ENV STORMPATH_CLIENT_APIKEY_ID=1HU99B538PG3SW50K5M2NPJBW
ENV STORMPATH_CLIENT_APIKEY_SECRET=7ukbB9oDRjgyMEX/057SKtAwwLtOR3fbKvNQOp4i/uI

# Create app directory
RUN mkdir -p /src
WORKDIR /src

# Install Node dependencies
RUN npm install gulp babel-cli -g
RUN npm install

# Bundle app source
COPY . /src

# Ports
EXPOSE 3000

# Start Server
CMD ["npm", "start"]
