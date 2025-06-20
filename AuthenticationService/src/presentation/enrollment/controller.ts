import { Request, Response } from "express";
import {
  CustomError,
  RegisterEnrollmentDto,
  UpdateEnrollmentDto
} from "../../domain";
import { EnrollmentService } from "../services/enrollment.service";

export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterEnrollmentDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .create(dto!)
      .then((enrollment) => res.status(201).json(enrollment))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateEnrollmentDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service
      .update(id, dto!)
      .then((enrollment) => res.json(enrollment))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .getById(id)
      .then((enrollment) => res.json(enrollment))
      .catch((error) => this.handleError(error, res));
  };

  getAllByClase = (req: Request, res: Response) => {
    const { claseId } = req.params;

    this.service
      .getAllByClase(claseId)
      .then((enrollments) => res.json(enrollments))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .delete(id)
      .then((deleted) => res.json(deleted))
      .catch((error) => this.handleError(error, res));
  };

  getStudentsByClase = (req: Request, res: Response) => {
    const { claseId } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!claseId || typeof claseId !== "string") {
      return res.status(400).json({ error: "claseId es requerido" });
    }

    this.service
      .getPaginatedStudentsByClase(claseId, page, limit)
      .then(result => res.json(result))
      .catch(error => this.handleError(error, res));
  };

}
