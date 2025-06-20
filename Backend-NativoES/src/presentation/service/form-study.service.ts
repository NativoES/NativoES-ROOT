import { FormStudyModel } from "../../data";
import {
  CustomError,
  RegisterFormStudyDto,
  UpdateFormStudyDto,
} from "../../domain";
import { FileService } from "./file.service";

export class FormStudyService {
  private fileService: FileService = new FileService();

  constructor() {}

  public async registerFormStudy(
    registerDto: RegisterFormStudyDto,
    file?: Express.Multer.File
  ) {
    const { locale, content } = registerDto;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFileToS3(
        file,
        fileName
      );
      content.media = {
        url: uploadResult.Location,
        type: "image",
      };
    }

    const initialData = { [locale]: content };
    const created = await FormStudyModel.create(initialData);
    return created;
  }

  public async updateFormStudy(
    id: string,
    updateDto: UpdateFormStudyDto,
    locale: string,
    file?: Express.Multer.File
  ) {
    try {
      const { content } = updateDto;

      if (!locale || !["en", "es", "fr"].includes(locale)) {
        throw CustomError.badRequest("Invalid or missing locale");
      }

      if (file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFileToS3(
          file,
          fileName
        );
        content.media = {
          url: uploadResult.Location,
          type: "image",
        };
      }

      const updated = await FormStudyModel.findByIdAndUpdate(
        id,
        { [locale]: content },
        { new: true }
      );

      if (!updated) {
        throw CustomError.notFound("FormStudy not found");
      }

      return updated;
    } catch (error) {
      throw CustomError.internalServer(
        "Unexpected error while updating FormStudy"
      );
    }
  }

  public async getAllFormStudy(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;
        const formStudies = await FormStudyModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return formStudies;
      }
      const allFormStudies = await FormStudyModel.find();
      return allFormStudies;
    } catch (error) {
      throw CustomError.internalServer(`Error fetching FormStudies: ${error}`);
    }
  }

  public async getFormStudyById(id: string) {
    try {
      const doc = await FormStudyModel.findById(id);
      if (!doc) throw CustomError.notFound("FormStudy not found");
      return doc;
    } catch (error) {
      throw CustomError.internalServer(
        `Error fetching FormStudy by ID: ${error}`
      );
    }
  }

  public async deleteFormStudy(id: string) {
    try {

      console.log("id de eliminacion: ", id)
      const deleted = await FormStudyModel.findByIdAndDelete(id);
      if (!deleted) throw CustomError.notFound("FormStudy not found");
      return deleted;
    } catch (error) {
      throw CustomError.internalServer(`Error deleting FormStudy: ${error}`);
    }
  }
}
