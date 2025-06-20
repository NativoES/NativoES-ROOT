export class UpdateTeacherDto {
  constructor(
    public locale: 'en' | 'es' | 'fr',
    public nombre?: string,
    public resumenPrincipal?: string[],
    public resumenSecundario?: string[],
    public presentacion?: string[],
    public cargo?: string,
    public fotografia?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateTeacherDto?] {
    const {
      locale,
      nombre,
      resumenPrincipal,
      resumenSecundario,
      presentacion,
      cargo,
      fotografia
    } = object;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }

    if (
      resumenPrincipal !== undefined &&
      (!Array.isArray(resumenPrincipal) || !resumenPrincipal.every(s => typeof s === 'string'))
    ) {
      return ['Resumen principal must be an array of strings'];
    }

    if (
      resumenSecundario !== undefined &&
      (!Array.isArray(resumenSecundario) || !resumenSecundario.every(s => typeof s === 'string'))
    ) {
      return ['Resumen secundario must be an array of strings'];
    }

    if (
      presentacion !== undefined &&
      (!Array.isArray(presentacion) || !presentacion.every(s => typeof s === 'string'))
    ) {
      return ['Presentación must be an array of strings'];
    }

    return [undefined, new UpdateTeacherDto(
      locale,
      nombre,
      resumenPrincipal,
      resumenSecundario,
      presentacion,
      cargo,
      fotografia
    )];
  }
}
