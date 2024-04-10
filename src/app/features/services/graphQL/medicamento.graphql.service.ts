import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medicamento } from '../../interfaces/medicamento.inteface';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarMedicamento(): Observable<Medicamento[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query medicines {
            medicines {
              nombre
              descripcion
              dosis
              id
            }
          }
        `,
      })
      .pipe(map((res) => res.data.medicines as Medicamento[]));
  }

  guardarMedicamento(medicineData: Medicamento): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation createMedicine(
          $nombre: String!
          $descripcion: String!
          $dosis: String!
        ) {
          createMedicine(
            input: { nombre: $nombre, descripcion: $descripcion, dosis: $dosis }
          ) {
            nombre
            descripcion
            dosis
          }
        }
      `,
      variables: {
        nombre: medicineData.nombre,
        descripcion: medicineData.descripcion,
        dosis: medicineData.dosis,
      },
    });
  }

  editarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation updateMedicine(
          $id: Int!
          $nombre: String!
          $descripcion: String!
          $dosis: String!
        ) {
          updateMedicine(
            input: {
              id: $id
              nombre: $nombre
              descripcion: $descripcion
              dosis: $dosis
            }
          ) {
            id
            nombre
            descripcion
            dosis
          }
        }
      `,
      variables: {
        id: medicamento.id,
        nombre: medicamento.nombre,
        descripcion: medicamento.descripcion,
        dosis: medicamento.dosis,
      },
    });
  }

  eliminarMedicamento(id: number): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation deleteMedicine($id: Int!) {
          deleteMedicine(id: $id)
        }
      `,
      variables: {
        id: id,
      },
    });
  }
}
