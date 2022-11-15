FROM node:16.18.0

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install --force
# RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

CMD ["npm", "start"]