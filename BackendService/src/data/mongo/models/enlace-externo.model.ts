import mongoose from "mongoose";

const enlaceExternoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  enlace: {
    type: String,
    required: true,
    trim: true
  },
  claseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    required: true
  },
  template: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const EnlaceExternoModel = mongoose.model("EnlaceExterno", enlaceExternoSchema);
