import { Router } from "express";
import { OrdenarPalabrasService } from "../services/ordenar-palabra.service";
import { OrdenarPalabrasController } from "./controller";

export class OrdenarPalabrasRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new OrdenarPalabrasService();
    const controller = new OrdenarPalabrasController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
