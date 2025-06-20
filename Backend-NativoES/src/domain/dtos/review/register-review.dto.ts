export class RegisterReviewDto {
  private constructor(
    public locale: "en" | "es" | "fr",
    public resennia: {
      nombre: string;
      avatarUrl?: string;
      contenido: string;
      calificacion: number;
    },
    public respuestas?: {
      texto: string;
      autor?: string;
      contenido: string;
    }
  ) {}

  static create(data: any): [string?, RegisterReviewDto?] {
    const { locale, resennia, respuestas } = data;

    // Validar locale
    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return ["Invalid or missing locale"];
    }

    // Validar resennia obligatoria
    if (
      !resennia ||
      !resennia.nombre ||
      !resennia.contenido ||
      typeof resennia.calificacion !== "number"
    ) {
      return ["Incomplete or invalid resennia"];
    }

    if (resennia.calificacion < 1 || resennia.calificacion > 5) {
      return ["Calificacion must be between 1 and 5"];
    }

    // Validar respuestas solo si existe
    let validatedRespuestas: RegisterReviewDto["respuestas"] | undefined;
    if (respuestas) {
      if (!respuestas.texto || !respuestas.contenido) {
        return ["Incomplete respuestas"];
      }
      validatedRespuestas = {
        texto: respuestas.texto,
        autor: respuestas.autor ?? "NATIVOES",
        contenido: respuestas.contenido,
      };
    }

    return [
      undefined,
      new RegisterReviewDto(
        locale,
        {
          nombre: resennia.nombre,
          avatarUrl: resennia.avatarUrl,
          contenido: resennia.contenido,
          calificacion: resennia.calificacion,
        },
        validatedRespuestas
      ),
    ];
  }
}
