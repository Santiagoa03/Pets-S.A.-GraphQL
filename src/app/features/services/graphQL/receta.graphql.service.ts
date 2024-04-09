import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receta } from '../../interfaces/receta.inteface';

@Injectable({
  providedIn: 'root',
})
export class RecetaGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarRecetas(): Observable<Receta[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query {
            recetas {
              id
              medicamento {
                id
                dosis
                nombre
                descripcion
              }
              mascota {
                id_mascota
                nombre
                cedula_cliente
              }
            }
          }
        `,
      })
      .pipe(map((res) => res.data.recetas));
  }

  guardarReceta(receta: Receta): Observable<any> {
    const data = {
      id_medicamento: Number(receta.medicamento.id),
      id_mascota: Number(receta.mascota.id_mascota),
    };

    return this.apollo.mutate<any>({
      mutation: gql`
        mutation GuardarReceta($id_medicamento: Int!, $id_mascota: Int!) {
          guardarReceta(id_medicamento: $id_medicamento, id_mascota: $id_mascota) {
          }
        }
      `,
      variables: data,
    });
  }

  eliminarReceta(receta: Receta): Observable<any> {
    const data = {
      id_receta: receta.id,
    };

    return this.apollo.mutate<any>({
      mutation: gql`
        mutation EliminarReceta($id_receta: Int!) {
          eliminarReceta(id_receta: $id_receta) {
          }
        }
      `,
      variables: data,
    });
  }
}
