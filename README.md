### File-Share Application ###

In order to run this application you can:

1) Start the project locally 
- The react app with npm start in the root of the project 
- The server starts with npm start executed in it's own directory
- You have to run Mongodb on mongodb://localhost:27017/file-share
- You also have to install all dependencies and set a .env file with PORT, MONGO_URI, JWT_KEY 

2) 
- If you have docker you can use the run.sh to build and run this project automatically (source: docker compose)
- This start the server and mongoDB that are linked together
- Once up you just have to go on localhost:3000