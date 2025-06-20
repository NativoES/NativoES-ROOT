export class UpdateInformationDto {
  private constructor(
    public informacion?: {
      telefono?: string;
      email?: string;
      horarios?: {
        dia: string;
        abierto: boolean;
        horaApertura?: string;
        horaCierre?: string;
      }[];
      redesSociales?: {
        nombre: string;
        url: string;
      }[];
    }
  ) {}

  static create(data: any): [string?, UpdateInformationDto?] {
    const { informacion } = data;

    if (informacion?.horarios) {
      if (!Array.isArray(informacion.horarios)) {
        return ['horarios must be an array'];
      }

      for (const h of informacion.horarios) {
        if (
          typeof h.dia !== 'string' ||
          typeof h.abierto !== 'boolean' ||
          (h.abierto && (!h.horaApertura || !h.horaCierre))
        ) {
          return ['Invalid horario entry in update'];
        }
      }
    }

    if (informacion?.redesSociales) {
      if (!Array.isArray(informacion.redesSociales)) {
        return ['redesSociales must be an array'];
      }

      for (const r of informacion.redesSociales) {
        if (typeof r.nombre !== 'string' || typeof r.url !== 'string') {
          return ['Each red social must have a valid nombre and url'];
        }
      }
    }

    return [undefined, new UpdateInformationDto(informacion)];
  }
}
