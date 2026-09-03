import "reflect-metadata"; // precisa ser o primeiro import (requisito do tsyringe)

import { buildApp } from "./app";
import { env } from "../env";

const app = buildApp();

app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => console.log(`🔗 Brev.ly server running on port ${env.PORT}`));