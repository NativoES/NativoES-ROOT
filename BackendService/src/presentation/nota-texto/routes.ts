import { Router } from "express";
import { NotaTextoService } from "../services/nota-texto.service";
import { NotaTextoController } from "./controller";

export class NotaTextoRoutes {
  static get routes(): Router {
    const router = Router();

    const notaTextoService = new NotaTextoService();
    const notaTextoController = new NotaTextoController(notaTextoService);

    router.post("/", notaTextoController.create as any);
    router.patch("/:id", notaTextoController.update as any);
    router.get("/", notaTextoController.getAll);
    router.get("/:id", notaTextoController.getById);
    router.delete("/:id", notaTextoController.delete);

    return router;
  }
}
