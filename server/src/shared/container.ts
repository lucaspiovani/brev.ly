import { container } from "tsyringe";
import {
  LinksRepository,
  LinksRepositoryToken,
} from "../modules/links/repositories/links-repository";
import { DrizzleLinksRepository } from "../infra/db/drizzle-links-repository";

// Aqui é o ÚNICO lugar do projeto que conhece a implementação concreta.
// Se um dia trocarmos Drizzle por outro ORM, ou criarmos um repositório
// em memória para testes, a mudança acontece só nesta linha.
container.registerSingleton<LinksRepository>(
  LinksRepositoryToken,
  DrizzleLinksRepository
);

export { container };
