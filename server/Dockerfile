### server docker image ###

FROM node:alpine 
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . ./src
RUN mkdir /uploads
RUN mkdir /dist
EXPOSE 5000
CMD ["npm", "start"]
