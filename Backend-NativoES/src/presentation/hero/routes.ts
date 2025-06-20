import { Router } from "express";
import { HeroController } from "./controller";
import { HeroService } from "../service";
import { uploadSingleFile } from "../middleware/uploadMiddleware";

export class HeroRoutes {
  static get routes(): Router {
    const router = Router();

    const heroService = new HeroService();

    const heroController = new HeroController(heroService);

    router.post("/", uploadSingleFile,  heroController.registerHero as any);
    router.patch("/:id", uploadSingleFile, heroController.updateHeroById as any);
    router.get("/", heroController.getAllHeroes);
    router.get("/:id", heroController.getHeroById);
    router.delete("/:id", heroController.deleteHeroById);

    return router;
  }
}
