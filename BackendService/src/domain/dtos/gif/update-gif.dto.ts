export class UpdateGifDto {
  private constructor(
    public readonly titulo?: string,
    public readonly gifUrl?: string,
    public readonly claseId?: string,
    public readonly template?: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateGifDto?] {
    const allowedFields = ['titulo', 'gifUrl', 'claseId', 'template', 'descripcion'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, gifUrl, claseId, template, descripcion } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (gifUrl !== undefined && typeof gifUrl !== 'string') return ['"gifUrl" debe ser string'];
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];

    return [undefined, new UpdateGifDto(titulo, gifUrl, claseId, template, descripcion)];
  }
}
