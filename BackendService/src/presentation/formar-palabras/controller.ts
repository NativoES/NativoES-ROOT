import { Request, Response } from "express";
import { FormarPalabrasService } from "../services/formar-palabras.service";
import { CustomError, RegisterFormarPalabraDto, UpdateFormarPalabraDto } from "../../domain";

export class FormarPalabrasController {
  constructor(private readonly service: FormarPalabrasService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterFormarPalabraDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dto!)
      .then((formarPalabra) => res.status(201).json(formarPalabra))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateFormarPalabraDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .update(id, dto!)
      .then((formarPalabra) => res.json(formarPalabra))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((formarPalabras) => res.json(formarPalabras))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getById(id)
      .then((formarPalabra) => res.json(formarPalabra))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .delete(id)
      .then((formarPalabra) => res.json(formarPalabra))
      .catch((error) => this.handleError(error, res));
  };
}
