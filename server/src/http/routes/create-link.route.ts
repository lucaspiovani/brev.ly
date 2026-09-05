import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { container } from "../../shared/container";
import { CreateLinkUseCase } from "../../modules/links/use-cases/create-link/create-link.use-case"

const shortUrl = z.string().min(3).max(40)
  .regex(/^[a-zA-Z0-9_-]+$/, "O identificador deve conter apenas letras, números, hífen ou underscore.")
  .describe('Identificador único usado na URL encurtada.')

const PostLinkSchema = z.object({
        originalUrl: z.url().describe('URL completa de destino.'),
        shortUrl
})
export async function createLinkRoute(app: FastifyInstance) {
  app.post("/links", async (request, reply) => {
    const data = PostLinkSchema.parse(request.body);
    const createLinkUseCase = container.resolve(CreateLinkUseCase);
    const link = await createLinkUseCase.execute(data);
    reply.status(201).send(link)
  });
}