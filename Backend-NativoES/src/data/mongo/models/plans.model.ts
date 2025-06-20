import mongoose, { Schema } from "mongoose";

const caracteristicaSchema = new Schema(
  {
    precioRegular: {
      type: Number,
      required: true,
    },
    precioConDescuento: {
      type: Number,
      required: false,
      default: null,
    },
    caracteristica: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const typePlanSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    caracteristicas: {
      type: [caracteristicaSchema],
      required: true,
    },
  },
  { _id: false }
);

const localizedContentSchema = new Schema(
  {
    tituloDelPlan: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    typePlan: {
      type: [typePlanSchema],
      required: true,
    },
  },
  { _id: false }
);

const pricePlanSchema = new Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false },
});

export const PricePlanModel = mongoose.model("PricePlan", pricePlanSchema);
