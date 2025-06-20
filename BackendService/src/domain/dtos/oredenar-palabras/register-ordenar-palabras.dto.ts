export class RegisterOrdenarPalabrasDto {
  private constructor(
    public readonly titulo: string,
    public readonly textoOriginal: string,
    public readonly palabrasEnOrden: string[],
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterOrdenarPalabrasDto?] {
    const { titulo, textoOriginal, palabrasEnOrden, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!textoOriginal || typeof textoOriginal !== 'string') return ['El campo "textoOriginal" es requerido y debe ser string'];
    if (!Array.isArray(palabrasEnOrden) || palabrasEnOrden.some(p => typeof p !== 'string')) {
      return ['El campo "palabrasEnOrden" es requerido y debe ser un array de strings'];
    }
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['El campo "descripcion" debe ser string'];

    return [undefined, new RegisterOrdenarPalabrasDto(titulo, textoOriginal, palabrasEnOrden, claseId, template, descripcion)];
  }
}
