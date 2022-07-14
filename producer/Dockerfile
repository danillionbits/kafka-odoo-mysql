FROM node:16.9.0-alpine
WORKDIR /producer
COPY index.js package.json /producer/
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]