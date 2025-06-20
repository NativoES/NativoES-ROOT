import { OrdenarPalabrasModel } from "../../data";
import { CustomError, RegisterOrdenarPalabrasDto, UpdateOrdenarPalabrasDto } from "../../domain";

export class OrdenarPalabrasService {
  constructor() {}

  public async create(dto: RegisterOrdenarPalabrasDto) {
    try {
      const ordenarPalabra = new OrdenarPalabrasModel({ ...dto });
      await ordenarPalabra.save();
      return ordenarPalabra;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateOrdenarPalabrasDto) {
    try {
      const updated = await OrdenarPalabrasModel.findByIdAndUpdate(id, dto, {
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
      return await OrdenarPalabrasModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await OrdenarPalabrasModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await OrdenarPalabrasModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
