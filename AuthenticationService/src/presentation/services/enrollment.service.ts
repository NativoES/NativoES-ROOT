import { EnrollmentModel } from "../../data";
import {
  CustomError,
  RegisterEnrollmentDto,
  UpdateEnrollmentDto
} from "../../domain";

export class EnrollmentService {
  constructor() {}

  public async create(dto: RegisterEnrollmentDto) {
    try {
      const exists = await EnrollmentModel.findOne({
        estudianteId: dto.estudianteId,
        claseId: dto.claseId
      });

      if (exists) {
        throw CustomError.badRequest("El estudiante ya está inscrito en esta clase.");
      }

      const enrollment = new EnrollmentModel(dto);
      await enrollment.save();
      return enrollment;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(id: string, dto: UpdateEnrollmentDto) {
    try {
      const updated = await EnrollmentModel.findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true
      });

      if (!updated) throw CustomError.notFound("Inscripción no encontrada");

      return updated;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getAllByClase(claseId: string) {
    try {
      return await EnrollmentModel.find({ claseId }).populate("estudianteId", "-password");
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getById(id: string) {
    try {
      const enrollment = await EnrollmentModel.findById(id).populate("estudianteId", "-password");
      if (!enrollment) throw CustomError.notFound("Inscripción no encontrada");
      return enrollment;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async delete(id: string) {
    try {
      const deleted = await EnrollmentModel.findByIdAndDelete(id);
      if (!deleted) throw CustomError.notFound("Inscripción no encontrada");
      return deleted;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getPaginatedStudentsByClase(claseId: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const [total, enrollments] = await Promise.all([
        EnrollmentModel.countDocuments({ claseId }),
        EnrollmentModel.find({ claseId })
          .skip(skip)
          .limit(limit)
          .populate("estudianteId", "-password"),
      ]);

      const students = enrollments.map(e => e.estudianteId); // Solo los estudiantes

      return {
        total,
        page,
        limit,
        students,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

}
