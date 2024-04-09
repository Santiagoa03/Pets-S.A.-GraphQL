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
          query {
            medicamentos {
              id
              dosis
              nombre
              descripcion
            }
          }
        `,
      })
      .pipe(map((res) => res.data.medicamentos));
  }

  guardarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation guardarMedicamento($input: MedicamentoInput!) {
          guardarMedicamento(input: $input) {
            id
            dosis
            nombre
            descripcion
          }
        }
      `,
      variables: {
        input: medicamento,
      },
    });
  }

  editarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation editarMedicamento($input: MedicamentoInput!) {
          editarMedicamento(input: $input) {
            id
            dosis
            nombre
            descripcion
          }
        }
      `,
      variables: {
        input: {
          id_medicamento: medicamento.id,
          dosis: medicamento.dosis,
          nombre: medicamento.nombre,
          descripcion: medicamento.descripcion,
        },
      },
    });
  }

  eliminarMedicamento(medicamento: Medicamento): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation eliminarMedicamento($id: ID!) {
          eliminarMedicamento(id: $id)
        }
      `,
      variables: {
        id: medicamento.id,
      },
    });
  }
}
