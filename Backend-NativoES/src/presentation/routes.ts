import { Router } from "express";
import { TeachersRoutes } from "./teacher/routes";
import { HeroRoutes } from "./hero/routes";
import { CourseRoutes } from "./course/routes";
import { PlanRoutes } from "./plan/routes";
import { ReviewRoutes } from "./review/routes";
import { InformationRoutes } from "./information/routes";
import { FormStudyRoutes } from "./form-study/routes";
import { MethodCourseRoutes } from "./method-course/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/landing/teacher", TeachersRoutes.routes);
    router.use("/api/landing/hero", HeroRoutes.routes);
    router.use("/api/landing/course", CourseRoutes.routes);
    router.use("/api/landing/plan", PlanRoutes.routes);
    router.use("/api/landing/review", ReviewRoutes.routes);
    router.use("/api/landing/information", InformationRoutes.routes);
    router.use("/api/form-study", FormStudyRoutes.routes);
    router.use("/api/landing/method-course", MethodCourseRoutes.routes);

    return router;
  }
}
