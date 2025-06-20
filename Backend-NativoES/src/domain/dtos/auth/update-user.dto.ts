import { regularExps } from "../../../config/regulzar-exp";

export class UpdateUserDto {

  private constructor(
    public nombreCompleto?: string,
    public email?: string,
    public role?: 'superadmin' | 'teacher' | 'student',
    public referenceId?: string,
    public avatar?: string, // URL o path de la imagen, opcional
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { nombreCompleto, email, role, referenceId, avatar } = object;

    if (email && !regularExps.email.test(email)) {
      return ['Email is not valid'];
    }

    if (role && !['superadmin', 'teacher', 'student'].includes(role)) {
      return ['Invalid role'];
    }

    if (referenceId && !/^[a-f\d]{24}$/i.test(referenceId)) {
      return ['Invalid referenceId format'];
    }

    return [undefined, new UpdateUserDto(nombreCompleto, email, role, referenceId, avatar)];
  }
}

