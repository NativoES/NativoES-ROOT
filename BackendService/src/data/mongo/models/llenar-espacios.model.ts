import mongoose from "mongoose";

const llenarEspaciosSchema = new mongoose.Schema({
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
    required: true
  },
  palabras: {
    type: [String],
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

export const llenarEspaciosModel = mongoose.model("llenarEspacios", llenarEspaciosSchema);
