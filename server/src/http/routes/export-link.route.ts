import { FastifyInstance } from "fastify";
import { container } from "../../shared/container";
import { ExportLinksUseCase } from "../../modules/links/use-cases/export-link/export-links.use-case";

export async function exportLinksRoute(app: FastifyInstance) {
  app.get("/exportLinks", async (request, reply) => {
    const exportLinksUseCase = container.resolve(ExportLinksUseCase);
    const { url } = await exportLinksUseCase.execute();

    return reply.send({ url });
  });
}