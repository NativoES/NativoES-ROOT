import mongoose from "mongoose";

const localizedContentSchema = new mongoose.Schema({
  nombreDeClase: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    required: true
  },
  idioma: {
    type: String,
    enum: ["Español", "Ruso", "Inglés"],
    required: true
  },
  horario: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false
  },
  fotografia: {
    type: String,
    required: false
  }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false }
});

export const CourseModel = mongoose.model("Course", courseSchema);
