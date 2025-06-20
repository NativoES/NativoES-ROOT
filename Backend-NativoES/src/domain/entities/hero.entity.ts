import { CustomError } from "../errors/custom.error";

export class Hero {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public ctaPrimary: string,
    public backgroundImageUrl: string,
    public title2?: string,
    public ctaSecondary?: string,
    public studentsCount?: string,
    public studentText?: string,
    public studentsText?: string
  ) {}

  static fromObject(object: { [key: string]: any }): Hero {
    const {
      id,
      _id,
      title,
      subtitle,
      ctaPrimary,
      backgroundImageUrl,
      title2,
      ctaSecondary,
      studentsCount,
      studentText,
      studentsText,
    } = object;

    const objectId = _id || id;
    if (!objectId) throw CustomError.badRequest('Missing id');
    if (!title) throw CustomError.badRequest('Missing title');
    if (!subtitle) throw CustomError.badRequest('Missing subtitle');
    if (!ctaPrimary) throw CustomError.badRequest('Missing ctaPrimary');
    if (!backgroundImageUrl) throw CustomError.badRequest('Missing backgroundImageUrl');

    return new Hero(
      objectId,
      title,
      subtitle,
      ctaPrimary,
      backgroundImageUrl,
      title2,
      ctaSecondary,
      studentsCount,
      studentText,
      studentsText
    );
  }
}
