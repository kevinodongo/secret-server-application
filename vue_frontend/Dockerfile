# development enviromet
FROM node:lts-alpine

# create a workdir
WORKDIR /vue_frontend

# copy package json
COPY package*.json ./

# install all depencies
RUN npm install

# copy entire directory
COPY . .

# serve
CMD [ "yarn", "run", "serve" ]
