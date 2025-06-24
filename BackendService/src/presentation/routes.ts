import { Router } from "express";
import { CompletarTextoRoutes } from "./completar-texto/routes";
import { ClassRoutes } from "./class/routes";
import { NotaTextoRoutes } from "./nota-texto/routes";
import { NotaRoutes } from "./nota/routes";
import { NativoesRoutes } from "./nativoes/routes";
import { FormarPalabrasRoutes } from "./formar-palabras/routes";
import { ImagenPalabraRoutes } from "./imagen-palabra/routes";
import { LlenarEspaciosRoutes } from "./llenar-espacio/routes";
import { OrdenarPalabrasRoutes } from "./ordenar-palabra/routes";
import { OrdenarTextoRoutes } from "./ordenar-texto/routes";
import { SeleccionPalabrasRoutes } from "./seleccion-palabra/routes";
import { AudioRoutes } from "./audio/routes";
import { ImageRoutes } from "./image/routes";
import { VideoRoutes } from "./video/routes";
import { GifRoutes } from "./gif/routes";
import { RelacionarPalabraRoutes } from "./relacionar-palabra/routes";
import { FalsoVerdaderoRoutes } from "./falso-verdadero/routes";
import { EnlaceExternoRoutes } from "./enlace-externo/routes";

export class AppRoutes {
  
  static get routes(): Router {
    const router = Router();
    
    router.use("/api/system/ejercicios", NativoesRoutes.routes);
    
    router.use("/api/system/completar-texto", CompletarTextoRoutes.routes);

    router.use("/api/system/classes", ClassRoutes.routes);
    
    router.use("/api/system/nota-texto", NotaTextoRoutes.routes);
    router.use("/api/system/nota", NotaRoutes.routes);
    router.use("/api/system/formar-palabra", FormarPalabrasRoutes.routes);
    router.use("/api/system/imagen-palabra", ImagenPalabraRoutes.routes);
    router.use("/api/system/llenar-espacio", LlenarEspaciosRoutes.routes);
    router.use("/api/system/ordenar-palabra", OrdenarPalabrasRoutes.routes);
    router.use("/api/system/ordenar-texto", OrdenarTextoRoutes.routes);
    router.use("/api/system/seleccion-palabra", SeleccionPalabrasRoutes.routes);
    router.use("/api/system/audio", AudioRoutes.routes);
    router.use("/api/system/image", ImageRoutes.routes);
    router.use("/api/system/video", VideoRoutes.routes);
    router.use("/api/system/gif", GifRoutes.routes);
    
    router.use("/api/system/relacionar-palabra", RelacionarPalabraRoutes.routes);
    router.use("/api/system/falso-verdadero", FalsoVerdaderoRoutes.routes);
    router.use("/api/system/enlace-externo", EnlaceExternoRoutes.routes);

    return router;
  }
}
