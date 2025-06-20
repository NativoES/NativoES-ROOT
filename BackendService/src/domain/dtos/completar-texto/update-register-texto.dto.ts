
export class UpdateCompletarTextoDto {
  private constructor(
    public readonly titulo?: string,
    public readonly textoOriginal?: string,
    public readonly palabrasCorrectas?: string[],
    public readonly claseId?: string,
    public readonly descripcion?: string,
    public readonly template?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateCompletarTextoDto?] {
    const allowedFields = ['titulo', 'textoOriginal', 'palabrasCorrectas', 'claseId', 'descripcion'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, textoOriginal, palabrasCorrectas, claseId, descripcion, template } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (textoOriginal !== undefined && typeof textoOriginal !== 'string') return ['"textoOriginal" debe ser string'];
    if (palabrasCorrectas !== undefined) {
      if (!Array.isArray(palabrasCorrectas) || palabrasCorrectas.some(p => typeof p !== 'string')) {
        return ['"palabrasCorrectas" debe ser un array de strings'];
      }
    }
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateCompletarTextoDto(titulo, textoOriginal, palabrasCorrectas, claseId, descripcion, template)];
  }
}
