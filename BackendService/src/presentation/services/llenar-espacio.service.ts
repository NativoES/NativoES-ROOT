import { llenarEspaciosModel } from "../../data";
import { CustomError, RegisterLlenarEspaciosDto, UpdateLlenarEspaciosDto } from "../../domain";

export class LlenarEspaciosService {
  constructor() {}

  public async create(dto: RegisterLlenarEspaciosDto) {
    try {
      const llenarEspacio = new llenarEspaciosModel({ ...dto });
      await llenarEspacio.save();
      return llenarEspacio;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateLlenarEspaciosDto) {
    try {
      const updated = await llenarEspaciosModel.findByIdAndUpdate(id, dto, {
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
      return await llenarEspaciosModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await llenarEspaciosModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await llenarEspaciosModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
