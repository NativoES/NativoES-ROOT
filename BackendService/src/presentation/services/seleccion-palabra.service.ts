import { SeleccionPalabrasModel } from "../../data";
import { CustomError, RegisterSeleccionPalabrasDto, UpdateSeleccionPalabrasDto } from "../../domain";

export class SeleccionPalabrasService {
  constructor() {}

  public async create(dto: RegisterSeleccionPalabrasDto) {
    try {
      const seleccionPalabra = new SeleccionPalabrasModel({ ...dto });
      await seleccionPalabra.save();
      return seleccionPalabra;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateSeleccionPalabrasDto) {
    try {
      const updated = await SeleccionPalabrasModel.findByIdAndUpdate(id, dto, {
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
      return await SeleccionPalabrasModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await SeleccionPalabrasModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await SeleccionPalabrasModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
