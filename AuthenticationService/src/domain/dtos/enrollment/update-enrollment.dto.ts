export class UpdateEnrollmentDto {
  private constructor(
    public readonly estado?: "ACTIVO" | "INACTIVO" | "COMPLETADO",
    public readonly progreso?: number
  ) {}

  static create(obj: { [key: string]: any }): [string?, UpdateEnrollmentDto?] {
    const allowedFields = ['estado', 'progreso'];
    const invalidFields = Object.keys(obj).filter(k => !allowedFields.includes(k));
    if (invalidFields.length > 0) {
      return [`Campos no válidos: ${invalidFields.join(', ')}`];
    }

    const { estado, progreso } = obj;

    const allowedStates = ['ACTIVO', 'INACTIVO', 'COMPLETADO'];
    if (estado && !allowedStates.includes(estado)) {
      return [`El estado debe ser uno de: ${allowedStates.join(', ')}`];
    }

    if (progreso !== undefined && (typeof progreso !== 'number' || progreso < 0 || progreso > 100)) {
      return ['El progreso debe ser un número entre 0 y 100.'];
    }

    return [undefined, new UpdateEnrollmentDto(estado, progreso)];
  }
}
