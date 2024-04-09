export interface Receta {
    medicamento: string;
    dosis_receta: string;
    descripcion_receta: string;
  }
  
  export interface ReporteRecetas {
    recetas: Receta[];
    edad_mascota: number;
    peso_mascota: number;
    raza_mascota: string;
    nombre_mascota: string;
  }
  