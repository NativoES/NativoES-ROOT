import { completarTextoModel } from "../../data/mongo/models/text-completation.model";
import {
  CustomError,
  RegisterCompletarTextoDto,
  UpdateCompletarTextoDto,
} from "../../domain";

export class CompletarTextoService {
  constructor() {}

  public async createCT(dto: RegisterCompletarTextoDto) {
    try {
      const ct = new completarTextoModel({
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        textoOriginal: dto.textoOriginal,
        palabrasCorrectas: dto.palabrasCorrectas,
        claseId: dto.claseId,
        template: dto.template,
      });
      await ct.save();
      return ct;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateCT(id: string, dto: UpdateCompletarTextoDto) {
    try {
      const data: any = {};

      if (dto.titulo !== undefined) data.titulo = dto.titulo;
      if (dto.descripcion !== undefined) data.descripcion = dto.descripcion;
      if (dto.template !== undefined) data.template = dto.template;
      if (dto.textoOriginal !== undefined)
        data.textoOriginal = dto.textoOriginal;
      if (dto.palabrasCorrectas !== undefined)
        data.palabrasCorrectas = dto.palabrasCorrectas;
      if (dto.claseId !== undefined) data.claseId = dto.claseId;

      const updated = await completarTextoModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      return updated;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAllCT(claseId?: string) {
    try {
      const query = claseId ? { claseId } : {};
      return await completarTextoModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getByIdCT(id: string) {
    try {
      const ct = await completarTextoModel.findById(id).populate("claseId");
      return ct;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      const deleted = await completarTextoModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
