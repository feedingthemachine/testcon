FROM node:8

# Create app directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . /usr/src/app

RUN npm run build

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]