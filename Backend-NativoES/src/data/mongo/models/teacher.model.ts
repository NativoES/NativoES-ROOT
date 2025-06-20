import mongoose, { Schema } from "mongoose";

const localizedContentSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    resumenPrincipal: { // utilizar generador de inputs
      type: [String],
      required: true,
    },
    resumenSecundario: { // utilizar generador de inputs
      type: [String],
      required: true,
    },
    presentacion: { // utilizar reactquil
      type: [String],
      required: true,
    },
    cargo: {
      type: String,
    },
    fotografia: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

const teacherSchema = new Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false },
});

export const TeacherModel = mongoose.model("Teacher", teacherSchema);
