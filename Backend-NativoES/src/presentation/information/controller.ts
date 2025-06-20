import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { InformationService } from "../service";
import { RegisterInformationDto } from '../../domain/dtos/information/register-information.dto';

export class InformationController {
  constructor(private informationService: InformationService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerIinformation = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterInformationDto.create(req.body);
    console.log("register information: ", registerDto);
    if (error) return res.status(400).json({ error });

    this.informationService
      .registerInformation(registerDto!)
      .then((information) => res.json(information))
      .catch((error) => this.handleError(error, res));
  }

  updateInformation = (req: Request, res: Response) => {
    const { id } = req.params;
    const { locale, informacion } = req.body;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }

    this.informationService
      .update(id, locale, { informacion })
      .then((updatedInfo) => res.json(updatedInfo))
      .catch((error) => this.handleError(error, res));
  }

  getAllInformation = (req: Request, res: Response) => {
    const { locale } = req.query;

    this.informationService
      .getAllInformtions(locale as string)
      .then((infos) => res.json(infos))
      .catch((error) => this.handleError(error, res));
  }

  getInformationById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.informationService
      .getById(id)
      .then((info) => res.json(info))
      .catch((error) => this.handleError(error, res));
  }

  deleteInformation = (req: Request, res: Response) => {
    const { id } = req.params;
    this.informationService
      .delete(id)
      .then(() => res.status(204).send())
      .catch((error) => this.handleError(error, res));
  }
}
