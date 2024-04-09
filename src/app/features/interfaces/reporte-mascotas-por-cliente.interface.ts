export interface ReporteMascotaPorCliente {
    apellidos_cliente: string;
    cedula_cliente: string;
    nombres_cliente: string;
    mascotas: ReporteMascota[];
}

export interface ReporteMascota {
    dosis_receta: string;
    nombre_mascota: string;
    descripcion_receta: string;
}