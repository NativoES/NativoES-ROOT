import { Router } from "express";
import { EnlaceExternoService } from "../services/enlaces-externos.service";
import { EnlacesExternosController } from "./controller";

export class EnlaceExternoRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new EnlaceExternoService();
    const controller = new EnlacesExternosController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
