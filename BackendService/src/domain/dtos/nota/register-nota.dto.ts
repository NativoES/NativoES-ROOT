export class RegisterNotaDto {
  private constructor(
    public readonly titulo: string,
    public readonly mensaje: string,
    public readonly color: string,
    public readonly claseId: string,
    public readonly colorTexto: string,
    public readonly template: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterNotaDto?] {
    const { titulo, mensaje, color, claseId, colorTexto, template } = object;

    if (!titulo || typeof titulo !== "string")
      return ['El campo "titulo" es requerido y debe ser string'];
    if (!mensaje || typeof mensaje !== "string")
      return ['El campo "mensaje" es requerido y debe ser string'];
    if (!color || typeof color !== "string")
      return ['El campo "color" es requerido y debe ser string'];
    if (!claseId || typeof claseId !== "string")
      return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== "string")
      return ['El campo "template" es requerido y debe ser string'];
    if (!colorTexto || typeof colorTexto !== "string")
      return ['El campo "colorTexto" es requerido y debe ser string'];

    return [
      undefined,
      new RegisterNotaDto(
        titulo,
        mensaje,
        color,
        claseId,
        colorTexto,
        template
      ),
    ];
  }
}
