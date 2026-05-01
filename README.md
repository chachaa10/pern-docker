# Start with hot reload (bind mounts + tsx watch)

docker compose -f docker-compose.dev.yml up

# Start in detached mode (background)

docker compose -f docker-compose.dev.yml up -d

# Stop containers (keeps volumes/data)

docker compose -f docker-compose.dev.yml down

# Stop + remove volumes (⚠️ deletes DB data!)

docker compose -f docker-compose.dev.yml down -v

# Stop + remove volumes + images

docker compose -f docker-compose.dev.yml down -v --rmi all

# View live logs (all services)

docker compose -f docker-compose.dev.yml logs -f

# View logs for specific service

docker compose -f docker-compose.dev.yml logs -f backend
docker compose -f docker-compose.dev.yml logs -f db

# Shell into running container

docker compose -f docker-compose.dev.yml exec backend sh
docker compose -f docker-compose.dev.yml exec db psql -U postgres -d pern_db

# Check container status

docker compose -f docker-compose.dev.yml ps

# Inspect container details (network, mounts, env)

docker inspect pern-docker-backend-1

# Rebuild only backend (after package.json changes)

docker compose -f docker-compose.dev.yml build --no-cache backend

# Rebuild all services

docker compose -f docker-compose.dev.yml build --no-cache

# Restart a single service (e.g., after adding a dependency)

docker compose -f docker-compose.dev.yml restart backend

# Force recreate containers (keeps volumes)

docker compose -f docker-compose.dev.yml up --force-recreate

# Connect to Postgres CLI

docker compose -f docker-compose.dev.yml exec db psql -U postgres -d pern_db

# Run SQL file inside container

docker compose -f docker-compose.dev.yml exec -T db psql -U postgres -d pern_db < ./schema.sql

# Backup database to local file

docker compose -f docker-compose.dev.yml exec -T db pg_dump -U postgres pern_db > backup.sql

# Restore from backup

docker compose -f docker-compose.dev.yml exec -T db psql -U postgres -d pern_db < backup.sql

# Reset database (⚠️ destructive!)

docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up -d db
