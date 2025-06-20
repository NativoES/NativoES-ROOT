export class RegisterTeacherDto {
  constructor(
    public locale: 'en' | 'es' | 'fr',
    public nombre: string,
    public resumenPrincipal: string[],
    public resumenSecundario: string[],
    public presentacion: string[],
    public cargo?: string,
    public fotografia?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterTeacherDto?] {
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
    if (!nombre) return ['Nombre is required'];
    if (!Array.isArray(resumenPrincipal)) return ['Resumen principal must be an array of strings'];
    if (!Array.isArray(resumenSecundario)) return ['Resumen secundario must be an array of strings'];
    if (!Array.isArray(presentacion)) return ['Presentación must be an array of strings'];

    return [undefined, new RegisterTeacherDto(
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
