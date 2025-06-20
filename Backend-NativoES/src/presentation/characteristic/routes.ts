import { Router } from "express";
import { uploadSingleFile } from "../middleware/uploadMiddleware";
import { CharacteristicService } from "../service/characteristic.service";
import { CharacteristicController } from "./controller";


export class CharacteristicRoutes {
  static get routes(): Router {
    const router = Router();

    const characteristicService = new CharacteristicService();
    const characteristicController = new CharacteristicController(characteristicService);

    router.post("/", uploadSingleFile, characteristicController.registerCharacteristic as any);
    router.patch("/:id", uploadSingleFile, characteristicController.updateCharacteristic as any);
    router.get("/:id", characteristicController.getCharasteristicById);
    router.get("/", characteristicController.getAllCharasteristics);
    router.delete("/:id", characteristicController.deleteCharacteristic);

    return router;
  }
}