import { Router } from "express";
import { InformationService } from "../service";
import { InformationController } from "./controller";


export class InformationRoutes {
  static get routes(): Router {
    const router = Router();

    const informationService = new InformationService();
    const informationController = new InformationController(informationService);

    router.post("/", informationController.registerIinformation as any);
    router.patch("/:id", informationController.updateInformation as any);
    router.get("/:id", informationController.getInformationById);
    router.get("/", informationController.getAllInformation);
    router.delete("/:id", informationController.deleteInformation);

    return router;
  }
}