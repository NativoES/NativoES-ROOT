import { Router } from "express";
import { PlanService } from "../service/plan.service";
import { PlanController } from "./controller";
import { uploadSingleFile } from "../middleware/uploadMiddleware";

export class PlanRoutes {
    static get routes(): Router {
        const router = Router();

        const planService = new PlanService();
        const planController = new PlanController(planService);
    
        router.post("/", uploadSingleFile, planController.register as any);
        router.get("/", planController.getAll);
        router.get("/:id", planController.getById);
        router.patch("/:id", uploadSingleFile, planController.update as any);
        router.delete("/:id", planController.delete);
    
        return router;
    }
}