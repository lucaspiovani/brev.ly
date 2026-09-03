pnpm init -y
pnpm add fastify @fastify/cors drizzle-orm pg zod reflect-metadata tsyringe dotenv
pnpm add -D typescript @types/node @types/pg tsx drizzle-kit
pnpm exec tsc --noEmit
docker compose up -d
docker ps
cp .env.example .env
pnpm exec drizzle-kit generate