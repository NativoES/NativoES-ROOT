export class UpdatePricePlanDto {
  constructor(
    public tituloDelPlan?: string,
    public descripcion?: string,
    public imageUrl?: string,
    public typePlan?: {
      type: string;
      caracteristicas: {
        precioRegular: number;
        precioConDescuento?: number | null;
        caracteristica: string;
      }[];
    }[]
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdatePricePlanDto?] {
    const { tituloDelPlan, descripcion, imageUrl, typePlan } = object;

    if (!tituloDelPlan && !descripcion && !imageUrl && !typePlan) {
      return ['At least one field is required to update'];
    }

    if (typePlan) {
      if (!Array.isArray(typePlan)) return ['typePlan must be an array'];
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
    }

    return [undefined, new UpdatePricePlanDto(tituloDelPlan, descripcion, imageUrl, typePlan)];
  }
}
