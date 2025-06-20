import { Router } from "express";
import { TeachersController } from "./controller";
import { TeacherService } from "../service/teacher.service";
import { uploadSingleFile } from "../middleware/uploadMiddleware";

export class TeachersRoutes {

    static get routes(): Router {
     const router = Router();

     const teacherService = new TeacherService();
     
     const teacherController = new TeachersController(teacherService);
    
     router.post('/', uploadSingleFile, teacherController.registerTeacher as any);
     router.patch('/:id', uploadSingleFile, teacherController.updateTeacherById as any);
     router.get('/', teacherController.getTechers);
     router.get('/:id', teacherController.getTecherById);
     router.delete('/:id', teacherController.deleteTecher);
     
     return router;  
    }

}