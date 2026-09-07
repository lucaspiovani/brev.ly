import { injectable, inject } from "tsyringe";
import { LinksRepository, LinksRepositoryToken } from "../../repositories/links-repository";
import { randomUUID } from 'node:crypto'
import { LinksStorageProvider, StorageProvider } from "../../../../infra/storage/storage-provider";

const joinCsv = (value: string | number) =>
  `"${String(value).replaceAll('"', '""')}"`

@injectable()
export class ExportLinksUseCase {
  constructor(
    @inject(LinksRepositoryToken) private linksRepository: LinksRepository,
    @inject(LinksStorageProvider) private linksStorageProvider: StorageProvider
  ) {}

    async execute(): Promise<{ url: string }> {
        const links = await this.linksRepository.findAll();
        const rows = [
            ['URL original', 'URL encurtada', 'Contagem de acessos', 'Data de criação'],
            ...links.map((link) => [
            link.originalUrl,
            link.shortUrl,
            link.accessCount,
            link.createdAt.toISOString(),
            ]),
        ];
        const csv = rows.map((row) => row.map(joinCsv).join(',')).join('\n');
        
        const { url } = await this.linksStorageProvider.upload({
        key: `exports/${randomUUID()}.csv`,
        contentType: 'text/csv; charset=utf-8',
        body: new TextEncoder().encode(`\uFEFF${csv}`),
        })
        return { url };
    }
}
