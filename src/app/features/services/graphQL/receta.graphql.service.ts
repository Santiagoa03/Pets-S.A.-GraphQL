import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receta } from '../../interfaces/receta.inteface';
import { Mascota } from '../../interfaces/mascota.interfa';
import { Medicamento } from '../../interfaces/medicamento.inteface';

@Injectable({
  providedIn: 'root',
})
export class RecetaGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarRecetas(): Observable<Receta[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query recipes {
            recipe {
              id
              medicamento
              dosis
              descripcion
              nombre_mascota
              cedula_cliente
            }
          }
        `,
      })
      .pipe(
        map((res) => {
          const recetasData = res.data.recipe;
          return recetasData.map((recetaData: any) =>
            this.mapReceta(recetaData)
          );
        })
      );
  }

  private mapReceta(data: any): Receta {
    const mascota: Mascota = {
      id_mascota: 0,
      nombre: data.nombre_mascota,
      raza: '',
      edad: 0,
      peso: 0,
      cedula_cliente: data.cedula_cliente,
    };

    const medicamento: Medicamento = {
      id: data.id,
      nombre: data.medicamento,
      dosis: data.dosis,
      descripcion: data.descripcion,
    };

    return {
      id: data.id,
      medicamento: medicamento,
      mascota: mascota,
    };
  }

  guardarReceta(recipeData: Receta): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation createRecipe($idMedicamento: Int!, $idMascota: Int!) {
          createRecipe(
            input: { idMedicamento: $idMedicamento, idMascota: $idMascota }
          ) {
            id
          }
        }
      `,
      variables: {
        idMedicamento: recipeData.medicamento.id,
        idMascota: recipeData.mascota.id_mascota,
      },
    });
  }

  eliminarReceta(id: number): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation deleteRecipe($id: Int!) {
          deleteRecipe(id: $id)
        }
      `,
      variables: {
        id: id,
      },
    });
  }
}
