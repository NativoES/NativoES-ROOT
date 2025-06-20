import { Request, Response } from 'express';
import { CustomError, RegisterNotaTextoDto, UpdateNotaTextoDto } from '../../domain';
import { NotaTextoService } from '../services/nota-texto.service';

export class NotaTextoController {
  constructor(private readonly service: NotaTextoService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterNotaTextoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service.create(dto!)
      .then(nota => res.status(201).json(nota))
      .catch(err => this.handleError(err, res));
  };

  getAll = (req: Request, res: Response) => {
    this.service.getAll()
      .then(notas => res.json(notas))
      .catch(err => this.handleError(err, res));
  };

  getById = (req: Request, res: Response) => {
    this.service.getById(req.params.id)
      .then(nota => res.json(nota))
      .catch(err => this.handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    const [error, dto] = UpdateNotaTextoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.service.update(req.params.id, dto!)
      .then(nota => res.json(nota))
      .catch(err => this.handleError(err, res));
  };

  delete = (req: Request, res: Response) => {
    this.service.delete(req.params.id)
      .then(nota => res.json(nota))
      .catch(err => this.handleError(err, res));
  };
}
