export class UpdateTeacherDto {
  constructor(
    public locale: 'en' | 'es' | 'fr',
    public nombre?: string,
    public resumenPrincipal?: string,
    public resumenSecundario?: string,
    public presentacion?: string,
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

    if (resumenPrincipal !== undefined && typeof resumenPrincipal !== 'string') {
      return ['Resumen principal must be a string'];
    }

    if (resumenSecundario !== undefined && typeof resumenSecundario !== 'string') {
      return ['Resumen secundario must be a string'];
    }

    if (presentacion !== undefined && typeof presentacion !== 'string') {
      return ['Presentación must be a string'];
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
