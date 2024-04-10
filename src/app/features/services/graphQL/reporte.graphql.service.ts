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

  generarClientReport(cedula: string): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation generalClientReport($cedula: String!) {
            generalClientReport(cedula: $cedula) {
              nombres_cliente
              apellidos_cliente
              cedula_cliente
              mascotas {
                nombre_mascota
                dosis_receta
                descripcion_receta
              }
            }
          }
        `,
        variables: {
          cedula: cedula,
        },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data.generalClientReport));
  }

  consultarReporteRecetas(idMascota: number): Observable<ReporteRecetas[]> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation recipesPetReport($idMascota: Int!) {
            recipesPetReport(idMascota: $idMascota) {
              nombre_mascota
              raza_mascota
              edad_mascota
              peso_mascota
              recetas {
                medicamento
                dosis_receta
                descripcion_receta
              }
            }
          }
        `,
        variables: {
          idMascota: idMascota,
        },
        fetchPolicy: 'network-only',
      })
      .pipe(map((res) => res.data.recipesPetReport));
  }
}
