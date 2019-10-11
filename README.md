# Calorie Basic API
This is the api for the caloriebasic mobile first web application.

#### This API supports:
	Registering a new user
	Logging In
	Logging Out
	Logging Out All Devices
	Get User
	Create Calories
	Get Calories

#### Postman Collection
	Open Postman
	Select Import
	Select File: caloriebasic.postman_collection.json

## Install and Run
	git clone https://github.com/abeatrice/caloriebasic-api.git
	cd caloriebasic-api
	cp .env.example .env
		nano .env
			MONGODB_URL=mongodb+srv://<username>:<password>@example.mongodb.net/
			JWT_KEY=randomExampleKeyHere
	npm install
	npm install pm2@latest -g 
	pm2 start src/app.js --name caloriebasic-api

## Test
	npm test