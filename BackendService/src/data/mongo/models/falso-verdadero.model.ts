import mongoose from "mongoose";

const preguntaSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
    trim: true
  },
  respuestaCorrecta: {
    type: Boolean,
    required: true
  }
});

const falsoVerdaderoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  preguntas: {
    type: [preguntaSchema],
    required: true
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

export const FalsoVerdaderoModel = mongoose.model("FalsoVerdadero", falsoVerdaderoSchema);
