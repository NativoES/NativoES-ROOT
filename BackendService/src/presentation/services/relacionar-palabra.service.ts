import { RelacionarPalabrasModel } from "../../data";
import {
  CustomError,
  RegisterRelacionarPalabrasDto,
  UpdateRelacionarPalabrasDto
} from "../../domain";

export class RelacionarPalabrasService {
  constructor() {}

  public async create(dto: RegisterRelacionarPalabrasDto) {
    try {
      const relacion = new RelacionarPalabrasModel({ ...dto });
      await relacion.save();
      return relacion;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateRelacionarPalabrasDto) {
    try {
      const updated = await RelacionarPalabrasModel.findByIdAndUpdate(id, dto, {
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
      return await RelacionarPalabrasModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await RelacionarPalabrasModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await RelacionarPalabrasModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
