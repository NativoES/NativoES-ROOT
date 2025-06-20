import { Rol } from './register-user.dto';

export class UpdateUserDto {
  private constructor(
    public readonly nombreCompleto?: string,
    public readonly telefono?: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly lenguaNativa?: string,
    public readonly fotografia?: string,
    public readonly rol?: Rol
  ) {}

  static readonly allowedFields = [
    'nombreCompleto',
    'telefono',
    'email',
    'password',
    'lenguaNativa',
    'fotografia',
    'rol'
  ];

  static readonly allowedRoles: Rol[] = ['ADMIN', 'PROFESOR', 'ESTUDIANTE'];

  static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const invalidFields = Object.keys(object).filter(
      key => !UpdateUserDto.allowedFields.includes(key)
    );
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const {
      nombreCompleto,
      telefono,
      email,
      password,
      lenguaNativa,
      fotografia,
      rol
    } = object;

    if (nombreCompleto !== undefined && typeof nombreCompleto !== 'string') {
      return ['"nombreCompleto" debe ser string'];
    }

    if (telefono !== undefined && typeof telefono !== 'string') {
      return ['"telefono" debe ser string'];
    }

    if (email !== undefined && typeof email !== 'string') {
      return ['"email" debe ser string'];
    }

    if (password !== undefined && typeof password !== 'string') {
      return ['"password" debe ser string'];
    }

    if (lenguaNativa !== undefined && typeof lenguaNativa !== 'string') {
      return ['"lenguaNativa" debe ser string'];
    }

    if (fotografia !== undefined && typeof fotografia !== 'string') {
      return ['"fotografia" debe ser string'];
    }

    if (rol !== undefined) {
      if (typeof rol !== 'string') {
        return ['"rol" debe ser string'];
      }
      if (!UpdateUserDto.allowedRoles.includes(rol as Rol)) {
        return [`Rol no válido: '${rol}'. Opciones válidas: ${UpdateUserDto.allowedRoles.join(', ')}`];
      }
    }

    return [
      undefined,
      new UpdateUserDto(
        nombreCompleto,
        telefono,
        email,
        password,
        lenguaNativa,
        fotografia,
        rol as Rol | undefined
      )
    ];
  }
}
