import { Request, Response } from "express";
import { GifService } from "../services/gif.service";
import { CustomError, RegisterGifDto, UpdateGifDto } from "../../domain";

export class GifController {
  constructor(private readonly service: GifService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterGifDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;
    if (!file) return res.status(400).json({ error: "Archivo GIF es requerido" });

    this.service
      .create(dto!, file)
      .then((gif) => res.status(201).json(gif))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateGifDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;

    this.service
      .update(id, dto!, file)
      .then((gif) => res.json(gif))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((gifs) => res.json(gifs))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .getById(id)
      .then((gif) => res.json(gif))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .delete(id)
      .then((gif) => res.json(gif))
      .catch((error) => this.handleError(error, res));
  };
}
