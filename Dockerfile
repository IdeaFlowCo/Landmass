FROM node:6.3.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# expose ports 
EXPOSE 3003

COPY package.json /usr/src/app/
RUN npm install 
COPY . /usr/src/app

CMD ["npm", "start"]
