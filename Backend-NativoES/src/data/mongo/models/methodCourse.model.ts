import mongoose, {Schema} from "mongoose";

const localizedContentSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },

  descripcion: { // utilizar reactquil
    type: String,
    required: true
  },

  typeIcon: {
    type: String,
    required: false
  }
}, { _id: false });

const methodCourseTypeSchema = new mongoose.Schema({
  en: { type: localizedContentSchema, required: false },
  es: { type: localizedContentSchema, required: false },
  fr: { type: localizedContentSchema, required: false },
});

export const MethodCourseTypeModel = mongoose.model("MethodCourse", methodCourseTypeSchema);
