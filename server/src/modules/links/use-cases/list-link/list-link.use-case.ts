import { injectable, inject } from "tsyringe";
import { LinksRepository, LinksRepositoryToken } from "../../repositories/links-repository";
import { Link } from "../../entities/link";
@injectable()
export class ListLinksUseCase {
    constructor(
    @inject(LinksRepositoryToken) private linksRepository: LinksRepository
  ) {}
  async execute(): Promise<Link[]> {
    return this.linksRepository.findAll();
  }
}
    