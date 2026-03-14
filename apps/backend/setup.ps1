Write-Host "Initialization Gontobbo Backend" -ForegroundColor Cyan

# Ensure .env exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env from .env.example" -ForegroundColor Yellow
    Copy-Item .env.example .env
}

# Environment variable loader
function Load-Env {
    param($Path)
    if (Test-Path $Path) {
        Get-Content $Path | ForEach-Object {
            if ($_ -match '^([^#].+?)=(.+)$') {
                $name = $matches[1].Trim()
                $value = $matches[2].Trim().Trim('"').Trim("'")
                [System.Environment]::SetEnvironmentVariable($name, $value)
            }
        }
    }
}

Load-Env ".env"

$containerName = [System.Environment]::GetEnvironmentVariable("DB_CONTAINER")
if ([string]::IsNullOrWhiteSpace($containerName)) { $containerName = "gontobbo_pg_container" }

$dbUser = [System.Environment]::GetEnvironmentVariable("DB_USER")
if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "postgres" }

$dbName = [System.Environment]::GetEnvironmentVariable("DB_NAME")
if ([string]::IsNullOrWhiteSpace($dbName)) { $dbName = "gontobbo" }

# Infrastructure Start
Write-Host "Starting Docker containers" -ForegroundColor Blue
docker-compose up -d

Write-Host "Waiting for database (10s)" -ForegroundColor Magenta
Start-Sleep -Seconds 10

# Preparation
Write-Host "Installing dependencies" -ForegroundColor Blue
yarn install

Write-Host "Enabling pgvector extension" -ForegroundColor Magenta
docker exec $containerName psql -U $dbUser -d $dbName -c "CREATE EXTENSION IF NOT EXISTS vector;"

Write-Host "Running vector test" -ForegroundColor Yellow
docker exec $containerName psql -U $dbUser -d $dbName -c "CREATE TABLE IF NOT EXISTS test_items (id SERIAL PRIMARY KEY, embedding VECTOR(3));"
docker exec $containerName psql -U $dbUser -d $dbName -c "INSERT INTO test_items (embedding) VALUES ('[0.1, 0.2, 0.3]'), ('[0.4, 0.5, 0.6]');"
docker exec $containerName psql -U $dbUser -d $dbName -c "SELECT * FROM test_items;"

# Database Sync
Write-Host "Processing Prisma migrations" -ForegroundColor Blue
npx prisma generate
yarn prisma:migrate

Write-Host "`nSetup complete. Run yarn dev to start the server." -ForegroundColor Green
