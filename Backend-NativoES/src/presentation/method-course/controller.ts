import { Request, Response } from "express";
import { CustomError, RegisterMethodCourseTypeDto, UpdateMethodCourseTypeDto } from "../../domain";
import { MethodCourseService } from "../service";


export class MethodCourseController{
    constructor(private service: MethodCourseService) {}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
      }
      
    create = (req: Request, res: Response) => {
    const [error, dto] = RegisterMethodCourseTypeDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service.create(dto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  getAll = (_req: Request, res: Response) => {
    const { locale } = _req.query;
    this.service.getAll(locale as string)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service.getById(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const { locale } = req.body;

    const [error, dto] = UpdateMethodCourseTypeDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service.update(id, locale, dto!)
      .then(data => res.json(data))
      .catch(err => this.handleError(error, res));
  }

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service.delete(id)
      .then((deletemc) => res.json(deletemc))
      .catch(error => this.handleError(error, res));
  }
    
}