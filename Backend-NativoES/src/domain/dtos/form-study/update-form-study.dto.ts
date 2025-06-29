export class UpdateFormStudyDto {
  private constructor(
    public locale: "en" | "es" | "fr",
    public content: {
      titulo?: string;
      descripcion?: string;
      imageUrl?: string;
    }
  ) {}

  static create(data: any): [string?, UpdateFormStudyDto?] {
    const { locale, content } = data;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return ["Invalid or missing locale"];
    }

    if (!content || typeof content !== "object") {
      return ["Missing or invalid content"];
    }

    return [undefined, new UpdateFormStudyDto(locale, content)];
  }
}
