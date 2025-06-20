import mongoose from "mongoose";

const seleccionPalabrasSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  textoOriginal: {
    type: String,
    required: true,
    trim: true,
  },
  opcionesPorGrupo: {
    type: [
      {
        opciones: {
          type: [String],
          required: true,
        },
      },
    ],
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

export const SeleccionPalabrasModel = mongoose.model(
  "SeleccionPalabras",
  seleccionPalabrasSchema
);
