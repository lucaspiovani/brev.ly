import Fastify from "fastify";
import cors from "@fastify/cors";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: true, // TODO: restringir ao VITE_FRONTEND_URL quando o front estiver definido
  });

  app.get("/health", async () => {
    return { status: "ok" };
  });

  // TODO (próximas etapas): registrar as rotas de /links aqui,
  // conectando cada Controller ao seu respectivo UseCase via container.

  return app;
}