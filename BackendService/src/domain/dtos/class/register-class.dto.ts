export class RegisterClassDto {
  private constructor(
    public readonly nombreClase: string,
    public readonly idioma: "Español" | "Inglés" | "Francés" | "Ruso",
    public readonly horario: string[],
    public readonly isPrivate: boolean,
    public readonly profesorId: string,
    public readonly nivel?: string,
    public readonly descripcion?: string,
    public readonly imagen?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterClassDto?] {
    const {
      nombreClase,
      nivel,
      idioma,
      horario,
      isPrivate,
      descripcion,
      imagen,
      profesorId,
    } = object;

    if (!nombreClase || typeof nombreClase !== "string")
      return ['"nombreClase" es requerido y debe ser string'];
    if (!idioma || !["Español", "Inglés", "Francés", "Ruso"].includes(idioma))
      return ['"idioma" inválido'];
    if (
      !horario ||
      !Array.isArray(horario) ||
      horario.some((h) => typeof h !== "string")
    )
      return ['"horario" debe ser un array de strings'];
    if (typeof isPrivate !== "boolean")
      return ['"isPrivate" es requerido y debe ser boolean'];
    if (!profesorId || typeof profesorId !== "string")
      return ['"profesorId" es requerido y debe ser string'];

    if (nivel !== undefined && typeof nivel !== "string")
      return ['"nivel" debe ser un string'];
    if (descripcion !== undefined && typeof descripcion !== "string")
      return ['"descripcion" debe ser string'];
    if (imagen !== undefined && typeof imagen !== "string")
      return ['"imagen" debe ser string'];

    return [
      undefined,
      new RegisterClassDto(
        nombreClase,
        idioma,
        horario,
        isPrivate,
        profesorId,
        nivel,
        descripcion,
        imagen
      ),
    ];
  }
}
