import mongoose from 'mongoose';

const horarioAtencionSchema = new mongoose.Schema({
  dia: {
    type: String,
    required: true,
    enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  },
  abierto: {
    type: Boolean,
    required: true,
    default: true
  },
  horaApertura: {
    type: String,
    required: function (this: any) {
      return this.abierto;
    }
  },
  horaCierre: {
    type: String,
    required: function (this: any) {
      return this.abierto;
    }
  }
}, { _id: false });

const redSocialSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const informacionSchemaPorIdioma = new mongoose.Schema({
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  horarios: { type: [horarioAtencionSchema], required: true },
  redesSociales: { type: [redSocialSchema], required: false }
}, { _id: false });

const informacionSchema = new mongoose.Schema({
  en: { type: informacionSchemaPorIdioma, required: false },
  es: { type: informacionSchemaPorIdioma, required: false },
  fr: { type: informacionSchemaPorIdioma, required: false }
});

export const InformationModel = mongoose.model("Information", informacionSchema);

