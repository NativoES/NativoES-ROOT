import { Request, Response } from "express";
import { CustomError, RegisterCourseDto, UpdateCourseDto } from "../../domain";
import { CourseService } from "../service";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  createCourse = (req: Request, res: Response) => {
    const [error, dto] = RegisterCourseDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.courseService
      .createCourse(dto!)
      .then((course) => res.status(201).json(course))
      .catch((error) => this.handleError(error, res));
  };

  getAllCourses = async (_: Request, res: Response) => {
    this.courseService.getAllCourses()
        .then((courses) => res.json(courses))
        .catch((error) => this.handleError(error, res));
  };

  getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    this.courseService.getCourseById(id)
      .then((course) => res.json(course))
      .catch((error) => this.handleError(error, res));
  };

  updateCourse = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateCourseDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.courseService.updateCourse(
        id,
        dto!.locale,
        dto!
      ).then((course) => res.json(course))
      .catch((error) => this.handleError(error, res));
  };

  deleteCourse = async (req: Request, res: Response) => {
    this.courseService.deleteCourse(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => this.handleError(error, res));
  };
}
