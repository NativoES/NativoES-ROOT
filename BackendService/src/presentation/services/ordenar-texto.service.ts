import { OrdenarTextoModel } from "../../data";
import { CustomError, RegisterOrdenarTextoDto, UpdateOrdenarTextoDto } from "../../domain";

export class OrdenarTextoService {
  constructor() {}

  public async create(dto: RegisterOrdenarTextoDto) {
    try {
      const ordenarTexto = new OrdenarTextoModel({ ...dto });
      await ordenarTexto.save();
      return ordenarTexto;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateOrdenarTextoDto) {
    try {
      const updated = await OrdenarTextoModel.findByIdAndUpdate(id, dto, {
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
      const query = claseId ? { claseId } : {};
      return await OrdenarTextoModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await OrdenarTextoModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await OrdenarTextoModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
