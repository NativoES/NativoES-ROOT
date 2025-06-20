import { Response, Request } from "express";
import { CustomError, RegisterReviewDto, UpdateReviewDto } from "../../domain";
import { ReviewService } from "../service/review.service";

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  register = (req: Request, res: Response) => {
    // Parsear manualmente los campos que vienen como JSON strings
    if (typeof req.body.resennia === "string") {
      req.body.resennia = JSON.parse(req.body.resennia);
    }

    if (typeof req.body.respuestas === "string") {
      req.body.respuestas = JSON.parse(req.body.respuestas);
    }

    const [error, dto] = RegisterReviewDto.create(req.body);

    console.log("register data: ", req.body); // Ahora los objetos están parseados
    console.log("register data dto: ", dto);

    if (error) return res.status(400).json({ error });

    const file = req.file ? req.file : undefined;

    this.reviewService
      .register(dto!, file)
      .then((review) => res.json(review))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (_req: Request, res: Response) => {
    const { locale } = _req.query;
    this.reviewService
      .getAll(locale as string)
      .then((reviews) => res.json(reviews))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    this.reviewService
      .getById(req.params.id)
      .then((review) => res.json(review))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const { locale } = req.body;
    if (typeof req.body.resennia === "string") {
      req.body.resennia = JSON.parse(req.body.resennia);
    }

    if (typeof req.body.respuestas === "string") {
      req.body.respuestas = JSON.parse(req.body.respuestas);
    }

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }

    const [error, dto] = UpdateReviewDto.create(req.body);

    console.log("data: ", dto);
    if (error) return res.status(400).json({ error });

    this.reviewService
      .update(id, locale, dto!)
      .then((review) => res.json(review))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    this.reviewService
      .delete(req.params.id)
      .then((review) => res.json(review))
      .catch((error) => this.handleError(error, res));
  };
}
