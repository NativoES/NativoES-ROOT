import { Router } from "express";
import { OrdenarTextoService } from "../services/ordenar-texto.service";
import { OrdenarTextoController } from "./controller";

export class OrdenarTextoRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new OrdenarTextoService();
    const controller = new OrdenarTextoController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
