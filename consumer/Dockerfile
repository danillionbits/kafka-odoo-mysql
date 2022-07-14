FROM node:16.9.0-alpine
WORKDIR /consumer
COPY index.js package.json /consumer/
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]