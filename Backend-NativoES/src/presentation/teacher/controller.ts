import { Request, Response } from "express";
import { TeacherService } from "../service/teacher.service";
import {
  CustomError,
  RegisterTeacherDto,
  UpdateTeacherDto,
} from "../../domain";

export class TeachersController {
  constructor(public readonly teacherService: TeacherService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerTeacher = (req: Request, res: Response) => {
    
    const [error, registerDto] = RegisterTeacherDto.create(req.body);
    console.log("📚 Registering new teacher:", req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file ? req.file : undefined;

    console.log("📚 Registering new teacher:", file);

    this.teacherService
      .registerTeacher(registerDto!, file)
      .then((teacher) => res.json(teacher))
      .catch((error) => this.handleError(error, res));
  };

  updateTeacherById = (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    // Validar locale
    if (!body.locale || !["en", "es", "fr"].includes(body.locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }

    const file = req.file ? req.file : undefined;

    const [updateError, dto] = UpdateTeacherDto.create(body);
    if (updateError) return res.status(400).json({ error: updateError });

    this.teacherService
      .updateTeacher(id, body.locale, dto!, file)
      .then((teacher) => res.json(teacher))
      .catch((error) => this.handleError(error, res));
  };

  getTechers = (req: Request, res: Response) => {
    const { locale } = req.query;
    this.teacherService
      .getAllTeachers(locale as string)
      .then((teachers) => res.json(teachers))
      .catch((error) => this.handleError(error, res));
  };

  getTecherById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.teacherService
      .getTeacherById(id)
      .then((teachers) => res.json(teachers))
      .catch((error) => this.handleError(error, res));
  };

  deleteTecher = (req: Request, res: Response) => {
    const { id } = req.params;
    this.teacherService
      .deleteTeacherById(id)
      .then((teachers) => res.json(teachers))
      .catch((error) => this.handleError(error, res));
  };
}
