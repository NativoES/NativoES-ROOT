interface CourseLocaleContent {
  nombreDeClase?: string;
  nivel?: string;
  idioma?: 'Español' | 'Ruso' | 'Inglés';
  horario?: string;
  descripcion?: string;
  fotografia?: string;
}

export interface UpdateCourseDto {
  locale: 'en' | 'es' | 'fr';
  content: CourseLocaleContent;
}

export class UpdateCourseDto {
  static create(object: { [key: string]: any }): [string?, UpdateCourseDto?] {
    const { locale, ...rest } = object;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }

    return [undefined, { locale, content: rest }];
  }
}
