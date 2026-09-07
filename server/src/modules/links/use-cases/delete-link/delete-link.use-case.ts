import { injectable, inject } from "tsyringe";
import { LinksRepository, LinksRepositoryToken } from "../../repositories/links-repository";
import { AppError } from "../../../../shared/errors/app-error";

@injectable()
export class DeleteLinkUseCase {
  constructor(
    @inject(LinksRepositoryToken) private linksRepository: LinksRepository
  ) {}

  async execute(id: string): Promise<void> {
    const link = await this.linksRepository.findById(id);

    if (!link) {
      throw new AppError("Link not found", 404);
    }

    await this.linksRepository.delete(id);
  }
}