import { Router } from "express";
import { uploadSingleFile } from "../middleware/uploadMiddleware";
import { VideoController } from "./controller";
import { VideoService } from "../services/video.service";

export class VideoRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new VideoService();
    const controller = new VideoController(service);

    router.post("/", uploadSingleFile, controller.create as any);
    router.patch("/:id", uploadSingleFile, controller.update as any);
    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
