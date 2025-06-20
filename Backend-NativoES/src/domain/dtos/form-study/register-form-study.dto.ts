export class RegisterFormStudyDto {
  private constructor(
    public locale: "en" | "es" | "fr",
    public content: {
      titulo: string;
      descripcion: string;
      visible?: boolean;
      media?: {
        url: string;
        type: "image" | "video";
      };
    }
  ) {}

  static create(data: any): [string?, RegisterFormStudyDto?] {
    const { locale, content } = data;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return ["Invalid or missing locale"];
    }

    if (
      !content ||
      typeof content.titulo !== "string" ||
      typeof content.descripcion !== "string"
    ) {
      return ["Missing or invalid content"];
    }

    return [undefined, new RegisterFormStudyDto(locale, content)];
  }
}
