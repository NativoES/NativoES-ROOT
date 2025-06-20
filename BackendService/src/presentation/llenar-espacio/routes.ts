import { Router } from "express";
import { LlenarEspaciosService } from "../services/llenar-espacio.service";
import { LlenarEspaciosController } from "./controller";


export class LlenarEspaciosRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new LlenarEspaciosService();
    const controller = new LlenarEspaciosController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
