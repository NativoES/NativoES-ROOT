import { InformationModel } from "../../data";
import {
  CustomError,
  RegisterInformationDto,
  UpdateInformationDto,
} from "../../domain";

export class InformationService {
  constructor() {}

  public async registerInformation(
    registerInformationDto: RegisterInformationDto
  ) {
    const { locale, informacion } = registerInformationDto;

    const exists = await InformationModel.findOne({
      [`${locale}`]: { $exists: true },
    });

    if (exists) {
      throw CustomError.notFound(
        `Información ya registrada para el idioma "${locale}"`
      );
    }

    const created = await InformationModel.create({
      [locale]: informacion,
    });

    return created;
  }

  public async getAllInformtions(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;
        projection["backgroundImageUrl"] = 1;

        const heroes = await InformationModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return heroes;
      }

      const allHeroes = await InformationModel.find();
      return allHeroes;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    const info = await InformationModel.findById(id).lean();
    if (!info)
      throw CustomError.notFound(`Information with the id ${id} not found.`);

    return info;
  }

  public async update(id: string, locale: string, data: UpdateInformationDto) {
    const existing = await InformationModel.findById(id);
    if (!existing) throw CustomError.notFound("Information not found");

    const oldInfo = (existing as any)[locale] || {
      telefono: "",
      email: "",
      horarios: [],
      redesSociales: [],
    };

    const telefono = data.informacion?.telefono ?? oldInfo.telefono;
    const email = data.informacion?.email ?? oldInfo.email;

    // === Horarios ===
    const horariosViejos = oldInfo.horarios || [];
    const horariosNuevos = data.informacion?.horarios || [];

    const mapaHorarios = new Map(
      horariosViejos.map((h: { dia: string }) => [h.dia, h])
    );
    for (const h of horariosNuevos) {
      mapaHorarios.set(h.dia, h); // reemplaza o agrega
    }
    const horariosFinal = Array.from(mapaHorarios.values());

    // === Redes Sociales ===
    const redesViejas = oldInfo.redesSociales || [];
    const redesNuevas = data.informacion?.redesSociales || [];

    // Puedes decidir cómo hacer el merge: aquí reemplazamos todo si viene redes nuevas
    const redesSocialesFinal =
      redesNuevas.length > 0 ? redesNuevas : redesViejas;

    (existing as any)[locale] = {
      telefono,
      email,
      horarios: horariosFinal,
      redesSociales: redesSocialesFinal,
    };

    await existing.save();
    return existing;
  }

  public async delete(id: string) {
    const deleted = await InformationModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Information not found");
    return deleted;
  }
}
