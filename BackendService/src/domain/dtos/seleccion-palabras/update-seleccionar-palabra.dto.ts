export class UpdateSeleccionPalabrasDto {
  private constructor(
    public readonly titulo?: string,
    public readonly textoOriginal?: string,
    public readonly opcionesPorGrupo?: { opciones: string[] }[],
    public readonly claseId?: string,
    public readonly descripcion?: string,
    public readonly template?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateSeleccionPalabrasDto?] {
    const allowedFields = ['titulo', 'textoOriginal', 'opcionesPorGrupo', 'claseId', 'descripcion', 'template'];
    const invalidFields = Object.keys(object).filter(key => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { titulo, textoOriginal, opcionesPorGrupo, claseId, descripcion, template } = object;

    if (titulo !== undefined && typeof titulo !== 'string') return ['"titulo" debe ser string'];
    if (textoOriginal !== undefined && typeof textoOriginal !== 'string') return ['"textoOriginal" debe ser string'];
    if (opcionesPorGrupo !== undefined) {
    if (
      !Array.isArray(opcionesPorGrupo) ||
      opcionesPorGrupo.some(
        (g: { opciones: string[] }) =>
        typeof g !== 'object' ||
        !Array.isArray(g.opciones) ||
        (g.opciones as unknown[]).some((o: unknown) => typeof o !== 'string')
      )
    ) {
      return ['"opcionesPorGrupo" debe ser un array de objetos con una propiedad "opciones" como array de strings'];
    }
    }
    if (claseId !== undefined && typeof claseId !== 'string') return ['"claseId" debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];
    if (template !== undefined && typeof template !== 'string') return ['"template" debe ser string'];

    return [undefined, new UpdateSeleccionPalabrasDto(titulo, textoOriginal, opcionesPorGrupo, claseId, descripcion, template)];
  }
}
