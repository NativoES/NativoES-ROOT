export class UpdateRelacionarPalabrasDto {
  private constructor(
    public readonly titulo?: string,
    public readonly parejas?: { palabra: string; significado: string }[],
    public readonly claseId?: string,
    public readonly descripcion?: string,
    public readonly template?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateRelacionarPalabrasDto?] {
    const allowedFields = ['titulo', 'parejas', 'claseId', 'descripcion', 'template'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, parejas, claseId, descripcion, template } = object;

    if (titulo !== undefined && typeof titulo !== 'string')
      return ['"titulo" debe ser string'];

    if (parejas !== undefined) {
      if (
        !Array.isArray(parejas) ||
        parejas.some(
          p =>
            typeof p !== 'object' ||
            !p.palabra ||
            !p.significado ||
            typeof p.palabra !== 'string' ||
            typeof p.significado !== 'string'
        )
      ) {
        return ['"parejas" debe ser un array de objetos con "palabra" y "significado" como strings'];
      }
    }

    if (claseId !== undefined && typeof claseId !== 'string')
      return ['"claseId" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string')
      return ['"descripcion" debe ser string'];
    if (template !== undefined && typeof template !== 'string')
      return ['"template" debe ser string'];

    return [undefined, new UpdateRelacionarPalabrasDto(titulo, parejas, claseId, descripcion, template)];
  }
}
