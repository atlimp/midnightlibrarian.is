up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --scale api=2 -d


down:
	docker-compose down --remove-orphans

build-dev: 
	docker-compose build

build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
