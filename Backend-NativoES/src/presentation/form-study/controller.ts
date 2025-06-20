import { Request, Response } from "express";
import {
  CustomError,
  RegisterFormStudyDto,
  UpdateFormStudyDto,
} from "../../domain";
import { FormStudyService } from "../service";

export class FormStudyController {
  constructor(private formStudyService: FormStudyService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerFormStudy = (req: Request, res: Response) => {
    const parsedBody = {
      locale: req.body.locale,
      content: req.body.content ? JSON.parse(req.body.content) : undefined,
    };

    const [error, registerDto] = RegisterFormStudyDto.create(parsedBody);
    console.log("datos de rgistro: ", registerDto);
    console.log("datos de rgistro: ", req.body);
    if (error) return res.status(400).json({ error });

    this.formStudyService
      .registerFormStudy(registerDto!)
      .then((formStudy) => res.json(formStudy))
      .catch((error) => this.handleError(error, res));
  };

  updateFormStudy = (req: Request, res: Response) => {
    const { id } = req.params;
    const { locale } = req.body;

    const parsedBody = {
      locale: req.body.locale,
      content: req.body.content ? JSON.parse(req.body.content) : undefined,
    };

    console.log("datos de registro: ", parsedBody);

    const [updateError, updateDto] = UpdateFormStudyDto.create(parsedBody);

    if (updateError) {
      return res.status(400).json({ error: updateError });
    }

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }

    this.formStudyService
      .updateFormStudy(id, updateDto!, locale)
      .then((updatedFormStudy) => res.json(updatedFormStudy))
      .catch((error) => this.handleError(error, res));
  };

  getAllFormStudy = (req: Request, res: Response) => {
    const { locale } = req.query;

    this.formStudyService
      .getAllFormStudy(locale as string)
      .then((formStudies) => res.json(formStudies))
      .catch((error) => this.handleError(error, res));
  };

  getFormStudyById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.formStudyService
      .getFormStudyById(id)
      .then((formStudy) => res.json(formStudy))
      .catch((error) => this.handleError(error, res));
  };

  deleteFormStudy = (req: Request, res: Response) => {
    const { id } = req.params;

    this.formStudyService
      .deleteFormStudy(id)
      .then((deletefs) => res.json(deletefs))
      .catch((error) => this.handleError(error, res));
  };
}
