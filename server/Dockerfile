### server docker image ###

FROM node:alpine 
WORKDIR /app
COPY *.json ./
COPY /src ./src
RUN npm install
ENV PORT=5000
ENV JWT_KEY=123123123
ENV MONGODB_URI=mongodb://mongodb:27017/chat-app
EXPOSE 5000
CMD ["npm", "start"]
