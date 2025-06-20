import { Router } from "express";
import { FormarPalabrasController } from "./controller";
import { FormarPalabrasService } from "../services/formar-palabras.service";

export class FormarPalabrasRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new FormarPalabrasService();
    const controller = new FormarPalabrasController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
