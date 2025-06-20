export class RegisterOrdenarTextoDto {
  private constructor(
    public readonly titulo: string,
    public readonly palabrasOriginales: string[],
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterOrdenarTextoDto?] {
    const { titulo, palabrasOriginales, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!Array.isArray(palabrasOriginales) || palabrasOriginales.some(p => typeof p !== 'string')) {
      return ['El campo "palabrasOriginales" es requerido y debe ser un array de strings'];
    }
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];

    return [undefined, new RegisterOrdenarTextoDto(titulo, palabrasOriginales, claseId, template, descripcion)];
  }
}
