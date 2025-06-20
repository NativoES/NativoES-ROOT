import { ImagenPalabraModel } from "../../data";
import {
  Asociacion,
  CustomError,
  RegisterImagenPalabraDto,
  UpdateImagenPalabraDto,
} from "../../domain";
import { FileService } from "./file.service";

export class ImagenPalabraService {
  private fileService: FileService = new FileService();

  constructor() {}

  public async create(
    dtoBase: RegisterImagenPalabraDto,
    palabras: string[],
    files: Express.Multer.File[]
  ) {
    if (palabras.length !== files.length) {
      throw CustomError.badRequest(
        "La cantidad de palabras y archivos no coincide"
      );
    }

    const asociaciones: Asociacion[] = await Promise.all(
      palabras.map(async (palabra, i) => {
        const file = files[i];
        const fileName = `${Date.now()}-${file.originalname}`;
        const { Location: imagenUrl } = await this.fileService.uploadFileToS3(
          file,
          fileName
        );
        return { palabra, imagenUrl };
      })
    );

    const imagenPalabra = new ImagenPalabraModel({
      titulo: dtoBase.titulo,
      descripcion: dtoBase.descripcion,
      claseId: dtoBase.claseId,
      template: dtoBase.template,
      asociaciones,
    });

    await imagenPalabra.save();
    return imagenPalabra;
  }

 public async update(
  id: string,
  dto: UpdateImagenPalabraDto & { asociaciones: { palabra: string }[] },
  files: Express.Multer.File[]
) {
  if (!dto.asociaciones || !Array.isArray(dto.asociaciones)) {
    throw CustomError.badRequest('Faltan asociaciones en el dto');
  }

  const nuevasAsociaciones: Asociacion[] = [];

  for (const file of files) {
    // Obtener índice del campo, ej: "asociaciones[0][imagen]"
    const match = file.fieldname.match(/asociaciones\[(\d+)\]\[imagen\]/);
    if (!match) continue;
    const index = Number(match[1]);

    // Obtener palabra correspondiente por índice
    const palabra = dto.asociaciones[index]?.palabra;
    if (!palabra) {
      throw CustomError.badRequest(
        `Falta la palabra para la imagen en el índice ${index}`
      );
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const { Location: imagenUrl } = await this.fileService.uploadFileToS3(
      file,
      fileName
    );

    nuevasAsociaciones.push({ palabra, imagenUrl });
  }

  // Obtener ejercicio existente
  const existente = await ImagenPalabraModel.findById(id);
  if (!existente) throw CustomError.notFound('No se encontró el ejercicio');

  // Agregar nuevas asociaciones al final
  const asociacionesFinales = [...(existente.asociaciones || []), ...nuevasAsociaciones];

  // Actualizar ejercicio
  const actualizado = await ImagenPalabraModel.findByIdAndUpdate(
    id,
    { ...dto, asociaciones: asociacionesFinales },
    { new: true, runValidators: true }
  );

  return actualizado;
}


  public async getAll(claseId?: string) {
    try {
      const query = claseId ? { claseId } : {};
      return await ImagenPalabraModel.find(query);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      return await ImagenPalabraModel.findById(id).populate("claseId");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      return await ImagenPalabraModel.findByIdAndDelete(id);
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
