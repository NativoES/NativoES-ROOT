import { Request, Response } from "express";
import { CustomError, RegisterUserDto, UpdateUserDto } from "../../domain";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly service: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
    const [error, dto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;

    this.service
      .create(dto!, file)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, dto] = UpdateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file;

    this.service
      .update(id, dto!, file)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  getAll = (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const rol = req.query.rol as string | undefined;

    if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
      return res.status(400).json({
        error: 'Parámetros "limit" y "page" deben ser números positivos.',
      });
    }

    this.service
      .getAll(limit, page, rol)
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };

  getAllUserByRol = (req: Request, res: Response) => {
    const rol = req.query.rol as string | undefined;

    this.service
      .getAllUserByRol(rol)
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  };

  getById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .getById(id)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  getUserByToken = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw CustomError.unauthorized("Token no enviado");
    }

    const token = authHeader.split(" ")[1];

    this.service
      .getByToken(token)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    this.service
      .delete(id)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
}
