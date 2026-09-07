import { FastifyInstance } from "fastify";
import { container } from "../../shared/container";
import { ListLinksUseCase } from "../../modules/links/use-cases/list-link/list-link.use-case";

export async function listLinksRoute(app: FastifyInstance) {
  app.get("/links", async (request, reply) => {
    const listLinksUseCase = container.resolve(ListLinksUseCase);
    const links = await listLinksUseCase.execute();
    return reply.send(links);
  });
}