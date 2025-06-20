import { Router } from "express";
import { AudioService } from "../services/audio.service";
import { AudioController } from "./controller";
import { uploadSingleFile } from "../middleware/uploadMiddleware";

export class AudioRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new AudioService();
    const controller = new AudioController(service);

    router.post("/", uploadSingleFile, controller.create as any);
    router.patch("/:id", uploadSingleFile, controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
