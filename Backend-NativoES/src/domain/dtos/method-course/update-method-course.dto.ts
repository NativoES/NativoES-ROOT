export class UpdateMethodCourseTypeDto {
  private constructor(
    public readonly locale: 'en' | 'es' | 'fr',
    public readonly titulo?: string,
    public readonly descripcion?: string,
    public readonly typeIcon?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateMethodCourseTypeDto?] {
    const { locale, titulo, descripcion, typeIcon } = object;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }

    if (!titulo && !descripcion && !typeIcon) {
      return ['At least one field (titulo, descripcion, typeIcon) must be provided'];
    }

    return [undefined, new UpdateMethodCourseTypeDto(locale, titulo, descripcion, typeIcon)];
  }
}
