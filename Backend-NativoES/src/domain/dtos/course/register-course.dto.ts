export class RegisterCourseDto {
  private constructor(
    public readonly locale: 'en' | 'es' | 'fr',
    public readonly nombreDeClase: string,
    public readonly nivel: string,
    public readonly idioma: 'Español' | 'Ruso' | 'Inglés',
    public readonly horario: string,
    public readonly descripcion?: string,
    public readonly fotografia?: string
  ) {}

  static create(objetc: {[key: string]: any}): [string?, RegisterCourseDto?] {
    const { locale, nombreDeClase, nivel, idioma, horario, descripcion, fotografia } = objetc;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) return ['Invalid locale'];
    if (!nombreDeClase || !nivel || !idioma || !horario) return ['Missing required fields'];
    if (!['Español', 'Ruso', 'Inglés'].includes(idioma)) return ['Invalid idioma'];

    return [undefined, new RegisterCourseDto(locale, nombreDeClase, nivel, idioma, horario, descripcion, fotografia)];
  }
}