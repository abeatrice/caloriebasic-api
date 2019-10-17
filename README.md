# Calorie Basic API
This is the api for the caloriebasic web application.

### This API supports:
	Registering a new user
	Logging In
	Logging Out
	Logging Out All Devices
	Get User
	Create Calories
	Get Calories

### Postman Collection
	Download Postman: https://www.getpostman.com/
	Open Postman
	Select Import
	Select File: caloriebasic.postman_collection.json

## Installation Requirements

```
docker
docker-compose
make
```

## Makefile Commands

Everything that requires a node environment should be done inside a docker container
created from the image at this root.

```
- build
  will build the docker container with `docker-compose`

- run
  runs the server inside docker

- stop
  stops docker-compose and removes volumes and images
```
### Install dependencies
	$ sudo apt-get install nodejs
	$ apt-get install nginx
	$ npm install pm2@latest -g 

### Install and Run
	$ git clone https://github.com/abeatrice/caloriebasic-api.git
	$ cd caloriebasic-api
	$ cp .env.example .env
		$ nano .env
			MONGODB_URL=mongodb+srv://<username>:<password>@example.mongodb.net/
			JWT_KEY=randomExampleKeyHere
	$ npm install
	$ pm2 start src/app.js --name caloriebasic-api

### Nginx
	$ sudo nano /etc/nginx/sites-available/caloriebasic-api
		server {
			listen 3001;

			server_name localhost;

			location / {
					proxy_pass http://localhost:3000;
					proxy_http_version 1.1;
					proxy_set_header Upgrade $http_upgrade;
					proxy_set_header Connection 'upgrade';
					proxy_set_header Host $host;
					proxy_cache_bypass $http_upgrade;
			}
		}
	$ sudo ln -s /etc/nginx/sites-available/caloriebasic-api /etc/nginx/sites-enabled/caloriebasic-api
	$ sudo systemctl restart nginx

### firewall
	$ sudo ufw allow 3001

## Local Testing
	$ npm test
