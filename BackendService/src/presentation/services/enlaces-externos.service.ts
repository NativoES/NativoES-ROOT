import { EnlaceExternoModel } from "../../data";
import {
  CustomError,
  RegisterEnlaceExternoDto,
  UpdateEnlaceExternoDto
} from "../../domain";

export class EnlaceExternoService {
  constructor() {}

  public async create(dto: RegisterEnlaceExternoDto) {
    try {
      const enlace = new EnlaceExternoModel({ ...dto });
      await enlace.save();
      return enlace;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateEnlaceExternoDto) {
    try {
      const updated = await EnlaceExternoModel.findByIdAndUpdate(id, dto, {
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
      return await EnlaceExternoModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await EnlaceExternoModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await EnlaceExternoModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
