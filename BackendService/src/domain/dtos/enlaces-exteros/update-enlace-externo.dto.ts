export class UpdateEnlaceExternoDto {
  private constructor(
    public readonly titulo?: string,
    public readonly enlace?: string,
    public readonly claseId?: string,
    public readonly descripcion?: string,
    public readonly template?: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, UpdateEnlaceExternoDto?] {
    const allowedFields = ['titulo', 'enlace', 'claseId', 'descripcion', 'template'];
    const invalidFields = Object.keys(obj).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, enlace, claseId, descripcion, template } = obj;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (enlace !== undefined && typeof enlace !== 'string') return ['"enlace" debe ser string'];
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateEnlaceExternoDto(titulo, enlace, claseId, descripcion, template)];
  }
}
