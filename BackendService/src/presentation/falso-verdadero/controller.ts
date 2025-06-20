import { Request, Response } from "express";
import { CustomError, RegisterFalsoVerdaderoDto, UpdateFalsoVerdaderoDto } from "../../domain";
import { FalsoVerdaderoService } from "../services/falso-verdadero.service";

export class FalsoVerdaderoController {
  constructor(private readonly service: FalsoVerdaderoService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterFalsoVerdaderoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dto!)
      .then((seleccionPalabra) => res.status(201).json(seleccionPalabra))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateFalsoVerdaderoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .update(id, dto!)
      .then((seleccionPalabra) => res.json(seleccionPalabra))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((seleccionPalabras) => res.json(seleccionPalabras))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getById(id)
      .then((seleccionPalabra) => res.json(seleccionPalabra))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .delete(id)
      .then((seleccionPalabra) => res.json(seleccionPalabra))
      .catch((error) => this.handleError(error, res));
  };
}
