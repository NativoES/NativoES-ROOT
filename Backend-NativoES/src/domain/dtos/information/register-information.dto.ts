export class RegisterInformationDto {
  private constructor(
    public locale: 'en' | 'es' | 'fr',
    public informacion: {
      telefono: string;
      email: string;
      horarios: {
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

  static create(data: any): [string?, RegisterInformationDto?] {
    const { locale, informacion } = data;

    if (!locale || !['en', 'es', 'fr'].includes(locale)) {
      return ['Invalid or missing locale'];
    }

    if (
      !informacion ||
      typeof informacion.telefono !== 'string' ||
      typeof informacion.email !== 'string' ||
      !Array.isArray(informacion.horarios)
    ) {
      return ['Incomplete or invalid informacion'];
    }

    for (const h of informacion.horarios) {
      if (
        typeof h.dia !== 'string' ||
        typeof h.abierto !== 'boolean' ||
        (h.abierto && (!h.horaApertura || !h.horaCierre))
      ) {
        return ['Invalid horario entry'];
      }
    }

    if (informacion.redesSociales) {
      if (!Array.isArray(informacion.redesSociales)) {
        return ['redesSociales must be an array'];
      }

      for (const r of informacion.redesSociales) {
        if (typeof r.nombre !== 'string' || typeof r.url !== 'string') {
          return ['Each red social must have a valid nombre and url'];
        }
      }
    }

    return [
      undefined,
      new RegisterInformationDto(locale, {
        telefono: informacion.telefono,
        email: informacion.email,
        horarios: informacion.horarios,
        redesSociales: informacion.redesSociales,
      }),
    ];
  }
}
