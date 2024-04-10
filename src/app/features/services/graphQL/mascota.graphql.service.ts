import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mascota } from '../../interfaces/mascota.interfa';
import { Cliente } from '../../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class MascotaGraphqlService {
  constructor(private apollo: Apollo) {}

  consultarMascotas(): Observable<Mascota[]> {
    return this.apollo
      .query<any>({
        query: gql`
          query pets {
            pets {
              id
              nombre
              raza
              edad
              peso
              cedula_cliente
              nombre_cliente
              apellidos_cliente
              direccion_cliente
              telefono_cliente
              correo_cliente
            }
          }
        `,
      })
      .pipe(
        map((res) => {
          const mascotasData = res.data.pets;
          return mascotasData.map((mascotaData: any) =>
            this.mapMascota(mascotaData)
          );
        })
      );
  }

  private mapMascota(data: any): Mascota {
    const cliente: Cliente | string = {
      cedula: data.cedula_cliente,
      nombres: data.nombre_cliente,
      apellidos: data.apellidos_cliente,
      direccion: data.direccion_cliente,
      telefono: data.telefono_cliente,
      correo: data.correo_cliente,
    };

    return {
      id_mascota: data.id,
      nombre: data.nombre,
      raza: data.raza,
      edad: data.edad,
      peso: data.peso,
      cedula_cliente: cliente,
    };
  }

  guardarMascota(petData: Mascota): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation createPet(
          $nombre: String!
          $raza: String!
          $edad: Int!
          $peso: Float!
          $cedulaCliente: String!
        ) {
          createPet(
            input: {
              nombre: $nombre
              raza: $raza
              edad: $edad
              peso: $peso
              cedulaCliente: $cedulaCliente
            }
          ) {
            nombre
            raza
            edad
            peso
            cedula_cliente
          }
        }
      `,
      variables: {
        nombre: petData.nombre,
        raza: petData.raza,
        edad: petData.edad,
        peso: petData.peso,
        cedulaCliente: petData.cedula_cliente,
      },
    });
  }

  editarMascota(mascota: Mascota): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation updatePet(
          $id: Int!
          $nombre: String!
          $raza: String!
          $edad: Int!
          $peso: Float!
          $cedulaCliente: String!
        ) {
          updatePet(
            input: {
              id: $id
              nombre: $nombre
              raza: $raza
              edad: $edad
              peso: $peso
              cedulaCliente: $cedulaCliente
            }
          ) {
            id
            nombre
            raza
            edad
            peso
            cedula_cliente
          }
        }
      `,
      variables: {
        id: mascota.id_mascota,
        nombre: mascota.nombre,
        raza: mascota.raza,
        edad: mascota.edad,
        peso: mascota.peso,
        cedulaCliente: mascota.cedula_cliente,
      },
    });
  }

  eliminarMascota(id: number): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation deletePet($id: Int!) {
          deletePet(id: $id)
        }
      `,
      variables: {
        id: id,
      },
    });
  }
}
