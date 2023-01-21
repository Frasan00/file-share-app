### client docker image ###

FROM node:16-alpine 
WORKDIR /app
COPY *.json .
RUN npm ci
COPY /public ./public
COPY /src ./src
EXPOSE 3000
CMD ["npm", "run", "start"]
