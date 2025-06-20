import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  audioUrl: {
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
    required: true,
  },
  createdAt: { type: Date, default: Date.now }
});

export const AudioModel = mongoose.model("Audio", audioSchema);
