import { UserModel } from "../../data";
import {
  CustomError,
  generateWelcomeEmail,
  RegisterUserDto,
  UpdateUserDto,
} from "../../domain";
import { MailService } from "./mail.service";
import { FileService } from "./file.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  private mailService = new MailService();
  private fileService = new FileService();

  constructor() {}

  public async create(dto: RegisterUserDto, file?: Express.Multer.File) {
    try {
      const existing = await UserModel.findOne({ email: dto.email });
      if (existing)
        throw CustomError.badRequest("El correo ya está registrado");

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const rol = dto.rol ?? "ESTUDIANTE";

      const userData: any = {
        ...dto,
        password: hashedPassword,
        rol,
      };

      if (file) {
        const fileName = `users/${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFile(file, fileName);
        userData.fotografia = uploadResult.Location;
      }

      const user = new UserModel(userData);
      await user.save();

      const emailHtml = generateWelcomeEmail(
        dto.nombreCompleto,
        dto.email,
        dto.password
      );
      await this.mailService.sendEmail({
        to: dto.email,
        subject: "Bienvenido a NATIVOES",
        html: emailHtml,
      });

      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(
    id: string,
    dto: UpdateUserDto,
    file?: Express.Multer.File
  ) {
    try {
      let updateData: any = { ...dto };

      if (dto.password) {
        updateData.password = await bcrypt.hash(dto.password, 10);
      }

      if (file) {
        const fileName = `users/${Date.now()}-${file.originalname}`;
        const uploadResult = await this.fileService.uploadFile(file, fileName);
        updateData.fotografia = uploadResult.Location;
      }

      const updated = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updated) throw CustomError.notFound("Usuario no encontrado");

      return updated;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAll(limit: number, page: number, rol?: string) {
    try {
      const skip = (page - 1) * limit;

      const filter: any = {};
      if (rol) {
        filter.rol = rol;
      }

      const [data, total] = await Promise.all([
        UserModel.find(filter).select("-password").skip(skip).limit(limit),
        UserModel.countDocuments(filter),
      ]);

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAllUserByRol(rol?: string) {
    try {
      const filter: any = {};
      if (rol) {
        filter.rol = rol;
      }

      const users = await UserModel.find(filter).select("-password");

      return users;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public getUserIdFromToken (token: string): string {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      return decoded.id;
    } catch (err) {
      throw CustomError.unauthorized("Token inválido o expirado");
    }
  };

  public async getByToken(token: string) {
    try {
      const userId = this.getUserIdFromToken(token);
      const user = await UserModel.findById(userId).select("-password");

      if (!user) {
        throw CustomError.notFound("Usuario no encontrado");
      }

      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      const user = await UserModel.findById(id).select("-password");
      if (!user || user.rol !== "ESTUDIANTE") {
        throw CustomError.notFound("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      const deleted = await UserModel.findByIdAndDelete(id);
      if (!deleted) throw CustomError.notFound("Usuario no encontrado");
      return deleted;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
