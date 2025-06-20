export type Asociacion = {
  palabra: string;
  imagenUrl: string;
};


export class RegisterImagenPalabraDto {
  private constructor(
    public readonly titulo: string,
    public readonly claseId: string,
    public readonly template: string,
    public readonly descripcion?: string,
    public readonly asociaciones?: Asociacion[], // <-- opcional aquí
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterImagenPalabraDto?] {
    const { titulo, claseId, template, descripcion } = object;

    if (!titulo || typeof titulo !== 'string') return ['El campo "titulo" es requerido y debe ser string'];
    if (!claseId || typeof claseId !== 'string') return ['El campo "claseId" es requerido y debe ser string'];
    if (!template || typeof template !== 'string') return ['El campo "template" es requerido y debe ser string'];
    if (descripcion !== undefined && typeof descripcion !== 'string') return ['El campo "descripcion" debe ser string'];

    // asociaciones ya no se valida aquí, porque se construye luego en el service
    return [undefined, new RegisterImagenPalabraDto(titulo, claseId, template, descripcion)];
  }
}
