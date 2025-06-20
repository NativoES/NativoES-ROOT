import { AudioModel } from "../../data";
import { CustomError, RegisterAudioDto, UpdateAudioDto } from "../../domain";
import { FileService } from "./file.service";

export class AudioService {
  private fileService = new FileService();

  constructor() {}

  public async create(dto: RegisterAudioDto, file: Express.Multer.File) {
    try {
      if (!file) throw CustomError.badRequest('Archivo de audio es requerido');

      const fileName = `audios/${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFile(file, fileName);

      const audio = new AudioModel({
        ...dto,
        audioUrl: uploadResult.Location,
      });

      await audio.save();
      return audio;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateAudioDto, file?: Express.Multer.File) {
    try {
      let updateData = { ...dto };

      if (file) {
        const fileName = `audios/${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFile(file, fileName);
        updateData = { ...updateData, audioUrl: uploadResult.Location };
      }

      const updated = await AudioModel.findByIdAndUpdate(id, updateData, {
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
      return await AudioModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await AudioModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await AudioModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
