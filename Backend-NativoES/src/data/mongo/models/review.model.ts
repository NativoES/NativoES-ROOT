import mongoose, { Schema } from "mongoose";

const localizedContentSchema = new Schema(
  {
    resennia: {
      nombre: { type: String, required: true },
      fecha: { type: Date, default: Date.now },
      avatarUrl: { type: String, required: false },
      contenido: {
        type: String,
        required: true,
      },
      calificacion: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
    },
    respuestas: {
      type: new Schema(
        {
          texto: { type: String, required: true },
          fecha: { type: Date, default: Date.now },
          autor: { type: String, default: "NATIVOES" },
          contenido: { type: String, required: true },
        },
        { _id: false }
      ),
      required: false,
    },
  },
  { _id: false }
);


const reviewSchema = new mongoose.Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false },
});

export const ReviewModel = mongoose.model("Review", reviewSchema);
