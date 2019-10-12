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
