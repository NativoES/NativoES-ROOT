export class UpdateFormarPalabraDto {
  private constructor(
    public readonly titulo?: string,
    public readonly letras?: string[],
    public readonly palabraCorrecta?: string,
    public readonly claseId?: string,
    public readonly template?: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateFormarPalabraDto?] {
    const allowedFields = ['titulo', 'letras', 'palabraCorrecta', 'claseId', 'template', 'descripcion'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, letras, palabraCorrecta, claseId, template, descripcion } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (letras !== undefined) {
      if (!Array.isArray(letras) || letras.some(l => typeof l !== 'string')) {
        return ['"letras" debe ser un array de strings'];
      }
    }
    if (palabraCorrecta !== undefined && typeof palabraCorrecta !== 'string') {
      return ['"palabraCorrecta" debe ser string'];
    }
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];

    return [undefined, new UpdateFormarPalabraDto(titulo, letras, palabraCorrecta, claseId, template, descripcion)];
  }
}
