export class RegisterSeleccionPalabrasDto {
  private constructor(
    public readonly titulo: string,
    public readonly textoOriginal: string,
    public readonly opcionesPorGrupo: { opciones: string[] }[],
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterSeleccionPalabrasDto?] {
    const { titulo, textoOriginal, opcionesPorGrupo, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!textoOriginal || typeof textoOriginal !== 'string') return ['El campo "textoOriginal" es requerido y debe ser string'];
    if (
      !Array.isArray(opcionesPorGrupo) ||
      opcionesPorGrupo.some(
        (g: { opciones: string[] }) =>
          typeof g !== 'object' ||
          !Array.isArray(g.opciones) ||
          g.opciones.some((o: string) => typeof o !== 'string')
      )
    ) {
      return ['El campo "opcionesPorGrupo" debe ser un array de objetos con una propiedad "opciones" como array de strings'];
    }
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];

    return [undefined, new RegisterSeleccionPalabrasDto(titulo, textoOriginal, opcionesPorGrupo, claseId, template, descripcion)];
  }
}
