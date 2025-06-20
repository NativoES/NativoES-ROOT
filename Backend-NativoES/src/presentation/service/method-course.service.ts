import { MethodCourseTypeModel } from "../../data";
import { CustomError, RegisterMethodCourseTypeDto, UpdateMethodCourseTypeDto } from "../../domain";

export class MethodCourseService {
  constructor() {}

  async create(dto: RegisterMethodCourseTypeDto) {
    const doc = await MethodCourseTypeModel.create({
      [dto.locale]: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        typeIcon: dto.typeIcon,
      }
    });
    return doc;
  }

  public async getAll(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;

        const methodCourseTypes = await MethodCourseTypeModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return methodCourseTypes;
      }
      const methodCourseTypes = await MethodCourseTypeModel.find();
      return methodCourseTypes;
    } catch (error) {
      throw CustomError.internalServer(`Error fetching method course types: ${error}`);
    }
  }

  public async getById(id: string) {
    return await MethodCourseTypeModel.findById(id);
  }

  public async update(id: string, locale: 'en' | 'es' | 'fr', dto: UpdateMethodCourseTypeDto) {
    const updateData: any = {};
    if (dto.titulo) updateData[`${locale}.titulo`] = dto.titulo;
    if (dto.descripcion) updateData[`${locale}.descripcion`] = dto.descripcion;
    if (dto.typeIcon) updateData[`${locale}.typeIcon`] = dto.typeIcon;

    return await MethodCourseTypeModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  }

  public async delete(id: string) {
    return await MethodCourseTypeModel.findByIdAndDelete(id);
  }
}