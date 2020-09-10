# Movie Collection App
This web application allows users to create an account, log in, search movies, and keep track of what movies they have. It was built using a PostgreSQL database and a Node.js (Express framework). The only library used on the frontend is jQuery.
## Local Setup 
After cloning down this repository, it is necessary to have Node.js and PostgreSQL on your machine (download those technologies if you do not have them). In the root of the repository, create a file ```.env``` to hold important environmental variables. You need to define your ```PORT``` for the app to run on, ```SECRET``` to sign JSON web tokens, ```EXPIRY``` time for tokens, and API ```KEY``` for the Movie DB API. Then, run ```npm install``` in a terminal window at the root of your repository to install all the needed dependencies for the server.

Next, you need to start you local database and psql in a different terminal window. Once started, run the command ```CREATE DATABASE movie_collection;``` to create the database for your web application to use. Knex.js is a tool I used to interact with the database, and running ```knex migrate:latest``` from the terminal window of your repository will create the tables in your database.

With environmental variables, Node packages, PostgreSQL databse, and freshly created tables, you should now be able to start up the server with ```npm start``` or ```nodemon``` from the terminal window of the repository.

If all is going well, you will be able to open up the web app in your browser. Then, you will be able to use the app to create an account and log in.