import { Request, Response } from "express";
import { CustomError, RegisterPricePlanDto } from "../../domain";
import { PlanService } from "../service/plan.service";
import { UpdatePricePlanDto } from "../../domain/dtos/plans/update-plan.dto";

export class PlanController {
  constructor(private readonly planService: PlanService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  register = (req: Request, res: Response) => {
    const [error, dto] = RegisterPricePlanDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.planService
      .register(dto!)
      .then((plan) => res.json(plan))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (_req: Request, res: Response) => {
    const { locale } = _req.query;
    this.planService
      .getAll(locale as string)
      .then((plans) => res.json(plans))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.planService
      .getById(id)
      .then((plan) => res.json(plan))
      .catch((error) => this.handleError(error, res));
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { locale } = req.body;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }

    const [error, dto] = UpdatePricePlanDto.create(req.body);
    if (error) return res.status(400).json({ error });
    this.planService.update(id, locale, dto!)
        .then((plan) => res.json(plan))
        .catch((error) => this.handleError(error, res));
    
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.planService.delete(id)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
      
  };
}
