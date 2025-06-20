import mongoose, { Schema } from 'mongoose';

const localizedContentSchema = new Schema({
  title: { type: String, required: true },
  title2: { type: String },
  subtitle: { type: String, required: true },
  btcPrimary: { type: String, required: false },
  btcSecondary: { type: String },
  studentsOnline: { type: String },
  textSchool: { type: String },
}, { _id: false });

const heroSchema = new Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false },
  backgroundImageUrl: { type: String, required: false }
});

export const HeroModel = mongoose.model('Hero', heroSchema);

