FROM node:alpine 

WORKDIR /node_backend

COPY package*json ./

RUN yarn install 

COPY . . 

CMD [ "yarn", "dev" ]