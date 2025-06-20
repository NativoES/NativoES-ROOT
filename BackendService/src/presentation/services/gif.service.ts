import { GifModel } from "../../data";
import { CustomError, RegisterGifDto, UpdateGifDto } from "../../domain";
import { FileService } from "./file.service";

export class GifService {
  private fileService = new FileService();

  constructor() {}

  public async create(dto: RegisterGifDto, file: Express.Multer.File) {
    try {
      if (!file) throw CustomError.badRequest('Archivo es requerido');

      const fileName = `gifs/${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFile(file, fileName);

      const gif = new GifModel({
        ...dto,
        gifUrl: uploadResult.Location, // URL pública del gif subido
      });

      await gif.save();
      return gif;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateGifDto, file?: Express.Multer.File) {
    try {
      let updateData = { ...dto };

      if (file) {
        const fileName = `gifs/${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFile(file, fileName);
        updateData = { ...updateData, gifUrl: uploadResult.Location };
      }

      const updated = await GifModel.findByIdAndUpdate(id, updateData, {
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
      return await GifModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await GifModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await GifModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
