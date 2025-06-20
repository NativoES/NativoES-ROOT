import { Request, Response } from "express";
import { HeroService } from "../service";
import { CustomError, RegisterHeroDto, UpdateHeroDto } from "../../domain";

export class HeroController {
  constructor(public readonly heroService: HeroService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerHero = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterHeroDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const file = req.file ? req.file : undefined;

    this.heroService
      .registerHero(registerDto!, file)
      .then((hero) => res.json(hero))
      .catch((error) => this.handleError(error, res));
  };

  updateHeroById = (req: Request, res: Response) => {
    const { id } = req.params;
    const heroUpdata = req.body;

    if (!heroUpdata.locale || !["en", "es", "fr"].includes(heroUpdata.locale)) {
      return res.status(400).json({ error: "Invalid or missing locale" });
    }
    const file = req.file ? req.file : undefined;
    const [updateError, dto] = UpdateHeroDto.create(heroUpdata);
    if (updateError) return res.status(400).json({ error: updateError });

    this.heroService
      .updateHero(id, heroUpdata.locale, dto!, file)
      .then((hero) => res.json(hero))
      .catch((error) => this.handleError(error, res));
  };

  getAllHeroes = (req: Request, res: Response) => {
     const { locale } = req.query;
    this.heroService
      .getAllHeroes(locale as string)
      .then((heros) => res.json(heros))
      .catch((error) => this.handleError(error, res));
  };

  getHeroById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.heroService
      .getHeroById(id)
      .then((hero) => res.json(hero))
      .catch((error) => this.handleError(error, res));
  };

  deleteHeroById = (req: Request, res: Response) => {
    const { id } = req.params;
    this.heroService
      .deleteHeroById(id)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}
