import { Request, Response } from "express";
import { OrdenarTextoService } from "../services/ordenar-texto.service";
import { CustomError, RegisterOrdenarTextoDto, UpdateOrdenarTextoDto } from "../../domain";

export class OrdenarTextoController {
  constructor(private readonly service: OrdenarTextoService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterOrdenarTextoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dto!)
      .then((ordenarTexto) => res.status(201).json(ordenarTexto))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateOrdenarTextoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .update(id, dto!)
      .then((ordenarTexto) => res.json(ordenarTexto))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((ordenarTextos) => res.json(ordenarTextos))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getById(id)
      .then((ordenarTexto) => res.json(ordenarTexto))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .delete(id)
      .then((ordenarTexto) => res.json(ordenarTexto))
      .catch((error) => this.handleError(error, res));
  };
}
