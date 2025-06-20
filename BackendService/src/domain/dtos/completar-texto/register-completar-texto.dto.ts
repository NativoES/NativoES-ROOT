export class RegisterCompletarTextoDto {
  private constructor(
    public readonly titulo: string,
    public readonly textoOriginal: string,
    public readonly palabrasCorrectas: string[],
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterCompletarTextoDto?] {
    const { titulo, textoOriginal, palabrasCorrectas, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!textoOriginal || typeof textoOriginal !== 'string') return ['El campo "textoOriginal" es requerido y debe ser string'];
    if (!Array.isArray(palabrasCorrectas) || palabrasCorrectas.some(p => typeof p !== 'string')) {
      return ['El campo "palabrasCorrectas" es requerido y debe ser un array de strings'];
    }
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];

    return [undefined, new RegisterCompletarTextoDto(titulo, textoOriginal, palabrasCorrectas, claseId, template, descripcion)];
  }
}
