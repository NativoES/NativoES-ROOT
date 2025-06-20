export class RegisterFalsoVerdaderoDto {
  private constructor(
    public readonly titulo: string,
    public readonly preguntas: { texto: string; respuestaCorrecta: boolean }[],
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterFalsoVerdaderoDto?] {
    const { titulo, preguntas, claseId, template, descripcion } = obj;

    if (!titulo || typeof titulo !== 'string') return ['"titulo" es requerido y debe ser string'];
    if (!Array.isArray(preguntas) || preguntas.some(p => typeof p.texto !== 'string' || typeof p.respuestaCorrecta !== 'boolean')) {
      return ['"preguntas" debe ser un array de objetos con "texto" (string) y "respuestaCorrecta" (boolean)'];
    }
    if (!claseId || typeof claseId !== 'string') return ['"claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['"template" es requerido y debe ser string'];

    return [undefined, new RegisterFalsoVerdaderoDto(titulo, preguntas, claseId, template, descripcion)];
  }
}
