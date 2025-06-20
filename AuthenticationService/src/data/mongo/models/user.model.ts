import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["ADMIN", "PROFESOR", "ESTUDIANTE"],
    required: true
  },
  lenguaNativa: {
    type: String,
    trim: true
  },
  fotografia: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const UserModel = mongoose.model("User", userSchema);
