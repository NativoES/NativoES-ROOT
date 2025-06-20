import { regularExps } from "../../../config/regulzar-exp";

export class RegisterUserDto {

  private constructor(
    public nombreCompleto: string,
    public email: string,
    public password: string,
    public role: 'superadmin' | 'teacher' | 'student',
    public referenceId?: string,
    public avatar?: string, // opcional
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { nombreCompleto, email, password, role, referenceId, avatar } = object;

    if (!nombreCompleto) return ['Missing nombreCompleto'];
    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password too short'];
    if (!role || !['superadmin', 'teacher', 'student'].includes(role)) return ['Invalid role'];
    if (referenceId && !/^[a-f\d]{24}$/i.test(referenceId)) return ['Invalid referenceId format'];

    return [undefined, new RegisterUserDto(nombreCompleto, email, password, role, referenceId, avatar)];
  }
}
