### File-Share Application ###

In order to run this application you can:

1) Start the project locally 
- The react app with npm start in the root of the project 
- The server starts with npm start executed in it's own directory
- You have to run Mongodb on mongodb://localhost:27017/file-share
- You also have to install all dependencies and set a .env file with PORT, MONGO_URI, JWT_KEY 

2) Use Docker
- If you have docker installed you can use the command "bash run.sh" on linux to build and run this project automatically (source: docker compose)
- This process starts server and mongoDB that will be linked together
- Once docker compose has finished you just have to go on "http://localhost:3000" and you will be direcly connencted to the authentication page (or homepage if already logged in)