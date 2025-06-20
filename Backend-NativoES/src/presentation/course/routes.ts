import { Router } from "express";
import { CourseService } from "../service";
import { CourseController } from "./controller";


export class CourseRoutes {
    static get routes(): Router {
        const router = Router();
    
        const courseService = new CourseService();
    
        const courseController = new CourseController(courseService);
    
        router.post("/", courseController.createCourse as any);
        router.patch("/:id", courseController.updateCourse as any);
        router.get("/", courseController.getAllCourses);
        router.get("/:id", courseController.getCourseById);
        router.delete("/:id", courseController.deleteCourse);
    
        return router;
    }
}