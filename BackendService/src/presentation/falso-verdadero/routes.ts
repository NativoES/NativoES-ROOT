import { Router } from "express";
import { FalsoVerdaderoService } from "../services/falso-verdadero.service";
import { FalsoVerdaderoController } from "./controller";

export class FalsoVerdaderoRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new FalsoVerdaderoService();
    const controller = new FalsoVerdaderoController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
