import { Router } from "express";
import { NativoesService } from "../services/nativoes.service";
import { NativoesController } from "./controller";


export class NativoesRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new NativoesService();

        const controller = new NativoesController(service);

        router.get("/public-exercise", controller.getAllPublicExercises);
        router.get("/:id", controller.getAllExcercise as any);
        router.delete("/:id", controller.delete);

        return router;
    }
}