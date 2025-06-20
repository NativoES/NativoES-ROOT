export class RegisterNotaTextoDto {
  private constructor(
    public readonly titulo: string,
    public readonly texto: string,
    public readonly claseId: string,
    public readonly template: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterNotaTextoDto?] {
    const { titulo, texto, claseId, template } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!texto || typeof texto !== 'string') return ['El campo "texto" es requerido y debe ser string'];
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];

    return [undefined, new RegisterNotaTextoDto(titulo, texto, claseId, template)];
  }
}
