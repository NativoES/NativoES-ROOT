export class RegisterGifDto {
  private constructor(
    public readonly titulo: string,
    public readonly claseId: string,
    public readonly template: string,
    public readonly gifUrl?: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterGifDto?] {
    const { titulo, claseId, template, gifUrl, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];
    if (descripcion && typeof descripcion !== 'string') return ['El campo "descripcion" debe ser string'];

    return [undefined, new RegisterGifDto(titulo, claseId, template, gifUrl, descripcion)];
  }
}
