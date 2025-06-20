import { CourseModel } from "../../data";
import { CustomError, RegisterCourseDto, UpdateCourseDto } from "../../domain";

export class CourseService {
  constructor() {}

  public async createCourse(dto: RegisterCourseDto) {
    const { locale, ...content } = dto;

    const courseData: any = {
      [locale]: content
    };

    const exist = await CourseModel.findOne({ [`${locale}.nombreDeClase`]: content.nombreDeClase });
    if (exist) {
      throw CustomError.badRequest(`Course with name "${content.nombreDeClase}" already exists in ${locale}`);
    }

    const course = new CourseModel(courseData);
    await course.save();
    return course;
  }

 public async getAllCourses() {
    return await CourseModel.find();
  }

  public async getCourseById(id: string) {
    const course = await CourseModel.findById(id);
    if (!course) throw CustomError.notFound(`Course with ID ${id} not found`);
    return course;
  }

  public async updateCourse(id: string, locale: string, dto: UpdateCourseDto) {
    const course = await CourseModel.findById(id);
    if (!course) throw CustomError.notFound(`Course with ID ${id} not found`);

    (course as any)[locale] = {
      ...(course as any)[locale]?._doc,
      ...dto.content
    };

    await course.save();
    return course;
  }

  public async deleteCourse(id: string) {
    const result = await CourseModel.findByIdAndDelete(id);
    if (!result) throw CustomError.notFound(`Course with ID ${id} not found`);
    return result;
  }
}