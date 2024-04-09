import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReporteMascotaPorCliente } from '../../interfaces/reporte-mascotas-por-cliente.interface';
import { ReporteRecetas } from '../../interfaces/reporte-recetas-por-mascota.interface';

@Injectable({
  providedIn: 'root',
})
export class ReporteGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarReporteClientes(
    cliente: string
  ): Observable<ReporteMascotaPorCliente[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query ConsultarReporteClientes($cedula_cliente: String!) {
            reporteClientes(cedula_cliente: $cedula_cliente) {
              apellidos_cliente
              cedula_cliente
              nombres_cliente
              mascotas {
                dosis_receta
                nombre_mascota
                descripcion_receta
              }
            }
          }
        `,
        variables: {
          cedula_cliente: cliente,
        },
      })
      .pipe(map((res) => res.data.reporteClientes));
  }

  consultarReporteRecetas(idMascota: number): Observable<ReporteRecetas[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query ConsultarReporteRecetas($id_mascota: Int!) {
            reporteRecetas(id_mascota: $id_mascota) {
              recetas {
                medicamento
                dosis_receta
                descripcion_receta
              }
              edad_mascota
              peso_mascota
              raza_mascota
              nombre_mascota
            }
          }
        `,
        variables: {
          id_mascota: idMascota,
        },
      })
      .pipe(map((res) => res.data.reporteRecetas));
  }
}
