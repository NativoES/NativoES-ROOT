import { Request, Response } from "express";
import { CustomError, RegisterClassDto, UpdateClassDto } from "../../domain";
import { ClassesService } from "../services/class.service";

export class ClassesController {
  constructor(private readonly service: ClassesService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  createClass = (req: Request, res: Response) => {
    const body = { ...req.body };

    if (typeof body.horario === "string") {
      body.horario = body.horario
        .replace(/ y /gi, ",")
        .split(",")
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);
    }

    body.isPrivate = body.isPrivate === "true";

    console.log("body refactorizado: ", body);

    const [error, dto] = RegisterClassDto.create(body);
    console.log("body dto: ", dto);
    if (error) return res.status(400).json({ error });

    const file = req.file ? req.file : undefined;

    this.service
      .createClass(dto!, file)
      .then((clase) => res.status(201).json(clase))
      .catch((error) => this.handleError(error, res));
  };

  getAllClasses = (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const profesorId = req.query.profesorId?.toString();
    const publico =
      req.query.publico === "true"
        ? false
        : req.query.publico === "false"
        ? true
        : undefined;

    if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
      return res.status(400).json({
        error: 'Parámetros "limit" y "page" deben ser números positivos.',
      });
    }

    this.service
      .getAllClasses(limit, page, publico, profesorId)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  getClassById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .getClassById(id)
      .then((clase) => res.json(clase))
      .catch((error) => this.handleError(error, res));
  };

  updateClass = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateClassDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file ? req.file : undefined;

    this.service
      .updateClass(id, dto!, file)
      .then((clase) => res.json(clase))
      .catch((error) => this.handleError(error, res));
  };

  deleteClass = (req: Request, res: Response) => {
    const { id } = req.params;
    this.service
      .deleteClass(id)
      .then((clase) => res.json(clase))
      .catch((error) => this.handleError(error, res));
  };

  getClasesByIds = (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
      return res
        .status(400)
        .json({ error: "El campo 'ids' debe ser un array de strings" });
    }

    this.service
      .getClasesByIds(ids)
      .then((clases) => res.json({ clases }))
      .catch((err) => this.handleError(err, res));
  };
}
