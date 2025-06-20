export class RegisterEnlaceExternoDto {
  private constructor(
    public readonly titulo: string,
    public readonly enlace: string,
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterEnlaceExternoDto?] {
    const { titulo, enlace, claseId, template, descripcion } = obj;

    if (!titulo || typeof titulo !== 'string') return ['"titulo" es requerido y debe ser string'];
    if (!enlace || typeof enlace !== 'string') return ['"enlace" es requerido y debe ser string'];
    if (!claseId || typeof claseId !== 'string') return ['"claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['"template" es requerido y debe ser string'];

    return [undefined, new RegisterEnlaceExternoDto(titulo, enlace, claseId, template, descripcion)];
  }
}
