import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota } from '../../interfaces/mascota.interfa';

@Injectable({
  providedIn: 'root',
})
export class MascotaGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarMascotas(): Observable<Mascota[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query {
            mascotas {
              id_mascota
              edad
              peso
              raza
              nombre
              cedula_cliente {
                correo
                telefono
                nombre
                cedula
                apellidos
                direccion
              }
            }
          }
        `,
      })
      .pipe(map((res) => res.data.mascotas));
  }

  guardarMascota(mascota: Mascota): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation guardarMascota($input: MascotaInput!) {
          guardarMascota(input: $input) {
            id_mascota
            edad
            peso
            raza
            nombre
            cedula_cliente {
              correo
              telefono
              nombre
              cedula
              apellidos
              direccion
            }
          }
        }
      `,
      variables: {
        input: mascota,
      },
    });
  }

  editarMascota(mascota: Mascota): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation editarMascota($input: MascotaInput!) {
          editarMascota(input: $input) {
            id_mascota
            edad
            peso
            raza
            nombre
            cedula_cliente {
              correo
              telefono
              nombre
              cedula
              apellidos
              direccion
            }
          }
        }
      `,
      variables: {
        input: mascota,
      },
    });
  }

  eliminarMascota(mascota: Mascota): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation eliminarMascota($id: String!) {
          eliminarMascota(id: $id)
        }
      `,
      variables: {
        id: mascota.id_mascota,
      },
    });
  }
}
