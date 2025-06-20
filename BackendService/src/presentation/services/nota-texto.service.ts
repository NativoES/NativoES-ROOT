import { NotaTextoModel } from '../../data';
import { CustomError, RegisterNotaTextoDto, UpdateNotaTextoDto } from '../../domain';

export class NotaTextoService {
  async create(dto: RegisterNotaTextoDto) {
    try {
      const nota = new NotaTextoModel({
        titulo: dto.titulo,
        texto: dto.texto,
        claseId: dto.claseId,
        template: dto.template
      });
      await nota.save();
      return nota;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async update(id: string, dto: UpdateNotaTextoDto) {
    try {
      const data: any = {};
      if (dto.titulo !== undefined) data.titulo = dto.titulo;
      if (dto.texto !== undefined) data.texto = dto.texto;
      if (dto.claseId !== undefined) data.claseId = dto.claseId;
      if (dto.template !== undefined) data.template = dto.template;

      return await NotaTextoModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getAll(claseId?: string) {
    try {
      const query = claseId ? { claseId } : {}
      return await NotaTextoModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`)  
    }
    
  }

  async getById(id: string) {
    return await NotaTextoModel.findById(id).populate('claseId');
  }

  async delete(id: string) {
    return await NotaTextoModel.findByIdAndDelete(id);
  }
}
