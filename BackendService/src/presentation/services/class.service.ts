import { ClassesModel } from "../../data";
import { CustomError, RegisterClassDto, UpdateClassDto } from "../../domain";
import { FileService } from "./file.service";

export class ClassesService {
  private fileService: FileService = new FileService();

  constructor() {}

  public async createClass(dto: RegisterClassDto, file?: Express.Multer.File) {
    try {
      const newClass = new ClassesModel({
        nombreClase: dto.nombreClase,
        nivel: dto.nivel,
        idioma: dto.idioma,
        horario: dto.horario,
        descripcion: dto.descripcion,
        isPrivate: dto.isPrivate,
        imagen: dto.imagen,
      });

      if (file) {
        if (file) {
          const fileName = `${Date.now()}-${file.originalname}`;
          const uploadResult = await this.fileService.uploadFileToS3(
            file,
            fileName
          );
          newClass.imagen = uploadResult.Location;
        }
      }
      await newClass.save();
      return newClass;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateClass(
    id: string,
    dto: UpdateClassDto,
    file?: Express.Multer.File
  ) {
    try {
      const data: any = {};
      if (dto.nombreClase !== undefined) data.nombreClase = dto.nombreClase;
      if (dto.nivel !== undefined) data.nivel = dto.nivel;
      if (dto.idioma !== undefined) data.idioma = dto.idioma;
      if (dto.horario !== undefined) data.horario = dto.horario;
      if (dto.descripcion !== undefined) data.descripcion = dto.descripcion;
      if (dto.isPrivate !== undefined) data.isPrivate = dto.isPrivate;
      if (dto.imagen !== undefined) data.imagen = dto.imagen;

      if (file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFileToS3(
          file,
          fileName
        );
        data.imagen = uploadResult.Location;
      }

      const updated = await ClassesModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return updated;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAllClasses(limit: number, page: number, isPrivate?: boolean) {
    try {
      const filter: any = {};

      const skip = (page - 1) * limit;

      if (isPrivate !== undefined) {
        filter.isPrivate = isPrivate;
      }

      const [data, total] = await Promise.all([
        ClassesModel.find(filter).skip(skip).limit(limit),
        ClassesModel.countDocuments(filter),
      ]);

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getClassById(id: string) {
    try {
      const clase = await ClassesModel.findById(id);
      return clase;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteClass(id: string) {
    try {
      const deleted = await ClassesModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
