import { Request, Response } from "express";
import { ImageService } from "../services/image.service";
import { CustomError, RegisterImageDto, UpdateImageDto } from "../../domain";

export class ImageController {
  constructor(private readonly service: ImageService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterImageDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;
    if (!file) return res.status(400).json({ error: "Archivo de imagen es requerido" });

    this.service
      .create(dto!, file)
      .then((img) => res.status(201).json(img))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateImageDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;

    this.service
      .update(id, dto!, file)
      .then((img) => res.json(img))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((imgs) => res.json(imgs))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .getById(id)
      .then((img) => res.json(img))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .delete(id)
      .then((img) => res.json(img))
      .catch((error) => this.handleError(error, res));
  };
}
