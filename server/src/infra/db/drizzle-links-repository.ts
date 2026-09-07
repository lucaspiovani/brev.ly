import { injectable } from "tsyringe";
import { db } from "./client";
import { links } from "./schema";
import { LinksRepository } from "../../modules/links/repositories/links-repository";
import { CreateLinkDTO } from "../../modules/links/dtos/create-link.dto";
import { Link } from "../../modules/links/entities/link";
import { eq } from "drizzle-orm";

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

  async delete(id: string): Promise<void> {
    await db.delete(links).where(eq(links.id, id));
  }

  async findAll(): Promise<Link[]> {
    return db.select().from(links).orderBy(links.createdAt);
  }
}
