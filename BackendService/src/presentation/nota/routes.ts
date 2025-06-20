import { Router } from "express";
import { NotaService } from "../services/nota.service";
import { NotaController } from "./controller";

export class NotaRoutes {
  static get routes(): Router {
    const router = Router();

    const notaService = new NotaService();
    const notaController = new NotaController(notaService);

    router.post("/", notaController.create as any);
    router.patch("/:id", notaController.update as any);
    router.get("/", notaController.getAll);
    router.get("/:id", notaController.getById);
    router.delete("/:id", notaController.delete);

    return router;
  }
}
