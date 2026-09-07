import { FastifyInstance } from "fastify";
import { DeleteLinkUseCase } from "../../modules/links/use-cases/delete-link/delete-link.use-case";
import { container } from "../../shared/container";

export async function deleteLinkRoute(app: FastifyInstance) {
  app.delete("/links/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const deleteLinkUseCase = container.resolve(DeleteLinkUseCase);
    await deleteLinkUseCase.execute(id);
    return reply.status(204).send();
  });
}