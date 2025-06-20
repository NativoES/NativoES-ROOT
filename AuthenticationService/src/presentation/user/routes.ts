import { Router } from "express";
import { uploadSingleFile } from "../middleware/uploadMiddleware";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new UserService();
    const controller = new UserController(service);

    router.post("/", uploadSingleFile, controller.create as any);
    router.patch("/:id", uploadSingleFile, controller.update as any);
    router.get("/", controller.getAll as any);
    router.get("/userSpecific", controller.getAllUserByRol as any);
    router.get("/profile", controller.getUserByToken);
    router.get("/:id", controller.getById);
    router.delete("/:id", controller.delete);

    return router;
  }
}
