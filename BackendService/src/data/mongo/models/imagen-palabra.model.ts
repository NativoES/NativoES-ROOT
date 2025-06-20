import mongoose from "mongoose";

const asociacionSchema = new mongoose.Schema(
  {
    palabra: {
      type: String,
      required: true,
      trim: true,
    },
    imagenUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const imagenPalabraSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  asociaciones: {
    type: [asociacionSchema],
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

export const ImagenPalabraModel = mongoose.model(
  "ImagenPalabra",
  imagenPalabraSchema
);
