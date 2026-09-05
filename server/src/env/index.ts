import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),

  // Opcionais por enquanto: só se tornam obrigatórios quando o
  // ExportLinksUseCase (upload do CSV) for implementado.
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().optional(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_BUCKET: z.string().optional(),
  CLOUDFLARE_PUBLIC_URL: z.string().url().optional(),
});


export const env = envSchema.parse(process.env);