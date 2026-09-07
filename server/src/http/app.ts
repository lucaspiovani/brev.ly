import Fastify from "fastify";
import cors from "@fastify/cors";
import { createLinkRoute } from "./routes/create-link.route";
import { ZodError } from 'zod'
import { AppError } from "../shared/errors/app-error";
import { deleteLinkRoute } from "./routes/delete-link.route";
import { listLinksRoute } from "./routes/list-link.route";

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

  app.register(createLinkRoute);
  app.register(deleteLinkRoute);
  app.register(listLinksRoute);
  app.setErrorHandler((error, _request, reply) => {
    console.log(error);
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({ message: error.message });
    }

    if (error instanceof ZodError) {
      const errors = error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return reply.status(400).send({
        message: "Dados inválidos.",
        errors,
      });
    }

    app.log.error(error);
    return reply.status(500).send({ message: "Erro interno do servidor." });
  });
  return app;
}