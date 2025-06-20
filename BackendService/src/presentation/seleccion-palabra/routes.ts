import { Router } from "express";
import { SeleccionPalabrasService } from "../services/seleccion-palabra.service";
import { SeleccionPalabrasController } from "./controller";

export class SeleccionPalabrasRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new SeleccionPalabrasService();
    const controller = new SeleccionPalabrasController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
