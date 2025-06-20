export class RegisterMethodCourseTypeDto {
  private constructor(
    public readonly locale: 'en' | 'es' | 'fr',
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly typeIcon?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterMethodCourseTypeDto?] {
    const { locale, titulo, descripcion, typeIcon } = object;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }

    if (!titulo || !descripcion) {
      return ['Missing required fields: titulo or descripcion'];
    }

    return [undefined, new RegisterMethodCourseTypeDto(locale, titulo, descripcion, typeIcon)];
  }
}
