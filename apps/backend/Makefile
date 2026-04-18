# Makefile for Gontobbo Backend

# Load environment variables
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Defaults
DB_CONTAINER ?= gontobbo_pg_container
DB_USER ?= postgres
DB_NAME ?= gontobbo

.PHONY: setup up down migrate seed dev shell logs test-vector clean-setup

setup:
	@echo Starting Gontobbo Backend initialization
	@[ -f .env ] || cp .env.example .env
	docker-compose up -d
	@echo Waiting for database to be ready
	@sleep 10
	yarn install
	docker exec $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -c "CREATE EXTENSION IF NOT EXISTS vector;"
	npx prisma generate
	yarn prisma:migrate
	@echo Setup complete. Run make dev to start the server.

up:
	docker-compose up -d

down:
	docker-compose down

clean-setup:
	docker-compose down -v
	$(MAKE) setup

migrate:
	yarn prisma:migrate

seed:
	npx prisma db seed

dev:
	yarn dev

logs:
	docker-compose logs -f

db-shell:
	docker exec -it $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME)

pgvector:
	docker exec $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -c "CREATE EXTENSION IF NOT EXISTS vector;"

test-vector:
	docker exec $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -c "CREATE TABLE IF NOT EXISTS test_items (id SERIAL PRIMARY KEY, embedding VECTOR(3));"
	docker exec $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -c "INSERT INTO test_items (embedding) VALUES ('[0.1, 0.2, 0.3]'), ('[0.4, 0.5, 0.6]');"
	docker exec $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -c "SELECT * FROM test_items;"
	@echo Vector test complete.