FROM node:6.3.1

ADD wait-for-it.sh wait-for-it.sh
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# expose ports 
EXPOSE 3003

COPY package.json /usr/src/app/
RUN npm install 
COPY . /usr/src/app

CMD ["npm", "start"]
