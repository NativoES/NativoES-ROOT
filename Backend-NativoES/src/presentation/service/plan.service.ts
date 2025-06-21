import { PricePlanModel } from "../../data";
import { CustomError, RegisterPricePlanDto } from "../../domain";
import { UpdatePricePlanDto } from "../../domain/dtos/plans/update-plan.dto";
import { FileService } from "./file.service";

export class PlanService {

  private fileService: FileService = new FileService();
  
  constructor() {}

  public async register(data: RegisterPricePlanDto, file?: Express.Multer.File) {
    const { locale, ...content } = data;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFileToS3(
        file,
        fileName
      );
      content.imageUrl = uploadResult.Location;
    }
    const pricePlan = await PricePlanModel.create({ [locale]: content });
    return pricePlan;
  }

  public async update(id: string, locale: string, data: UpdatePricePlanDto, file?: Express.Multer.File) {
    const updateField = locale;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      throw CustomError.badRequest("Invalid or missing locale");
    }

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFileToS3(
        file,
        fileName
      );
      data.imageUrl = uploadResult.Location;
    }

    const updated = await PricePlanModel.findByIdAndUpdate(
      id,
      { [updateField]: data },
      { new: true }
    );

    if (!updated) throw new Error("Price plan not found");
    return updated;
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


  public async delete(id: string) {
    const deleted = await PricePlanModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Price plan not found");
    return deleted;
  }
}
