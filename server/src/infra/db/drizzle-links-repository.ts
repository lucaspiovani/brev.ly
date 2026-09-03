import { injectable } from "tsyringe";
import { eq, sql } from "drizzle-orm";
import { db } from "./client";
import { links } from "./schema";
import { LinksRepository } from "../../modules/links/repositories/links-repository";
import { Link } from "../../modules/links/entities/link";
import { CreateLinkDTO } from "../../modules/links/dtos/create-link.dto";

@injectable()
export class DrizzleLinksRepository implements LinksRepository {
  async create(data: CreateLinkDTO): Promise<Link> {
    const [link] = await db.insert(links).values(data).returning();
    return link;
  }

  async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortUrl, shortUrl));
    return link ?? null;
  }

  async findById(id: string): Promise<Link | null> {
    const [link] = await db.select().from(links).where(eq(links.id, id));
    return link ?? null;
  }

  async findAll(): Promise<Link[]> {
    // RF04: listagem performática — ordenar por criação, sem N+1
    // (não há relacionamentos ainda; se o CSV/relatório crescer,
    // considerar paginação aqui).
    return db.select().from(links).orderBy(links.createdAt);
  }

  async delete(id: string): Promise<void> {
    await db.delete(links).where(eq(links.id, id));
  }

  async incrementAccessCount(id: string): Promise<void> {
    await db
      .update(links)
      .set({ accessCount: sql`${links.accessCount} + 1` })
      .where(eq(links.id, id));
  }
}
