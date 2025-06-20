import { NotaModel } from "../../data";
import { CustomError, RegisterNotaDto, UpdateNotaDto } from "../../domain";

export class NotaService {
  constructor() {}

  public async create(dto: RegisterNotaDto) {
    try {
      const nota = new NotaModel({ ...dto });
      await nota.save();
      return nota;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateNotaDto) {
    try {
      const updated = await NotaModel.findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true
      });
      return updated;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAll(claseId?: string) {
    try {
      const query = claseId ? {claseId} : {}
      return await NotaModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await NotaModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await NotaModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
