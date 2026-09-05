import { injectable, inject } from "tsyringe";
import { LinksRepository, LinksRepositoryToken } from "../../repositories/links-repository";
import { Link } from "../../entities/link";
import { CreateLinkDTO } from "../../dtos/create-link.dto";
import { AppError } from "../../../../shared/errors/app-error";
@injectable()
export class CreateLinkUseCase {
    constructor(
    @inject(LinksRepositoryToken) private linksRepository: LinksRepository
  ) {}
  async execute(data: CreateLinkDTO): Promise<Link> {
    const existingLink = await this.linksRepository.findByShortUrl(data.shortUrl);
    if (existingLink) {
      throw new AppError("Short URL already exists", 409);
    }
    return this.linksRepository.create(data);
  }
}