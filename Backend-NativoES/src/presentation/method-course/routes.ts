import { MethodCourseService } from "../service";
import { MethodCourseController } from "./controller";


export class MethodCourseRoutes {
  static get routes() {
    const router = require("express").Router();
 
    const methodCourseService = new MethodCourseService();
    const methodCourseController = new MethodCourseController(methodCourseService);

    router.post("/", methodCourseController.create);
    router.patch("/:id", methodCourseController.update);
    router.get("/", methodCourseController.getAll);
    router.get("/:id", methodCourseController.getById);
    router.delete("/:id", methodCourseController.delete);

    return router;
  }
}