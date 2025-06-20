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

  // createClass = (req: Request, res: Response) => {
  //   const [error, dto] = RegisterClassDto.create(req.body);
  //   if (error) return res.status(400).json({ error });

  //   const file = req.file ? req.file : undefined;

  //   this.service
  //     .createClass(dto!, file)
  //     .then((clase) => res.status(201).json(clase))
  //     .catch((error) => this.handleError(error, res));
  // };

  createClass = (req: Request, res: Response) => {
    // Primero clonamos y transformamos el body
    const body = { ...req.body };

    // Si el horario viene como string, lo convertimos en array
    if (typeof body.horario === "string") {
      body.horario = body.horario
        .replace(/ y /gi, ",") // reemplaza " y " por coma
        .split(",")
        .map((item: string) => item.trim()) // limpia espacios
        .filter((item: string) => item.length > 0); // quita vacíos
    }

    const [error, dto] = RegisterClassDto.create(body);
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
      .getAllClasses(limit, page, publico)
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
}
