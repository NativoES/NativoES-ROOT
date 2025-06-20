export class UpdateClassDto {
  private constructor(
    public readonly nombreClase?: string,
    public readonly nivel?: number,
    public readonly idioma?: 'Español' | 'Inglés' | 'Francés' | 'Ruso',
    public readonly horario?: string[],
    public readonly isPrivate?: boolean,
    public readonly descripcion?: string,
    public readonly imagen?: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateClassDto?] {
    const allowedFields = ['nombreClase', 'nivel', 'idioma', 'horario', 'isPrivate', 'descripcion', 'imagen'];
    const invalidFields = Object.keys(object).filter(k => !allowedFields.includes(k));
    if (invalidFields.length) return [`Campos no válidos: ${invalidFields.join(', ')}`];

    const { nombreClase, nivel, idioma, horario, isPrivate, descripcion, imagen } = object;

    if (nombreClase !== undefined && typeof nombreClase !== 'string') return ['"nombreClase" debe ser string'];
    if (nivel !== undefined && typeof nivel !== 'number') return ['"nivel" debe ser número'];
    if (idioma !== undefined && !['Español', 'Inglés', 'Francés', 'Ruso'].includes(idioma)) return ['"idioma" inválido'];
    if (horario !== undefined) {
      if (!Array.isArray(horario) || horario.some(h => typeof h !== 'string')) {
        return ['"horario" debe ser un array de strings'];
      }
    }
    if (isPrivate !== undefined && typeof isPrivate !== 'boolean') return ['"isPrivate" debe ser boolean'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['"descripcion" debe ser string'];
    if (imagen !== undefined && typeof imagen !== 'string') return ['"imagen" debe ser string'];

    return [undefined, new UpdateClassDto(nombreClase, nivel, idioma, horario, isPrivate, descripcion, imagen)];
  }
}
