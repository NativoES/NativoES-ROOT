import mongoose, { Schema } from "mongoose";

const localizedContentSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    media: {
      url: { type: String, required: false },
      type: { type: String, enum: ["image", "video"], required: false },
    },
  },
  { _id: false }
);

const formStudySchema = new mongoose.Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false },
});

export const FormStudyModel = mongoose.model("FormStudy", formStudySchema);
