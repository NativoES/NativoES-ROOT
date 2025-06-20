import { Request, Response } from "express";
import { VideoService } from "../services/video.service";
import { CustomError, RegisterVideoDto, UpdateVideoDto } from "../../domain";

export class VideoController {
  constructor(private readonly service: VideoService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterVideoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;
    if (!file) return res.status(400).json({ error: "Archivo de video es requerido" });

    this.service
      .create(dto!, file)
      .then((video) => res.status(201).json(video))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateVideoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;

    this.service
      .update(id, dto!, file)
      .then((video) => res.json(video))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((videos) => res.json(videos))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .getById(id)
      .then((video) => res.json(video))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .delete(id)
      .then((video) => res.json(video))
      .catch((error) => this.handleError(error, res));
  };
}
