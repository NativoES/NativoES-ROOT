import { PricePlanModel } from "../../data";
import { CustomError, RegisterPricePlanDto } from "../../domain";
import { UpdatePricePlanDto } from "../../domain/dtos/plans/update-plan.dto";

export class PlanService {
  constructor() {}

  public async register(data: RegisterPricePlanDto) {
    const { locale, ...content } = data;
    const pricePlan = await PricePlanModel.create({ [locale]: content });
    return pricePlan;
  }

  public async getAll(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;
        const plans = await PricePlanModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return plans;
      }
      const allPlans = await PricePlanModel.find();
      return allPlans;
    } catch (error) {
      throw CustomError.internalServer(`Error fetching price plans: ${error}`);
    }
  }

  public async getById(id: string) {
    const pricePlan = await PricePlanModel.findById(id);
    if (!pricePlan) throw new Error("Price plan not found");
    return pricePlan;
  }

  public async update(id: string, locale: string, data: UpdatePricePlanDto) {
    // Usamos la clave locale directamente sin el punto para acceder al campo correcto
    const updateField = locale;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      throw CustomError.badRequest("Invalid or missing locale");
    }

    // Actualizamos el documento localizando el campo correspondiente
    const updated = await PricePlanModel.findByIdAndUpdate(
      id,
      { [updateField]: data },
      { new: true } // para que devuelva el documento actualizado
    );

    if (!updated) throw new Error("Price plan not found");
    return updated;
  }

  public async delete(id: string) {
    const deleted = await PricePlanModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Price plan not found");
    return deleted;
  }
}
