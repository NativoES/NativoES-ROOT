import { Router } from "express";
import { uploadSingleFile } from "../middleware/uploadMiddleware";
import { ImageController } from "./controller";
import { ImageService } from "../services/image.service";

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new ImageService();
    const controller = new ImageController(service);

    router.post("/", uploadSingleFile, controller.create as any);
    router.patch("/:id", uploadSingleFile, controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
