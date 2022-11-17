FROM node:16.18.0

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install --silent

COPY . .

CMD ["npm", "start"]