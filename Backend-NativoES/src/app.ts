import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongo/mongo-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({ mongoUrl: envs.MONGO_URL });
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });

  server.start();
}
