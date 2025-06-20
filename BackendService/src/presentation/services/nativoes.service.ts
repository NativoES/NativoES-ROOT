import { ClassesModel } from "../../data";
import { CustomError } from "../../domain";
import { AudioService } from "./audio.service";
import { CompletarTextoService } from "./completar-texto.service";
import { EnlaceExternoService } from "./enlaces-externos.service";
import { FalsoVerdaderoService } from "./falso-verdadero.service";
import { FormarPalabrasService } from "./formar-palabras.service";
import { GifService } from "./gif.service";
import { ImageService } from "./image.service";
import { ImagenPalabraService } from "./imagen-palabra.service";
import { LlenarEspaciosService } from "./llenar-espacio.service";
import { NotaTextoService } from "./nota-texto.service";
import { NotaService } from "./nota.service";
import { OrdenarPalabrasService } from "./ordenar-palabra.service";
import { OrdenarTextoService } from "./ordenar-texto.service";
import { RelacionarPalabrasService } from "./relacionar-palabra.service";
import { SeleccionPalabrasService } from "./seleccion-palabra.service";
import { VideoService } from "./video.service";

interface DeletableService {
  delete: (id: string) => Promise<any>;
}

export class NativoesService {
  private readonly completarTextoService = new CompletarTextoService();
  private readonly notaService = new NotaService();
  private readonly notaTextoService = new NotaTextoService();
  private readonly ordenarTextoService = new OrdenarTextoService();
  private readonly llenarEspaciosService = new LlenarEspaciosService();
  private readonly seleccionPalabraService = new SeleccionPalabrasService();
  private readonly ordenarPalabraService = new OrdenarPalabrasService();
  private readonly formarPalabraService = new FormarPalabrasService();
  private readonly imagenPalabraService = new ImagenPalabraService();

  private readonly audioService = new AudioService();
  private readonly imageService = new ImageService();
  private readonly videoService = new VideoService();
  private readonly gifService = new GifService();

  private readonly relacionarPalabraService = new RelacionarPalabrasService();
  private readonly enlaceExternoService = new EnlaceExternoService();
  private readonly falsoVerdaderoService = new FalsoVerdaderoService();

  constructor() {}

  public async getAllExercises(id: string) {
    const [completar, notaTexto, nota, ordenarTexto, llenarEspacio, selecionarPalabra, ordenarPalabra, formarPalabra, imagenPalabra, audio, image, video, gif, relacionarPalabra, enlaceExterno, falsoVerdadero] = await Promise.all([
      this.completarTextoService.getAllCT(id),
      this.notaTextoService.getAll(id),
      this.notaService.getAll(id),
      this.ordenarTextoService.getAll(id),
      this.llenarEspaciosService.getAll(id),
      this.seleccionPalabraService.getAll(id),
      this.ordenarPalabraService.getAll(id),
      this.formarPalabraService.getAll(id),
      this.imagenPalabraService.getAll(id),

      this.audioService.getAll(id),
      this.imageService.getAll(id),
      this.videoService.getAll(id),
      this.gifService.getAll(id),
      
      this.relacionarPalabraService.getAll(id),
      this.enlaceExternoService.getAll(id),
      this.falsoVerdaderoService.getAll(id),
    ]);

    const combined = [...completar, ...notaTexto, ...nota, ...ordenarTexto, ...llenarEspacio, ...selecionarPalabra, ...ordenarPalabra, ...formarPalabra, ...imagenPalabra, ...audio, ...image, ...video, ...gif, ...relacionarPalabra, ...enlaceExterno, ...falsoVerdadero];

    combined.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return combined;
  }

  public async deleteById(id: string) {
    const services: DeletableService[] = [
      this.completarTextoService,
      this.notaTextoService,
      this.notaService,
      this.ordenarTextoService,
      this.llenarEspaciosService,
      this.seleccionPalabraService,
      this.ordenarPalabraService,
      this.formarPalabraService,
      this.imagenPalabraService,

      this.audioService,
      this.imageService,
      this.videoService,
      this.gifService,

      this.relacionarPalabraService,
      this.enlaceExternoService,
      this.falsoVerdaderoService,
    ];

    for (const service of services) {
      try {
        const deleted = await service.delete(id);
        if (deleted) return deleted;
      } catch {}
    }

    throw CustomError.notFound(`Ejercicio con id ${id} no encontrado`);
  }


  public async getAllPublicExercises() {
    const clasesPublicas = await ClassesModel.find({ isPrivate: false }).lean();
    const claseIds = clasesPublicas.map(c => c._id.toString());

    const allExercisesByClass = await Promise.all(
      claseIds.map(id => this.getAllExercises(id))
    );

    const combined = allExercisesByClass.flat().sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return combined;
  }
}
