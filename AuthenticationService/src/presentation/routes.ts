import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { EnrollmentRoutes } from "./enrollment/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users/user", UserRoutes.routes);
    router.use("/api/users/auth", AuthRoutes.routes);
    router.use("/api/users/enrollment", EnrollmentRoutes.routes);
    
    return router;
  }
}
