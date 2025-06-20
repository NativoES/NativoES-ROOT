import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  videoUrl: {
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

export const VideoModel = mongoose.model("Video", videoSchema);
