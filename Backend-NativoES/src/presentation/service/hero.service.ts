import { HeroModel } from "../../data/mongo/models/hero.model";
import { CustomError, RegisterHeroDto, UpdateHeroDto } from "../../domain";
import { FileService } from "./file.service";

export class HeroService {
  private fileService: FileService = new FileService();
  constructor() {}

  public async registerHero(
    registerHeroDto: RegisterHeroDto,
    file?: Express.Multer.File
  ) {
    const {
      locale,
      title,
      subtitle,
      btcPrimary,
      title2,
      btcSecondary,
      studentsCount,
      studentText,
    } = registerHeroDto;

    let backgroundImageUrl: string | undefined;

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadResult = await this.fileService.uploadFileToS3(
        file,
        fileName
      );
      backgroundImageUrl = uploadResult.Location;
    }

    const localizedContent = {
      title,
      subtitle,
      btcPrimary,
      title2,
      btcSecondary,
      studentsOnline: studentsCount,
      textSchool: studentText,
    };

    const heroData: any = {
      [locale]: localizedContent,
    };

    if (backgroundImageUrl) {
      heroData.backgroundImageUrl = backgroundImageUrl;
    }

    const existHero = await HeroModel.findOne({ [locale]: { $exists: true } });
    if (existHero) {
      throw CustomError.badRequest(
        `Hero content for locale "${locale}" already exists`
      );
    }

    try {
      const hero = new HeroModel(heroData);
      await hero.save();
      return hero;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateHero(
    id: string,
    locale: string,
    updateData: UpdateHeroDto,
    file?: Express.Multer.File
  ) {
    try {
      const {
        title,
        subtitle,
        btcPrimary,
        title2,
        btcSecondary,
        studentsCount,
        studentText,
        backgroundImageUrl: clientImageUrl,
      } = updateData;

      console.log("data hero update: ", updateData);
      

      let backgroundImageUrl: string | undefined;

      if (file) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFileToS3(
          file,
          fileName
        );
        backgroundImageUrl = uploadResult.Location;
      } else if (clientImageUrl !== undefined) {
        backgroundImageUrl = clientImageUrl;
      }

      const localizedContent: any = {};

      if (title !== undefined) localizedContent.title = title;
      if (subtitle !== undefined) localizedContent.subtitle = subtitle;
      if (btcPrimary !== undefined) localizedContent.btcPrimary = btcPrimary;
      if (title2 !== undefined) localizedContent.title2 = title2;
      if (btcSecondary !== undefined)
        localizedContent.btcSecondary = btcSecondary;
      if (studentsCount !== undefined)
        localizedContent.studentsOnline = studentsCount;
      if (studentText !== undefined) localizedContent.textSchool = studentText;

      // ✅ Formato de $set con campos anidados
      const heroData: any = {};
      for (const [key, value] of Object.entries(localizedContent)) {
        if (value !== undefined) {
          heroData[`${locale}.${key}`] = value;
        }
      }

      if (backgroundImageUrl !== undefined) {
        heroData["backgroundImageUrl"] = backgroundImageUrl;
      }

      const updated = await HeroModel.findByIdAndUpdate(
        id,
        { $set: heroData },
        { new: true, runValidators: true }
      );

      if (!updated) {
        throw CustomError.notFound(`Hero with id "${id}" not found`);
      }

      console.log("✅ Hero updated successfully:", updated);
      return updated;
    } catch (error) {
      console.error("❌ Error actualizando hero:", error);
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAllHeroes(locale?: string) {
    try {
      if (locale) {
        const projection: { [key: string]: number } = {};
        projection[locale] = 1;
        projection["backgroundImageUrl"] = 1;

        const heroes = await HeroModel.find(
          { [locale]: { $exists: true } },
          projection
        );
        return heroes;
      }

      const allHeroes = await HeroModel.find();
      return allHeroes;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getHeroById(id: string) {
    try {
      const hero = await HeroModel.findById(id);
      if (!hero) {
        throw CustomError.notFound(`Hero with id "${id}" not found`);
      }
      return hero;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async deleteHeroById(id: string) {
    try {
      const hero = await HeroModel.findByIdAndDelete(id);
      if (!hero) {
        throw CustomError.notFound(`Hero with id "${id}" not found`);
      }
      return hero;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
