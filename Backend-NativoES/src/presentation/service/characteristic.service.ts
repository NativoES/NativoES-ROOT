import { CharacteristicModel } from "../../data";
import {
  CustomError,
  RegisterCharacteristicDto,
  UpdateCharacteristicDto,
} from "../../domain";
import { FileService } from "./file.service";

export class CharacteristicService {
  private fileService: FileService = new FileService();

  constructor() {}

  public async registerCharacteristic(
    registerDto: RegisterCharacteristicDto,
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
    const created = await CharacteristicModel.create(initialData);
    return created;
  }

  public async updateCharacteristic(
    id: string,
    updateDto: UpdateCharacteristicDto,
    locale: string,
    file?: Express.Multer.File
  ) {
    const { content } = updateDto;

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

    const updated = await CharacteristicModel.findByIdAndUpdate(
      id,
      { [locale]: content },
      { new: true }
    );

    if (!updated) {
      throw CustomError.notFound("Characteristic not found");
    }

    return updated;
  }

  public async getAllCharacteristic(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;
        const characteristics = await CharacteristicModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return characteristics;
      }
      const allCharacteristics = await CharacteristicModel.find();
      return allCharacteristics;
    } catch (error) {
      throw CustomError.internalServer(`Error fetching FormStudies: ${error}`);
    }
  }

  public async getCharacteristicById(id: string) {
    try {
      const doc = await CharacteristicModel.findById(id);
      if (!doc) throw CustomError.notFound("Characteristic not found");
      return doc;
    } catch (error) {
      throw CustomError.internalServer(
        `Error fetching Characteristic by ID: ${error}`
      );
    }
  }

  public async deleteCharacteristic(id: string) {
    try {
      console.log("id de eliminacion: ", id);
      const deleted = await CharacteristicModel.findByIdAndDelete(id);
      if (!deleted) throw CustomError.notFound("Characteristic not found");
      return deleted;
    } catch (error) {
      throw CustomError.internalServer(
        `Error deleting Characteristic: ${error}`
      );
    }
  }
}
