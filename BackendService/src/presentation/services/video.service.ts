import { VideoModel } from "../../data";
import { CustomError, RegisterVideoDto, UpdateVideoDto } from "../../domain";
import { FileService } from "./file.service";


export class VideoService {
  private fileService = new FileService();

  public async create(dto: RegisterVideoDto, file: Express.Multer.File) {
    if (!file) throw CustomError.badRequest('Archivo es requerido');
    const fileName = `videos/${Date.now()}-${file.originalname}`;
    const uploadResult = await this.fileService.uploadFile(file, fileName);

    const video = new VideoModel({
      ...dto,
      videoUrl: uploadResult.Location,
    });

    await video.save();
    return video;
  }

  public async update(id: string, dto: UpdateVideoDto, file?: Express.Multer.File) {
    let updateData = { ...dto };
    if (file) {
      const fileName = `videos/${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFile(file, fileName);
      updateData = { ...updateData, videoUrl: uploadResult.Location };
    }

    return await VideoModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  public async getAll(claseId?: string) {
    const query = claseId ? { claseId } : {};
    return await VideoModel.find(query);
  }

  public async getById(id: string) {
    return await VideoModel.findById(id).populate("claseId");
  }

  public async delete(id: string) {
    return await VideoModel.findByIdAndDelete(id);
  }
}
