import { FastifyInstance } from "fastify";
import { container } from "../../shared/container";
import { GetOriginalUrlUseCase } from "../../modules/links/use-cases/get-original-url/get-original-url.use-case";


export async function findUrlOriginalLinkRoute(app: FastifyInstance) {
  app.get("/links/:shortUrl", async (request, reply) => {
    const { shortUrl } = request.params as { shortUrl: string };
    const getOriginalUrlUseCase = container.resolve(GetOriginalUrlUseCase);
    const link = await getOriginalUrlUseCase.execute(shortUrl);
    return reply.send({ originalUrl: link.originalUrl });
  });
}