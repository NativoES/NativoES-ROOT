import { Router } from "express";
import { ClassesService } from "../services/class.service";
import { ClassesController } from "./controller";
import { uploadSingleFile } from "../middleware/uploadMiddleware";

export class ClassRoutes {
    static get routes(): Router {
        const router = Router();
    
        const classService = new ClassesService();
    
        const classController = new ClassesController(classService);
    
        router.post("/", uploadSingleFile, classController.createClass as any);
        router.patch("/:id", uploadSingleFile, classController.updateClass as any);
        router.get("/", classController.getAllClasses as any);
        router.get("/:id", classController.getClassById);
        router.delete("/:id", classController.deleteClass);
    
        return router;
    }
}