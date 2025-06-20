export class RegisterPricePlanDto {
  constructor(
    public locale: 'en' | 'es' | 'fr',
    public tituloDelPlan: string,
    public descripcion: string,
    public imageUrl: string,
    public typePlan: {
      type: string;
      caracteristicas: {
        precioRegular: number;
        precioConDescuento?: number | null;
        caracteristica: string;
      }[];
    }[]
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterPricePlanDto?] {
    const { locale, tituloDelPlan, descripcion, imageUrl, typePlan } = object;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }

    if (!tituloDelPlan) return ['tituloDelPlan is required'];
    if (!descripcion) return ['descripcion is required'];
    if (!imageUrl) return ['imageUrl is required'];
    if (!Array.isArray(typePlan) || typePlan.length === 0) {
      return ['typePlan must be a non-empty array'];
    }

    for (const item of typePlan) {
      if (!item.type) return ['Each typePlan item must have a type'];
      if (!Array.isArray(item.caracteristicas) || item.caracteristicas.length === 0) {
        return ['Each typePlan must have a non-empty caracteristicas array'];
      }
      for (const c of item.caracteristicas) {
        if (typeof c.precioRegular !== 'number') return ['precioRegular is required and must be a number'];
        if (c.precioConDescuento !== undefined && c.precioConDescuento !== null && typeof c.precioConDescuento !== 'number') {
          return ['precioConDescuento must be a number or null'];
        }
        if (typeof c.caracteristica !== 'string') return ['caracteristica must be a string'];
      }
    }

    return [undefined, new RegisterPricePlanDto(locale, tituloDelPlan, descripcion, imageUrl, typePlan)];
  }
}
