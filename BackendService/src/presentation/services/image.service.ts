import { ImageModel } from "../../data";
import { CustomError, RegisterImageDto, UpdateImageDto } from "../../domain";
import { FileService } from "./file.service";

export class ImageService {
  private fileService = new FileService();

  constructor() {}

  public async create(dto: RegisterImageDto, file: Express.Multer.File) {
    try {
      if (!file) throw CustomError.badRequest('Archivo es requerido');

      console.log("data: ", dto)

      const fileName = `images/${Date.now()}-${file.originalname}`;

      const uploadResult = await this.fileService.uploadFile(file, fileName);

      const image = new ImageModel({
        ...dto,
        imagenUrl: uploadResult.Location,
      });

      await image.save();
      return image;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateImageDto, file?: Express.Multer.File) {
    try {
      let updateData = { ...dto };

      if (file) {
        const fileName = `images/${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFile(file, fileName);
        updateData = { ...updateData, imagenUrl: uploadResult.Location };
      }

      const updated = await ImageModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      return updated;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAll(claseId?: string) {
    try {
      const query = claseId ? { claseId } : {};
      return await ImageModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await ImageModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await ImageModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
