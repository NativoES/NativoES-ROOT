export class UpdateNotaDto {
  private constructor(
    public readonly titulo?: string,
    public readonly mensaje?: string,
    public readonly color?: string,
    public readonly claseId?: string,
    public readonly colorTexto?: string,
    public readonly template?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateNotaDto?] {
    const allowedFields = ['titulo', 'mensaje', 'color', 'claseId', 'colorTexto', 'template'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) return [`Campos no válidos: ${invalidFields.join(', ')}`];

    const { titulo, mensaje, color, claseId, colorTexto, template } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (mensaje !== undefined && typeof mensaje !== 'string') return ['"mensaje" debe ser string'];
    if (color !== undefined && typeof color !== 'string') return ['"color" debe ser string'];
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (colorTexto !== undefined && typeof colorTexto !== 'string') return ['"colorTexto" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateNotaDto(titulo, mensaje, color, claseId, colorTexto, template)];
  }
}
