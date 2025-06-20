export class RegisterHeroDto {
  constructor(
    public locale: 'en' | 'es' | 'fr',
    public title: string,
    public subtitle: string,
    public btcPrimary: string,
    public backgroundImageUrl: string,
    public title2?: string,
    public btcSecondary?: string,
    public studentsCount?: string,
    public studentText?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterHeroDto?] {
    const {
      locale,
      title,
      subtitle,
      btcPrimary,
      backgroundImageUrl,
      title2,
      btcSecondary,
      studentsCount,
      studentText
    } = object;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }
    if (!title) return ['Title is required'];
    if (!subtitle) return ['Subtitle is required'];
    if (!btcPrimary) return ['BTC Primary is required'];

    return [undefined, new RegisterHeroDto(
      locale,
      title,
      subtitle,
      btcPrimary,
      backgroundImageUrl,
      title2,
      btcSecondary,
      studentsCount,
      studentText
    )];
  }
}
