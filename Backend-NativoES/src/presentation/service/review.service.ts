import { ReviewModel } from "../../data";
import { RegisterReviewDto, UpdateReviewDto } from "../../domain";
import { FileService } from "./file.service";

export class ReviewService {
  private fileService: FileService = new FileService();
  constructor() {}

  public async register(data: RegisterReviewDto, file?: Express.Multer.File) {
    const { locale, resennia, respuestas } = data;

    // Si hay imagen, subir a S3 y asignar la URL
    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFileToS3(
        file,
        fileName
      );
      resennia.avatarUrl = uploadResult.Location;
    }

    // Armar contenido localizado con o sin respuestas
    const contentForLocale: any = { resennia };
    if (respuestas) {
      contentForLocale.respuestas = respuestas;
    }

    // Crear documento con solo el idioma correspondiente
    const review = await ReviewModel.create({
      [locale]: contentForLocale,
    });

    return review;
  }

  public async getAll(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;

        const heroes = await ReviewModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return heroes;
      }
      const allReviews = await ReviewModel.find();
      return allReviews;
    } catch (error) {}
    return await ReviewModel.find();
  }

  public async getById(id: string) {
    const review = await ReviewModel.findById(id);
    if (!review) throw new Error("Review not found");
    return review;
  }

  public async update(
    id: string,
    locale: "en" | "es" | "fr",
    data: UpdateReviewDto
  ) {
    const updatePayload: any = {};

    if (data.resennia) {
      updatePayload[`${locale}.resennia`] = data.resennia;
    }

    if (data.respuestas) {
      updatePayload[`${locale}.respuestas`] = data.respuestas;
    }

    const updated = await ReviewModel.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true }
    );

    if (!updated) throw new Error("Review not found");

    return updated;
  }

  public async delete(id: string) {
    const deleted = await ReviewModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Review not found");
    return deleted;
  }
}
