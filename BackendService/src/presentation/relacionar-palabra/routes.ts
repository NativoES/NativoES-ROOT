import { Router } from "express";
import { RelacionarPalabrasService } from "../services/relacionar-palabra.service";
import { RelacionarPalabrasController } from "./controller";

export class RelacionarPalabraRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new RelacionarPalabrasService();
    const controller = new RelacionarPalabrasController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
