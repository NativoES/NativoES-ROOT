import { Request, Response } from "express";
import { CustomError, RegisterCompletarTextoDto, UpdateCompletarTextoDto } from "../../domain";
import { CompletarTextoService } from "../services/completar-texto.service";

export class CompletarTextoContreller {

    constructor(private readonly service: CompletarTextoService) {}

    private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  createCT = (req: Request, res: Response) => {
    const [error, dto] = RegisterCompletarTextoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .createCT(dto!)
      .then((ct) => res.status(201).json(ct))
      .catch((error) => this.handleError(error, res));
  };

  getAllCT = async (req: Request, res: Response) => {
    this.service.getAllCT()
        .then((ct) => res.json(ct))
        .catch((error) => this.handleError(error, res));
  };

  getCTById = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.service.getByIdCT(id)
      .then((ct) => res.json(ct))
      .catch((error) => this.handleError(error, res));
  };

  updateCT = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateCompletarTextoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service.updateCT(
        id,
        dto!
      ).then((ct) => res.json(ct))
      .catch((error) => this.handleError(error, res));
  };

  deleteCT = async (req: Request, res: Response) => {
    this.service.delete(req.params.id)
        .then((ct) => res.json(ct))
        .catch((error) => this.handleError(error, res));
  };
}