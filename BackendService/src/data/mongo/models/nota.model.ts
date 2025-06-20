import mongoose from "mongoose";

const notaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  mensaje: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
  },
  colorTexto: {
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
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export const NotaModel = mongoose.model("Nota", notaSchema);
