import { Request, Response } from "express";
import {
  CustomError,
  RegisterCharacteristicDto,
  UpdateCharacteristicDto,
} from "../../domain";
import { CharacteristicService } from "../service/characteristic.service";

export class CharacteristicController {
  constructor(private characteristicService: CharacteristicService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerCharacteristic = (req: Request, res: Response) => {
    const file = req.file;

    const parsedBody = {
      locale: req.body.locale,
      content: req.body.content ? JSON.parse(req.body.content) : undefined,
    };

    const [error, registerDto] = RegisterCharacteristicDto.create(parsedBody);
    if (error) return res.status(400).json({ error });

    this.characteristicService
      .registerCharacteristic(registerDto!, file)
      .then((charac) => res.status(201).json(charac))
      .catch((error) => this.handleError(error, res));
  };

  updateCharacteristic = (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file;

    const parsedBody = {
      locale: req.body.locale,
      content: req.body.content ? JSON.parse(req.body.content) : undefined,
    };

    const [updateError, updateDto] = UpdateCharacteristicDto.create(parsedBody);
    if (updateError) return res.status(400).json({ error: updateError });

    if (!parsedBody.locale || !["en", "es", "fr"].includes(parsedBody.locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }

    this.characteristicService
      .updateCharacteristic(id, updateDto!, parsedBody.locale, file)
      .then((updatedCharacteristic) => res.json(updatedCharacteristic))
      .catch((error) => this.handleError(error, res));
  };

  getAllCharasteristics = (req: Request, res: Response) => {
    const { locale } = req.query;

    this.characteristicService
      .getAllCharacteristic(locale as string)
      .then((charasteristics) => res.json(charasteristics))
      .catch((error) => this.handleError(error, res));
  };

  getCharasteristicById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.characteristicService
      .getCharacteristicById(id)
      .then((charasteristic) => res.json(charasteristic))
      .catch((error) => this.handleError(error, res));
  };

  deleteCharacteristic = (req: Request, res: Response) => {
    const { id } = req.params;

    this.characteristicService
      .deleteCharacteristic(id)
      .then((deletech) => res.json(deletech))
      .catch((error) => this.handleError(error, res));
  };
}
