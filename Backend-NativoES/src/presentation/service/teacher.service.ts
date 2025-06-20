import { TeacherModel } from "../../data";
import {
  CustomError,
  RegisterTeacherDto,
  UpdateTeacherDto,
} from "../../domain";
import { FileService } from "./file.service";

export class TeacherService {
  private fileService: FileService = new FileService();
  
  constructor() {}

  public async registerTeacher(
    registerTeacher: RegisterTeacherDto,
    file?: Express.Multer.File
  ) {
    const {
      locale,
      nombre,
      resumenPrincipal,
      resumenSecundario,
      presentacion,
      cargo,
    } = registerTeacher;

    let fotografia: string | undefined;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFileToS3(
        file,
        fileName
      );
      fotografia = uploadResult.Location;
    }

    const localizedContent = {
      nombre: nombre ?? "",
      resumenPrincipal: resumenPrincipal ?? [],
      resumenSecundario: resumenSecundario ?? [],
      presentacion: presentacion ?? [],
      cargo,
      fotografia,
    };


    const teacherData: any = {
      [locale]: localizedContent,
    };

    try {
      const newTeacher = new TeacherModel(teacherData);
      console.log("📚 Registering new teacher:", newTeacher);
      
      await newTeacher.save();
      return newTeacher;
    } catch (err) {
      throw CustomError.internalServer(`${err}`);
    }
  }

  public async updateTeacher(
    id: string,
    locale: "en" | "es" | "fr",
    updateData: UpdateTeacherDto,
    file?: Express.Multer.File
  ) {
    try {
      const {
        nombre,
        resumenPrincipal,
        resumenSecundario,
        presentacion,
        cargo,
        fotografia: clientFotoUrl,
      } = updateData;

      let fotografia: string | undefined;

      // Manejo de foto nueva (si se sube) o mantener la actual
      if (file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFileToS3(
          file,
          fileName
        );
        fotografia = uploadResult.Location;
      } else if (clientFotoUrl !== undefined) {
        fotografia = clientFotoUrl;
      }

      const localizedContent: any = {};

      if (nombre !== undefined) localizedContent.nombre = nombre;
      if (resumenPrincipal !== undefined)
        localizedContent.resumenPrincipal = resumenPrincipal;
      if (resumenSecundario !== undefined)
        localizedContent.resumenSecundario = resumenSecundario;
      if (presentacion !== undefined)
        localizedContent.presentacion = presentacion;
      if (cargo !== undefined) localizedContent.cargo = cargo;
      if (fotografia !== undefined) localizedContent.fotografia = fotografia;

      const teacherData: any = {};
      for (const [key, value] of Object.entries(localizedContent)) {
        teacherData[`${locale}.${key}`] = value;
      }

      const updated = await TeacherModel.findByIdAndUpdate(
        id,
        { $set: teacherData },
        { new: true, runValidators: true }
      );

      if (!updated) {
        throw CustomError.notFound(`Teacher with id "${id}" not found`);
      }

      console.log("✅ Teacher updated successfully:", updated);
      return updated;
    } catch (error) {
      console.error("❌ Error actualizando teacher:", error);
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAllTeachers(locale: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;

        const teachers = await TeacherModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return teachers;
      }

      const allTeachers = await TeacherModel.find();
      return allTeachers;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getTeacherById(id: string) {
    try {
      const teacher = await TeacherModel.findById(id);
      if (!teacher) {
        throw CustomError.notFound(`Teacher with id "${id}" not found`);
      }
      return teacher;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteTeacherById(id: string) {
    try {
      const teacher = await TeacherModel.findByIdAndDelete(id);
      if (!teacher) {
        throw CustomError.notFound(`Teacher with id "${id}" not found`);
      }
      return teacher;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
