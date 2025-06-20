export class UpdateImagenPalabraDto {
  public readonly titulo?: string;
  public readonly descripcion?: string;
  public readonly asociaciones?: { palabra: string }[];

  private constructor(
    titulo?: string,
    descripcion?: string,
    asociaciones?: { palabra: string }[]
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.asociaciones = asociaciones;
  }

  static create(object: { [key: string]: any }): [string?, UpdateImagenPalabraDto?] {
    const { titulo, descripcion, asociaciones } = object;

    if (titulo !== undefined && typeof titulo !== 'string')
      return ['El campo "titulo" debe ser string'];

    if (descripcion !== undefined && typeof descripcion !== 'string')
      return ['El campo "descripcion" debe ser string'];

    if (asociaciones !== undefined) {
      if (!Array.isArray(asociaciones))
        return ['El campo "asociaciones" debe ser un arreglo'];

      for (const [index, asociacion] of asociaciones.entries()) {
        if (typeof asociacion !== 'object' || asociacion === null)
          return [`La asociación en índice ${index} debe ser un objeto`];

        if (typeof asociacion.palabra !== 'string' || asociacion.palabra.trim() === '')
          return [`La palabra en la asociación índice ${index} debe ser un string no vacío`];
      }
    }

    return [undefined, new UpdateImagenPalabraDto(titulo, descripcion, asociaciones)];
  }
}
