### server docker image ###

FROM node:alpine 
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
