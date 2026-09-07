import { injectable, inject } from "tsyringe";
import { LinksRepository, LinksRepositoryToken } from "../../repositories/links-repository";
import { Link } from "../../entities/link";
import { AppError } from "../../../../shared/errors/app-error";

@injectable()
export class GetOriginalUrlUseCase {
  constructor(
    @inject(LinksRepositoryToken) private linksRepository: LinksRepository
  ) {}

  async execute(shortUrl: string): Promise<Link> {
    const link = await this.linksRepository.findByShortUrl(shortUrl);
    if (!link) {
      throw new AppError("Link not found", 404); 
    }
    await this.linksRepository.incrementAccessCount(link.id);
    return link;
  }
}
