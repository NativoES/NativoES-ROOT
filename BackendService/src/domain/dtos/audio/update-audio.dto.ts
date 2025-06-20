export class UpdateAudioDto {
  private constructor(
    public readonly titulo?: string,
    public readonly audioUrl?: string,
    public readonly claseId?: string,
    public readonly template?: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateAudioDto?] {
    const allowedFields = ['titulo', 'audioUrl', 'claseId', 'template', 'descripcion'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, audioUrl, claseId, template, descripcion } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (audioUrl !== undefined && typeof audioUrl !== 'string') return ['"audioUrl" debe ser string'];
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];

    return [undefined, new UpdateAudioDto(titulo, audioUrl, claseId, template, descripcion)];
  }
}
