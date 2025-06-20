import { Router } from "express";
import { FormStudyService } from "../service";
import { FormStudyController } from "./controller";
import { uploadSingleFile } from "../middleware/uploadMiddleware";


export class FormStudyRoutes {
  static get routes(): Router {
    const router = Router();

    const formStudyService = new FormStudyService();
    const formStudyController = new FormStudyController(formStudyService);

    router.post("/", uploadSingleFile, formStudyController.registerFormStudy as any);
    router.patch("/:id", uploadSingleFile, formStudyController.updateFormStudy as any);
    router.get("/:id", formStudyController.getFormStudyById);
    router.get("/", formStudyController.getAllFormStudy);
    router.delete("/:id", formStudyController.deleteFormStudy);

    return router;
  }
}