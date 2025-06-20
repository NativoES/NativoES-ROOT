import { Request, Response } from "express";
import { ImagenPalabraService } from "../services/imagen-palabra.service";
import {
  Asociacion,
  CustomError,
  RegisterImagenPalabraDto,
  UpdateImagenPalabraDto,
} from "../../domain";

export class ImagenPalabraController {
  constructor(private readonly service: ImagenPalabraService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const { palabras } = req.body;

    const palabrasArray = Array.isArray(palabras) ? palabras : [palabras];
    const files = (req.files as Express.Multer.File[]) || [];

    if (!palabrasArray || palabrasArray.length === 0) {
      return res
        .status(400)
        .json({ error: "Debes proporcionar al menos una palabra" });
    }

    if (palabrasArray.length !== files.length) {
      return res
        .status(400)
        .json({ error: "La cantidad de palabras y archivos no coincide" });
    }

    const [error, dtoBase] = RegisterImagenPalabraDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dtoBase!, palabrasArray, files)
      .then((resultado) => res.status(201).json(resultado))
      .catch((err) => this.handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dtoBase] = UpdateImagenPalabraDto.create(req.body);

    if (error) return res.status(400).json({ error });

    // Ensure asociaciones is always an array
    const dtoWithAsociaciones = {
      ...dtoBase!,
      asociaciones: dtoBase!.asociaciones ?? [],
    };

    this.service
      .update(id, dtoWithAsociaciones, req.files as Express.Multer.File[])
      .then((resultado) => res.status(200).json(resultado))
      .catch((err) => this.handleError(err, res));
  };

  getAll = (req: Request, res: Response) => {
    const { claseId } = req.query;

    this.service
      .getAll(claseId as string)
      .then((imagenPalabras) => res.json(imagenPalabras))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getById(id)
      .then((imagenPalabra) => res.json(imagenPalabra))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .delete(id)
      .then((imagenPalabra) => res.json(imagenPalabra))
      .catch((error) => this.handleError(error, res));
  };
}
