export class UpdateHeroDto {
  constructor(
    public title?: string,
    public subtitle?: string,
    public btcPrimary?: string,
    public title2?: string,
    public btcSecondary?: string,
    public studentsCount?: string,
    public studentText?: string,
    public backgroundImageUrl?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateHeroDto?] {
    const {
      title,
      subtitle,
      btcPrimary,
      title2,
      btcSecondary,
      studentsCount,
      studentText,
      backgroundImageUrl,
    } = object;

    // No todos los campos son requeridos para actualizar, pero podemos validar si vienen, que no estén vacíos si quieres:
    if (title !== undefined && typeof title !== "string")
      return ["Invalid title"];
    if (subtitle !== undefined && typeof subtitle !== "string")
      return ["Invalid subtitle"];
    if (btcPrimary !== undefined && typeof btcPrimary !== "string")
      return ["Invalid btcPrimary"];
    // (y así con los demás si quieres)

    const dto = new UpdateHeroDto(
      title,
      subtitle,
      btcPrimary,
      title2,
      btcSecondary,
      studentsCount,
      studentText,
      backgroundImageUrl
    );

    return [undefined, dto];
  }
}
