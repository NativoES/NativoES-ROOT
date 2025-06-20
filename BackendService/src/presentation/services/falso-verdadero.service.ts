import { FalsoVerdaderoModel } from "../../data";
import {
  CustomError,
  RegisterFalsoVerdaderoDto,
  UpdateFalsoVerdaderoDto
} from "../../domain";

export class FalsoVerdaderoService {
  constructor() {}

  public async create(dto: RegisterFalsoVerdaderoDto) {
    try {
      const falsoVerdadero = new FalsoVerdaderoModel({ ...dto });
      await falsoVerdadero.save();
      return falsoVerdadero;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateFalsoVerdaderoDto) {
    try {
      const updated = await FalsoVerdaderoModel.findByIdAndUpdate(id, dto, {
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
      return await FalsoVerdaderoModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await FalsoVerdaderoModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await FalsoVerdaderoModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
