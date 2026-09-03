import { injectable } from "tsyringe";
import { eq, sql } from "drizzle-orm";
import { db } from "./client";
import { links } from "./schema";

@injectable()
export class DrizzleLinksRepository {
  
}
