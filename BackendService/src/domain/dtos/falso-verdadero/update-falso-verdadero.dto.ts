export class UpdateFalsoVerdaderoDto {
  private constructor(
    public readonly titulo?: string,
    public readonly preguntas?: { texto: string; respuestaCorrecta: boolean }[],
    public readonly claseId?: string,
    public readonly descripcion?: string,
    public readonly template?: string
  ) {}

  static create(obj: { [key: string]: any }): [string?, UpdateFalsoVerdaderoDto?] {
    const allowedFields = ['titulo', 'preguntas', 'claseId', 'descripcion', 'template'];
    const invalidFields = Object.keys(obj).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) return [`Campos no válidos: ${invalidFields.join(', ')}`];

    const { titulo, preguntas, claseId, descripcion, template } = obj;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (preguntas !== undefined) {
      if (!Array.isArray(preguntas) || preguntas.some(p => typeof p.texto !== 'string' || typeof p.respuestaCorrecta !== 'boolean')) {
        return ['"preguntas" debe ser un array de objetos con "texto" (string) y "respuestaCorrecta" (boolean)'];
      }
    }
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateFalsoVerdaderoDto(titulo, preguntas, claseId, descripcion, template)];
  }
}
