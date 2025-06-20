import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lenguaNativa: {
    type: String,
    enum: ["Español", "Ruso", "Inglés"],
    required: true,
  },
  fotografia: {
    type: String,
    required: false,
  },
});

export const StudentModel = mongoose.model("Student", studentSchema);
