export class UpdateReviewDto {
  private constructor(
    public resennia?: {
      nombre?: string;
      avatarUrl?: string;
      contenido?: string;
      calificacion?: number;
    },
    public respuestas?: {
      texto?: string;
      autor?: string;
      contenido?: string;
    }
  ) {}

  static create(data: any): [string?, UpdateReviewDto?] {
    const { resennia, respuestas } = data;

    // Validar calificación si existe
    if (resennia && resennia.calificacion !== undefined) {
      if (typeof resennia.calificacion !== 'number' || resennia.calificacion < 1 || resennia.calificacion > 5) {
        return ['Calificacion must be a number between 1 and 5'];
      }
    }

    // Validar respuestas si existen
    let validatedRespuestas: UpdateReviewDto["respuestas"] | undefined;
    if (respuestas) {
      const { texto, contenido, autor } = respuestas;
      if (!texto && !contenido && !autor) {
        validatedRespuestas = undefined;
      } else if (!texto || !contenido) {
        return ['Incomplete respuestas: texto and contenido are required if respuestas is provided'];
      } else {
        validatedRespuestas = {
          texto,
          contenido,
          autor: autor ?? 'NATIVOES'
        };
      }
    }

    return [
      undefined,
      new UpdateReviewDto(resennia, validatedRespuestas)
    ];
  }
}
