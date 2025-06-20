import { Router } from "express";
import { uploadSingleFile } from "../middleware/uploadMiddleware";
import { GifService } from "../services/gif.service";
import { GifController } from "./controller";

export class GifRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new GifService();
    const controller = new GifController(service);

    router.post("/", uploadSingleFile, controller.create as any);
    router.patch("/:id", uploadSingleFile, controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
