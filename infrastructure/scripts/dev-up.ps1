Copy-Item .env.example .env -ErrorAction SilentlyContinue
docker compose -f infrastructure/docker/docker-compose.yml up -d
cmd /c npm install
python -m pip install -e apps/api
python -m pip install -e apps/gateway
alembic upgrade head
python database/seeds/seed_demo.py

