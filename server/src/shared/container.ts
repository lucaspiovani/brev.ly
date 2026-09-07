import { container } from "tsyringe";
import {
  LinksRepository,
  LinksRepositoryToken,
} from "../modules/links/repositories/links-repository";
import { R2StorageProvider } from "../infra/storage/r2-storage-provider";
import { DrizzleLinksRepository } from "../infra/db/drizzle-links-repository";
import { LinksStorageProvider, StorageProvider } from "../infra/storage/storage-provider";

// Aqui é o ÚNICO lugar do projeto que conhece a implementação concreta.
// Se um dia trocarmos Drizzle por outro ORM, ou criarmos um repositório
// em memória para testes, a mudança acontece só nesta linha.
container.registerSingleton<LinksRepository>(
  LinksRepositoryToken,
  DrizzleLinksRepository
);

container.registerSingleton<StorageProvider>(
  LinksStorageProvider,
  R2StorageProvider
);

export { container };
