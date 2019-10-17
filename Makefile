default: build

.PHONY: build
build:
	docker-compose build

.PHONY: run
run:
	docker-compose up

.PHONY: stop
stop:
	docker-compose stop
	docker-compose down --volumes --remove-orphans --rmi all
