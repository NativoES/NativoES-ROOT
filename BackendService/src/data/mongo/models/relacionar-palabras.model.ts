import mongoose from "mongoose";

const parejaSchema = new mongoose.Schema(
  {
    palabra: {
      type: String,
      required: true,
      trim: true,
    },
    significado: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const relacionarPalabrasSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  parejas: {
    type: [parejaSchema],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const RelacionarPalabrasModel = mongoose.model(
  "RelacionarPalabras",
  relacionarPalabrasSchema
);
