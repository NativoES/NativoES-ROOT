export class RegisterEnrollmentDto {
  private constructor(
    public readonly estudianteId: string,
    public readonly claseId: string,
    public readonly estado: "ACTIVO" | "INACTIVO" | "COMPLETADO" = "ACTIVO",
    public readonly progreso: number = 0
  ) {}

  static create(obj: { [key: string]: any }): [string?, RegisterEnrollmentDto?] {
    const { estudianteId, claseId, estado, progreso } = obj;

    if (!estudianteId || typeof estudianteId !== 'string') {
      return ['El campo "estudianteId" es requerido y debe ser un string.'];
    }

    if (!claseId || typeof claseId !== 'string') {
      return ['El campo "claseId" es requerido y debe ser un string.'];
    }

    const allowedStates = ['ACTIVO', 'INACTIVO', 'COMPLETADO'];
    if (estado && !allowedStates.includes(estado)) {
      return [`El estado debe ser uno de: ${allowedStates.join(', ')}`];
    }

    if (progreso !== undefined && (typeof progreso !== 'number' || progreso < 0 || progreso > 100)) {
      return ['El progreso debe ser un número entre 0 y 100.'];
    }

    return [undefined, new RegisterEnrollmentDto(estudianteId, claseId, estado, progreso)];
  }
}
