export type Rol = 'ADMIN' | 'PROFESOR' | 'ESTUDIANTE';

export class RegisterUserDto {
  private constructor(
    public readonly nombreCompleto: string,
    public readonly telefono: string,
    public readonly email: string,
    public readonly password: string,
    public readonly lenguaNativa: string,
    public readonly fotografia?: string,
    public readonly rol: Rol = 'ESTUDIANTE'
  ) {}

  static readonly allowedRoles: Rol[] = ['ADMIN', 'PROFESOR', 'ESTUDIANTE'];

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { nombreCompleto, telefono, email, password, lenguaNativa, fotografia, rol } = object;

    if (!nombreCompleto || typeof nombreCompleto !== 'string') {
      return ['El campo "nombreCompleto" es requerido y debe ser string'];
    }

    if (!telefono || typeof telefono !== 'string') {
      return ['El campo "telefono" es requerido y debe ser string'];
    }

    if (!email || typeof email !== 'string') {
      return ['El campo "email" es requerido y debe ser string'];
    }

    if (!password || typeof password !== 'string') {
      return ['El campo "password" es requerido y debe ser string'];
    }

    if (!lenguaNativa || typeof lenguaNativa !== 'string') {
      return ['El campo "lenguaNativa" es requerido y debe ser string'];
    }

    if (fotografia !== undefined && typeof fotografia !== 'string') {
      return ['El campo "fotografia" debe ser string si se proporciona'];
    }

    let validatedRol: Rol = 'ESTUDIANTE';
    if (rol !== undefined) {
      if (typeof rol !== 'string') {
        return ['El campo "rol" debe ser string'];
      }

      if (!RegisterUserDto.allowedRoles.includes(rol as Rol)) {
        return [`El rol '${rol}' no es válido. Opciones válidas: ${RegisterUserDto.allowedRoles.join(', ')}`];
      }

      validatedRol = rol as Rol;
    }

    return [
      undefined,
      new RegisterUserDto(nombreCompleto, telefono, email, password, lenguaNativa, fotografia, validatedRol)
    ];
  }
}
