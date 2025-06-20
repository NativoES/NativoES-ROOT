export class RegisterAudioDto {
  private constructor(
    public readonly titulo: string,
    public readonly claseId: string,
    public readonly template: string,
    public readonly audioUrl?: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterAudioDto?] {
    const { titulo, claseId, template, audioUrl, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['El campo "descripcion" debe ser string'];

    return [undefined, new RegisterAudioDto(titulo, claseId, template, audioUrl, descripcion)];
  }
}
