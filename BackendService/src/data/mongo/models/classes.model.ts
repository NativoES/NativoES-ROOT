import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
  nombreClase: {
    type: String,
    required: true,
    trim: true,
  },
  nivel: {
    type: Number,
  },
  idioma: {
    type: String,
    required: true,
    trim: true,
    enum: ["Español", "Inglés", "Francés", "Ruso"],
  },
  horario: {
    type: [String],
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  imagen: {
    type: String,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now }
});

export const ClassesModel = mongoose.model("Classes", classesSchema);
