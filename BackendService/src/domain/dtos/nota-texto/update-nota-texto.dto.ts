export class UpdateNotaTextoDto {
  private constructor(
    public readonly titulo?: string,
    public readonly texto?: string,
    public readonly claseId?: string,
    public readonly template?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateNotaTextoDto?] {
    const allowed = ['titulo', 'texto', 'claseId', 'template'];
    const invalid = Object.keys(object).filter(key => !allowed.includes(key));
    if (invalid.length > 0) return [`Campos no válidos: ${invalid.join(', ')}`];

    const { titulo, texto, claseId, template } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (texto !== undefined && typeof texto !== 'string') return ['"texto" debe ser string'];
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateNotaTextoDto(titulo, texto, claseId, template)];
  }
}
