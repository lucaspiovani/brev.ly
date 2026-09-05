import { Link } from "../entities/link";
import { CreateLinkDTO } from "../dtos/create-link.dto";

export const LinksRepositoryToken = Symbol("LinksRepository");

export abstract class LinksRepository {
  abstract create(data: CreateLinkDTO): Promise<Link>;
  abstract findByShortUrl(shortUrl: string): Promise<Link | null>;
}