import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.string().url("Informe uma url válida."),
  shortUrl: z
    .string()
    .min(3, "Mínimo de 3 caracteres.")
    .regex(/^[a-zA-Z0-9_-]+$/, "Use apenas letras, números, hífen ou underscore."),
});

export type CreateLinkFormData = z.infer<typeof createLinkSchema>;