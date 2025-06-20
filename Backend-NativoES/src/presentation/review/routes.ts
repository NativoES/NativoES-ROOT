import { Router } from "express";
import { ReviewService } from "../service/review.service";
import { ReviewController } from "./controller";
import { uploadSingleFile } from "../middleware/uploadMiddleware";


export class ReviewRoutes {
    static get routes(): Router {

        const router = Router();

        const reviewService = new ReviewService();
        const reviewController = new ReviewController(reviewService);

        router.post("/", uploadSingleFile, reviewController.register as any);
        router.get("/", reviewController.getAll);
        router.get("/:id", reviewController.getById);
        router.patch("/:id", uploadSingleFile, reviewController.update as any);
        router.delete("/:id", reviewController.delete);

        return router;
    }
}