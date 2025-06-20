import { Request, Response } from "express";
import { NotaService } from "../services/nota.service";
import { CustomError, RegisterNotaDto, UpdateNotaDto } from "../../domain";

export class NotaController {
  constructor(private readonly service: NotaService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterNotaDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dto!)
      .then((nota) => res.status(201).json(nota))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateNotaDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .update(id, dto!)
      .then((nota) => res.json(nota))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    this.service
      .getAll()
      .then((notas) => res.json(notas))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getById(id)
      .then((nota) => res.json(nota))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .delete(id)
      .then((nota) => res.json(nota))
      .catch((error) => this.handleError(error, res));
  };
}
