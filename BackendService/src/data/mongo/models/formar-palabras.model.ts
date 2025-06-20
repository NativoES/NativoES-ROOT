import mongoose from "mongoose";

const formarPalabrasLetraSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  letras: {
    type: [String],
    required: true,
  },
  palabraCorrecta: {
    type: String,
    required: true,
  },
  claseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});

export const FormarPalabrasModel = mongoose.model(
  "FormarPalabrasLetra",
  formarPalabrasLetraSchema
);
