export class RegisterFormarPalabraDto {
  private constructor(
    public readonly titulo: string,
    public readonly letras: string[],
    public readonly palabraCorrecta: string,
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterFormarPalabraDto?] {
    const { titulo, letras, palabraCorrecta, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!Array.isArray(letras) || letras.some(l => typeof l !== 'string')) {
      return ['El campo "letras" es requerido y debe ser un array de strings'];
    }
    if (!palabraCorrecta || typeof palabraCorrecta !== 'string') {
      return ['El campo "palabraCorrecta" es requerido y debe ser string'];
    }
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['El campo "descripcion" debe ser string'];

    return [undefined, new RegisterFormarPalabraDto(titulo, letras, palabraCorrecta, claseId, template, descripcion)];
  }
}
