export class UpdateCharacteristicDto {
  private constructor(
    public locale: "en" | "es" | "fr",
    public content: {
      titulo?: string;
      descripcion?: string;
      visible?: boolean;
      media?: {
        url: string;
        type: "image" | "video";
      };
    }
  ) {}

  static create(data: any): [string?, UpdateCharacteristicDto?] {
    const { locale, content } = data;

    if (!locale || !["en", "es", "fr"].includes(locale)) {
      return ["Invalid or missing locale"];
    }

    if (!content || typeof content !== "object") {
      return ["Missing or invalid content"];
    }

    return [undefined, new UpdateCharacteristicDto(locale, content)];
  }
}
