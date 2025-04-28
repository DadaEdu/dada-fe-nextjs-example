#! /bin/bash
# NOTE: YOU NEED TO CREATE production.env before running this script!

echo "started: deploy thinking-v2-default-plugin-nextjs"
echo "script created by Jiho Park (jiho@dadaedu.co.kr)"

docker login ghcr.io -u <username>
docker compose pull
docker compose up --build -d
docker logout ghcr.io

echo "completed!"