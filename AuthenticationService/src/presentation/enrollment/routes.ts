import { Router } from "express";
import { EnrollmentService } from "../services/enrollment.service";
import { EnrollmentController } from "./controller";

export class EnrollmentRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new EnrollmentService();
    const controller = new EnrollmentController(service);

    router.post("/", controller.create as any);
    router.patch("/:id", controller.update as any);

    router.get("/students", controller.getStudentsByClase as any);

    router.get("/:id", controller.getById);
    router.get("/:claseId", controller.getAllByClase);
    router.delete("/:id", controller.delete);

    return router;
  }
}
