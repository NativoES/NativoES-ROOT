import { Request, Response } from "express";
import { CustomError, RegisterOrdenarPalabrasDto, UpdateOrdenarPalabrasDto } from "../../domain";
import { OrdenarPalabrasService } from "../services/ordenar-palabra.service";

export class OrdenarPalabrasController {
  constructor(private readonly service: OrdenarPalabrasService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterOrdenarPalabrasDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dto!)
      .then((ordenarPalabra) => res.status(201).json(ordenarPalabra))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateOrdenarPalabrasDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .update(id, dto!)
      .then((ordenarPalabra) => res.json(ordenarPalabra))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((ordenarPalabras) => res.json(ordenarPalabras))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getById(id)
      .then((ordenarPalabra) => res.json(ordenarPalabra))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .delete(id)
      .then((ordenarPalabra) => res.json(ordenarPalabra))
      .catch((error) => this.handleError(error, res));
  };
}
