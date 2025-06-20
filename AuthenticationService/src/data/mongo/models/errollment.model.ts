import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
  estudianteId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  claseId: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO", "COMPLETADO"],
    default: "ACTIVO"
  },
  progreso: {
    type: Number,
    default: 0
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

enrollmentSchema.index({ estudianteId: 1, claseId: 1 }, { unique: true });

export const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
