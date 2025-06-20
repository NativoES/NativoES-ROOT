import { Router } from "express";
import { CompletarTextoService } from "../services/completar-texto.service";
import { CompletarTextoContreller } from "./controller";


export class CompletarTextoRoutes {
    static get routes(): Router {
        const router = Router();
    
        const ctService = new CompletarTextoService();
    
        const ctController = new CompletarTextoContreller(ctService);
    
        router.post("/", ctController.createCT as any);
        router.patch("/:id", ctController.updateCT as any);
        router.get("/", ctController.getAllCT);
        router.get("/:id", ctController.getCTById);
        router.delete("/:id", ctController.deleteCT);
    
        return router;
    }
}