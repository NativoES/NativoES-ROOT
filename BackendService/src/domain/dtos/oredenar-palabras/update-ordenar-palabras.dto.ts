export class UpdateOrdenarPalabrasDto {
  private constructor(
    public readonly titulo?: string,
    public readonly textoOriginal?: string,
    public readonly palabrasEnOrden?: string[],
    public readonly claseId?: string,
    public readonly template?: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateOrdenarPalabrasDto?] {
    const allowedFields = ['titulo', 'textoOriginal', 'palabrasEnOrden', 'claseId', 'template', 'descripcion'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, textoOriginal, palabrasEnOrden, claseId, template, descripcion } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (textoOriginal !== undefined && typeof textoOriginal !== 'string') return ['"textoOriginal" debe ser string'];
    if (palabrasEnOrden !== undefined) {
      if (!Array.isArray(palabrasEnOrden) || palabrasEnOrden.some(p => typeof p !== 'string')) {
        return ['"palabrasEnOrden" debe ser un array de strings'];
      }
    }
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];

    return [undefined, new UpdateOrdenarPalabrasDto(titulo, textoOriginal, palabrasEnOrden, claseId, template, descripcion)];
  }
}
