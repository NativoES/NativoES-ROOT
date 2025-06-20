export class UpdateOrdenarTextoDto {
  private constructor(
    public readonly titulo?: string,
    public readonly palabrasOriginales?: string[],
    public readonly claseId?: string,
    public readonly descripcion?: string,
    public readonly template?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateOrdenarTextoDto?] {
    const allowedFields = ['titulo', 'palabrasOriginales', 'claseId', 'descripcion', 'template'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, palabrasOriginales, claseId, descripcion, template } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (palabrasOriginales !== undefined) {
      if (!Array.isArray(palabrasOriginales) || palabrasOriginales.some(p => typeof p !== 'string')) {
        return ['"palabrasOriginales" debe ser un array de strings'];
      }
    }
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateOrdenarTextoDto(titulo, palabrasOriginales, claseId, descripcion, template)];
  }
}
