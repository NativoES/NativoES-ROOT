export class RegisterRelacionarPalabrasDto {
  private constructor(
    public readonly titulo: string,
    public readonly parejas: { palabra: string; significado: string }[],
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterRelacionarPalabrasDto?] {
    const { titulo, parejas, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string')
      return ['El campo "titulo" es requerido y debe ser string'];
    if (
      !Array.isArray(parejas) ||
      parejas.some(
        p =>
          typeof p !== 'object' ||
          !p.palabra ||
          !p.significado ||
          typeof p.palabra !== 'string' ||
          typeof p.significado !== 'string'
      )
    ) {
      return [
        'El campo "parejas" es requerido y debe ser un array de objetos con "palabra" y "significado" como strings'
      ];
    }
    if (!claseId || typeof claseId !== 'string')
      return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string')
      return ['El campo "template" es requerido y debe ser string'];

    return [undefined, new RegisterRelacionarPalabrasDto(titulo, parejas, claseId, template, descripcion)];
  }
}
