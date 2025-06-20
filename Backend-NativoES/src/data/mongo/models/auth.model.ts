import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["superadmin", "teacher", "student"],
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "roleRef", // Esto permite relacionar dinámicamente con el modelo correcto
  },
  roleRef: {
    type: String,
    required: true,
    enum: ["Teacher", "Student"], // nombres exactos de los modelos mongoose
  },
}, {
  timestamps: true
});

export const UserModel = mongoose.model("User", userSchema);
